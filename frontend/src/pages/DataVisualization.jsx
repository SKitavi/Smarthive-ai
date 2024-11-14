import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import CorrelationHeatmap from "./CorrelationHeatMap";
import PropTypes from 'prop-types'; 
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Label 
} from "recharts";

// ClustersBarChart Component
function ClustersBarChart({ clusters }) {
  const [clusterData, setClusterData] = useState([]);

  const aggregateByCluster = (clusters) => {
    const clusterMap = {};
    clusters.forEach((item) => {
      const clusterId = item.Cluster;
      if (!clusterMap[clusterId]) {
        clusterMap[clusterId] = { Cluster: clusterId, TotalPrice: 0, Count: 0 };
      }
      clusterMap[clusterId].TotalPrice += item.TotalPrice;
      clusterMap[clusterId].Count += 1;
    });
    return Object.values(clusterMap);
  };

  useEffect(() => {
    const aggregatedData = aggregateByCluster(clusters);
    setClusterData(aggregatedData);
  }, [clusters]);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center underline">Cluster-wise Sales and Record Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={clusterData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Cluster">
            <Label value="Clusters" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value="Total Sales" angle={-90} position="insideLeft" />
          </YAxis>
          <Tooltip />
          <Bar dataKey="TotalPrice" fill="#4A90E2" name="Total Sales" />
          <Bar dataKey="Count" fill="#7ED321" name="Record Count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// CountryBarChart Component
function CountryBarChart({ data }) {
  const [countryData, setCountryData] = useState([]);

  const aggregateByCountry = (data) => {
    const countryMap = {};
    data.forEach((item) => {
      const countryId = item.Country;
      if (!countryMap[countryId]) {
        countryMap[countryId] = { Country: countryId, TotalQuantity: 0 };
      }
      countryMap[countryId].TotalQuantity += item.Quantity;
    });
    return Object.values(countryMap);
  };

  useEffect(() => {
    const aggregatedData = aggregateByCountry(data);
    setCountryData(aggregatedData);
  }, [data]);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center underline">Country-wise Product Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={countryData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Country">
            <Label value="Country" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value="Total Quantity" angle={-90} position="insideLeft" />
          </YAxis>
          <Tooltip />
          <Bar dataKey="TotalQuantity" fill="#FF6F61" name="Total Quantity" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

ClustersBarChart.propTypes = {
  clusters: PropTypes.arrayOf(
    PropTypes.shape({
      Cluster: PropTypes.number.isRequired,
      TotalPrice: PropTypes.number.isRequired
    })
  ).isRequired,
};

CountryBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      Country: PropTypes.number.isRequired,
      Quantity: PropTypes.number.isRequired
    })
  ).isRequired,
};

// Data Visualization Page
function DataVisualizationPage() {
    const [clusters, setClusters] = useState([]);
    const fetchClusters = async () => {
        try {
          const res = await axios.get("http://localhost:5000/api/clusters");
          if (res.status === 200) setClusters(res.data.clusters);
        } catch (error) {
          console.error("Error fetching clusters:", error);
          toast.error("Failed to fetch clusters.");
        }
      };

      useEffect(() => { fetchClusters(); }, []);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Table Form</h1>
        {/* Table component */}
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
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Charts</h1>
      <div className="w-full max-w-6xl grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
        
        <ClustersBarChart clusters={clusters} />
        
        <CountryBarChart data={clusters} />
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center underline">Correlation Heatmap</h2>
          <p className="text-center text-gray-600"><CorrelationHeatmap data={clusters} /></p>
        </div>
      </div>
      
    </div>

  );
}

DataVisualizationPage.propTypes = {
  clusters: PropTypes.array.isRequired,
};

export default DataVisualizationPage;
