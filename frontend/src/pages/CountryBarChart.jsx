import { useState, useEffect } from "react";
import PropTypes from 'prop-types'; 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from "recharts";

function CountryBarChart({ data }) {
  const [countryData, setCountryData] = useState([]);

  const aggregateByCountry = (data) => {
    const countryMap = {};

    data.forEach((item) => {
      const countryId = item.Country;
      if (!countryMap[countryId]) {
        countryMap[countryId] = { Country: countryId, TotalQuantity: 0 };
      }
      countryMap[countryId].TotalQuantity += item.Quantity; // Sum quantity per country
    });

    return Object.values(countryMap); // Return as array
  };

  useEffect(() => {
    const aggregatedData = aggregateByCountry(data);
    setCountryData(aggregatedData);
  }, [data]);

  return (
    <ResponsiveContainer width="80%" height={400}>
      <BarChart data={countryData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Country" name="Country">
          <Label value="Country" offset={-5} position="insideBottom" />
        </XAxis>
        <YAxis>
          <Label value="Total Quantity" angle={-90} position="insideLeft" />
        </YAxis>
        <Tooltip />
        <Bar dataKey="TotalQuantity" fill="#4682B4" name="Total Quantity" />
      </BarChart>
    </ResponsiveContainer>
  );
}

CountryBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      Country: PropTypes.number.isRequired,
      Quantity: PropTypes.number.isRequired
    })
  ).isRequired,
};

export default CountryBarChart;
