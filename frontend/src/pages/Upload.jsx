import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ClustersBarChart from "./ClustersBarChart";
import CountryBarChart from "./CountryBarChart";
import CorrelationHeatmap from "./CorrelationHeatMap";

export default function Upload() {
  const [formData, setFormData] = useState({ file: null });
  const [clusters, setClusters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPredictions, setShowPredictions] = useState(false);

  const handleFileChange = (e) => setFormData({ ...formData, file: e.target.files[0] });

  const fetchClusters = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/clusters");
      if (res.status === 200) setClusters(res.data.clusters);
    } catch (error) {
      console.error("Error fetching clusters:", error);
      toast.error("Failed to fetch clusters.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", formData.file);

    try {
      setIsLoading(true);
      const res = await axios.post("http://localhost:5000/api/hierarchical", data);
      if (res.status === 200) {
        toast.success(res.data.message);
        await fetchClusters();
      }
    } catch (error) {
      console.error(error);
      toast.error("File upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePredictions = () => setShowPredictions(!showPredictions);

  useEffect(() => { fetchClusters(); }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      <div className="bg-white shadow rounded-lg p-6 w-full max-w-lg mb-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Upload File for Clustering</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">Select Excel File:</label>
            <input
              type="file"
              name="file"
              id="file"
              accept=".xls,.xlsx"
              className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              onChange={handleFileChange}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            {isLoading ? "Uploading..." : "Upload File"}
          </button>
        </form>
      </div>

      {clusters.length > 0 && (
        <button
          onClick={togglePredictions}
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 mb-6"
        >
          {showPredictions ? "Hide Predictions" : "Show Predictions"}
        </button>
      )}

      {showPredictions && clusters.length > 0 && (
        <>
          <div className="w-full max-w-6xl mb-6 overflow-x-auto shadow rounded-lg">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-sm leading-normal">
                  {["Cluster", "Country", "Customer ID", "Date", "Time", "Day of Week", "Invoice No", "Quantity", "Stock Code", "Total Price", "Unit Price"].map((header) => (
                    <th key={header} className="py-3 px-4 text-center">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {clusters.map((cluster, index) => (
                  <tr key={index} className="text-sm text-gray-700 text-center border-t hover:bg-gray-100">
                    <td className="py-3 px-4">{cluster.Cluster}</td>
                    <td className="py-3 px-4 truncate">{cluster.Country}</td>
                    <td className="py-3 px-4">{cluster.CustomerID}</td>
                    <td className="py-3 px-4">{new Date(cluster.InvoiceDate).toLocaleDateString()}</td>
                    <td className="py-3 px-4">{cluster.InvoiceTime}</td>
                    <td className="py-3 px-4">{cluster.InvoiceDayOfWeek}</td>
                    <td className="py-3 px-4">{cluster.InvoiceNo}</td>
                    <td className="py-3 px-4">{cluster.Quantity}</td>
                    <td className="py-3 px-4">{cluster.StockCode}</td>
                    <td className="py-3 px-4">{cluster.TotalPrice}</td>
                    <td className="py-3 px-4">{cluster.UnitPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="w-full max-w-6xl grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Clusters Distribution</h2>
              <ClustersBarChart clusters={clusters} />
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Country-wise Distribution</h2>
              <CountryBarChart data={clusters} />
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Correlation Heatmap</h2>
              <CorrelationHeatmap data={clusters} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}