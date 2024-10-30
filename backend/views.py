import json
import os
from flask import Blueprint, request, jsonify
import joblib
import pandas as pd
views = Blueprint('views', __name__, url_prefix='/api')

@views.route('/hierarchical', methods=['POST'])
def hierarchical():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400
        
        file = request.files['file']  # 'file' is the key of the file input
        
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        # Check if the file is an Excel file (optional)
        if not (file.filename.endswith('.xls') or file.filename.endswith('.xlsx')):
            return jsonify({"error": "Unsupported file format, please upload an Excel file"}), 400
        
        # Read the Excel file into a DataFrame
        df = pd.read_excel(file)
        
        df['InvoiceDate'] = pd.to_datetime(df['InvoiceDate'])

        # Extract features from InvoiceDate
        df['InvoiceHour'] = df['InvoiceDate'].dt.hour
        df['InvoiceDay'] = df['InvoiceDate'].dt.day
        df['InvoiceMinute'] = df['InvoiceDate'].dt.minute
        df['InvoiceMonth'] = df['InvoiceDate'].dt.month
        df['InvoiceYear'] = df['InvoiceDate'].dt.year
        df['InvoiceDayOfWeek'] = df['InvoiceDate'].dt.dayofweek
        
        print("df",df.head())
        
        df_test = df.drop(columns=['Description', 'InvoiceDate'])

        # Step 2: Ensure numeric columns are in the correct format
        df_test['Quantity'] = pd.to_numeric(df_test['Quantity'], errors='coerce')
        df_test['UnitPrice'] = pd.to_numeric(df_test['UnitPrice'], errors='coerce')

        # Step 3: If required, encode categorical columns (like 'Country')
        # Example: Label encode the 'Country' column (ensure same encoding as used in training)
        df_test['Country'] = df_test['Country'].astype('category').cat.codes

        # Step 4: Create any missing features (like 'TotalPrice')
        df_test['TotalPrice'] = df_test['Quantity'] * df_test['UnitPrice']

        # Step 5: Convert 'InvoiceDate' to datetime if used in feature engineering
        # df_test['InvoiceDate'] = pd.to_datetime(df_test['InvoiceDate'])
            
        # For demonstration, printing the first few rows
        print(df_test.head())
        
        model_path = os.path.join(os.getcwd(), 'hierarchical_model.joblib')
        print(model_path)
        model = joblib.load('hierarchical_model.joblib')
        
        cluster_labels = model.fit_predict(df_test)
        
        # Add the cluster labels to the dataframe for reference
        df_test['Cluster'] = cluster_labels
        
        # Rename columns to 'year', 'month', 'day' for combining into a single 'InvoiceDate'
        df_test.rename(columns={'InvoiceYear': 'year', 'InvoiceMonth': 'month', 'InvoiceDay': 'day'}, inplace=True)
        
         # Combine 'InvoiceDay', 'InvoiceMonth', and 'InvoiceYear' into a single 'InvoiceDate'
        df_test['InvoiceDate'] = pd.to_datetime(df_test[['year', 'month', 'day']])

        # Optionally: Format the 'InvoiceDate' column in a human-readable format
        df_test['InvoiceDate'] = df_test['InvoiceDate'].dt.strftime('%Y-%m-%d')  # Or '%d/%m/%Y', based on your preference
        
        # Optionally: Combine 'InvoiceHour' and 'InvoiceMinute' into a single 'InvoiceTime' column
        df_test['InvoiceTime'] = df_test['InvoiceHour'].astype(str).str.zfill(2) + ':' + df_test['InvoiceMinute'].astype(str).str.zfill(2)

        # Drop the individual 'InvoiceYear', 'InvoiceMonth', etc., if not needed
        df_test.drop(columns=['year', 'month', 'day', 'InvoiceHour', 'InvoiceMinute'], inplace=True)
        
        # Map dayofweek (0 = Monday, 6 = Sunday) to actual day names
        day_of_week_map = {0: 'Monday', 1: 'Tuesday', 2: 'Wednesday', 3: 'Thursday', 4: 'Friday', 5: 'Saturday', 6: 'Sunday'}
        df_test['InvoiceDayOfWeek'] = df_test['InvoiceDayOfWeek'].map(day_of_week_map)
        
        # Convert the DataFrame to a dictionary to send as a JSON response
        result = df_test.to_dict(orient='records')
        with open('clusters.json', 'w') as f:
            json.dump(result, f, indent=4)
        
        return jsonify({"message": "File uploaded and processed successfully!"})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@views.route('/kmeans', methods=['POST'])
def kmeans():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        # Check if the file is an Excel file
        if not (file.filename.endswith('.xls') or file.filename.endswith('.xlsx')):
            return jsonify({"error": "Unsupported file format, please upload an Excel file"}), 400

        # Read the Excel file into a DataFrame
        df = pd.read_excel(file)

        # Ensure InvoiceDate is in datetime format
        df['InvoiceDate'] = pd.to_datetime(df['InvoiceDate'])

        # Extract features from InvoiceDate
        df['InvoiceHour'] = df['InvoiceDate'].dt.hour
        df['InvoiceDay'] = df['InvoiceDate'].dt.day
        df['InvoiceMonth'] = df['InvoiceDate'].dt.month
        df['InvoiceDayOfWeek'] = df['InvoiceDate'].dt.dayofweek

        # Prepare the test DataFrame by dropping unnecessary columns
        df_test = df.drop(columns=['Description', 'InvoiceDate'])

        # Ensure numeric columns are in the correct format
        df_test['Quantity'] = pd.to_numeric(df_test['Quantity'], errors='coerce')
        df_test['UnitPrice'] = pd.to_numeric(df_test['UnitPrice'], errors='coerce')

        # Encode categorical columns like 'Country'
        df_test['Country'] = df_test['Country'].astype('category').cat.codes

        # Create any missing features (e.g., TotalPrice)
        df_test['TotalPrice'] = df_test['Quantity'] * df_test['UnitPrice']

        # Load the pre-trained KMeans model
        model_path = os.path.join(os.getcwd(), 'smarthive/kmeans_model.joblib')
        model = joblib.load(model_path)

        # Apply KMeans clustering to the test data
        cluster_labels = model.predict(df_test)

        # Add the cluster labels to the DataFrame for reference
        df_test['Cluster'] = cluster_labels

        # Convert the DataFrame to a dictionary to send as a JSON response
        result = df_test.to_dict(orient='records')

        return jsonify({"message": "File uploaded and processed successfully!", "clusters": result})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@views.route('/index', methods=['GET'])
def index():
    return "<h1>Hello</h1>"

@views.route('/clusters', methods=['GET'])
def get_clusters():
    try:
        with open('clusters.json', 'r') as f:
            data = json.load(f)
        return jsonify({"clusters": data})
    except FileNotFoundError as e:
        return jsonify({"error": "You have not uploaded any excel file"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
       