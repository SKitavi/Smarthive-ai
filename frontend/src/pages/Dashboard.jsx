// pages/Dashboard.js

import  { useEffect, useState } from 'react';

const dataUrl = 'http://localhost:5000/api/clusters'; 

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [averageQuantity, setAverageQuantity] = useState(0);
  // const {isLoading} = useFetch()

  useEffect(() => {
    // Fetch data from JSON file
    const fetchData = async () => {
      try {
        const response = await fetch(dataUrl);
        const jsonData = await response.json();
        setData(jsonData?.clusters);

        // Calculate metrics
        const revenue = jsonData?.clusters.reduce((sum, invoice) => sum + invoice.TotalPrice, 0);
        const invoices = jsonData?.clusters?.length;
        const avgQuantity = jsonData?.clusters?.reduce((sum, invoice) => sum + invoice.Quantity, 0) / invoices;

        setTotalRevenue(revenue.toFixed(2));
        setTotalInvoices(invoices);
        setAverageQuantity(avgQuantity.toFixed(2));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log('====================================');
  console.log(data);
  console.log('====================================');

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      {/* Summary Section */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-100 rounded shadow">
          <h2 className="text-lg font-semibold">Total Revenue</h2>
          <p className="text-2xl font-bold">${totalRevenue}</p>
        </div>
        <div className="p-4 bg-green-100 rounded shadow">
          <h2 className="text-lg font-semibold">Total Invoices</h2>
          <p className="text-2xl font-bold">{totalInvoices}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded shadow">
          <h2 className="text-lg font-semibold">Avg Quantity per Invoice</h2>
          <p className="text-2xl font-bold">{averageQuantity}</p>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Invoice No</th>
              <th className="px-4 py-2 border">Stock Code</th>
              <th className="px-4 py-2 border">Quantity</th>
              <th className="px-4 py-2 border">Unit Price</th>
              <th className="px-4 py-2 border">Total Price</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Time</th>
              <th className="px-4 py-2 border">Customer ID</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((invoice) => (
              <tr key={invoice.InvoiceNo} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{invoice.InvoiceNo}</td>
                <td className="px-4 py-2 border">{invoice.StockCode}</td>
                <td className="px-4 py-2 border">{invoice.Quantity}</td>
                <td className="px-4 py-2 border">${invoice.UnitPrice}</td>
                <td className="px-4 py-2 border">${invoice.TotalPrice.toFixed(2)}</td>
                <td className="px-4 py-2 border">{invoice.InvoiceDate}</td>
                <td className="px-4 py-2 border">{invoice.InvoiceTime}</td>
                <td className="px-4 py-2 border">{invoice.CustomerID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
