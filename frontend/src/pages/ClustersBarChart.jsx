import { useEffect, useState } from "react";
import PropTypes from 'prop-types'; 
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

function ClustersBarChart({ clusters }) {
  const [clusterData, setClusterData] = useState([]);

  // Function to aggregate data by cluster
  const aggregateByCluster = (clusters) => {
    const clusterMap = {};

    clusters.forEach((item) => {
      const clusterId = item.Cluster;
      if (!clusterMap[clusterId]) {
        clusterMap[clusterId] = { Cluster: clusterId, TotalPrice: 0, Count: 0 };
      }
      clusterMap[clusterId].TotalPrice += item.TotalPrice; // Sum total price per cluster
      clusterMap[clusterId].Count += 1; // Count number of items per cluster
    });

    return Object.values(clusterMap); // Return as array
  };

  useEffect(() => {
    // Aggregate data by clusters
    const aggregatedData = aggregateByCluster(clusters);
    setClusterData(aggregatedData);
  }, []);

  return (
      <ResponsiveContainer width="100%" height={400}>
        <h1 className="text-center text-2xl my-4 underline">Cluster-wise Sales and Record Distribution</h1>
        <BarChart data={clusterData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Cluster" name="Cluster">
          <Label value="Clusters" offset={-5} position="insideBottom" />
            </XAxis>
          <YAxis>
          <Label value="Total sales" angle={-90} position="insideLeft" /> {/* Y-axis label */}
            </YAxis>
          <Tooltip />
          <Bar dataKey="TotalPrice" fill="#8884d8" name="Total Sales" />
          <Bar dataKey="Count" fill="#82ca9d" name="Number of Records" />
        </BarChart>
      </ResponsiveContainer>
  );
}

// Define propTypes for prop validation
ClustersBarChart.propTypes = {
    clusters: PropTypes.arrayOf(
      PropTypes.shape({
        Cluster: PropTypes.number.isRequired,
        Country: PropTypes.number,
        CustomerID: PropTypes.number,
        InvoiceDate: PropTypes.string,
        InvoiceDayOfWeek: PropTypes.string,
        InvoiceNo: PropTypes.number,
        InvoiceTime: PropTypes.string,
        Quantity: PropTypes.number,
        StockCode: PropTypes.number,
        TotalPrice: PropTypes.number.isRequired,
        UnitPrice: PropTypes.number
      })
    ).isRequired,
  };

export default ClustersBarChart;
