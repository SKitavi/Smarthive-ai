from flask import Flask
from flask_cors import CORS
from .views import views

app = Flask(__name__)
app.url_map.strict_slashes = False

app.register_blueprint(views)

CORS(app)

if __name__=='__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
