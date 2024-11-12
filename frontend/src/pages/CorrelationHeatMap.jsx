import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, Legend, Title } from 'chart.js';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
import { Chart } from 'react-chartjs-2';
import PropTypes from 'prop-types';

ChartJS.register(CategoryScale, LinearScale, Tooltip, Legend, Title, MatrixController, MatrixElement);

// Helper function to calculate correlation (simplified version)
function calculateCorrelation(arrX, arrY) {
  const n = arrX.length;
  const sumX = arrX.reduce((acc, val) => acc + val, 0);
  const sumY = arrY.reduce((acc, val) => acc + val, 0);
  const sumX2 = arrX.reduce((acc, val) => acc + val * val, 0);
  const sumY2 = arrY.reduce((acc, val) => acc + val * val, 0);
  const sumXY = arrX.reduce((acc, val, idx) => acc + val * arrY[idx], 0);

  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  
  return denominator ? numerator / denominator : 0;
}

// Function to process data and calculate correlations between variables
function processData(data) {
  const variables = ["Quantity", "UnitPrice", "TotalPrice", "CustomerID", "Country"];
  const correlationMatrix = [];

  variables.forEach((varX, i) => {
    variables.forEach((varY, j) => {
      const arrX = data.map((item) => item[varX]);
      const arrY = data.map((item) => item[varY]);
      const correlation = calculateCorrelation(arrX, arrY);

      correlationMatrix.push({ x: i, y: j, v: correlation });
    });
  });

  return { labels: variables, data: correlationMatrix };
}

function CorrelationHeatmap({ data }) {
  const { labels, data: matrixData } = processData(data);

  const chartData = {
    labels,
    datasets: [{
      label: 'Correlation',
      data: matrixData,
      backgroundColor: (context) => {
        const value = context.dataset.data[context.dataIndex].v;
        if (value > 0) {
          return `rgba(0, 128, 255, ${Math.abs(value)})`; // Blue for positive correlations
        } else {
          return `rgba(255, 99, 132, ${Math.abs(value)})`; // Red for negative correlations
        }
      },
      borderWidth: 1,
      width: ({ chart }) => (chart.chartArea || {}).width / labels.length - 5,
      height: ({ chart }) => (chart.chartArea || {}).height / labels.length - 5,
      hoverBackgroundColor: 'rgba(255,99,132,0.8)',
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category',
        labels: labels,
        title: {
          display: true,
          text: 'Variables'
        }
      },
      y: {
        type: 'category',
        labels: labels,
        title: {
          display: true,
          text: 'Variables'
        }
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Correlation: ${context.raw.v.toFixed(2)}`;
          }
        }
      },
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '500px', margin: 'auto' }}>
      <h2 className="text-center text-xl my-4 underline">Correlation Matrix</h2>
      <Chart type="matrix" data={chartData} options={options} />
    </div>
  );
}

CorrelationHeatmap.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      Quantity: PropTypes.number,
      UnitPrice: PropTypes.number,
      TotalPrice: PropTypes.number,
      CustomerID: PropTypes.number,
      Country: PropTypes.number
    })
  ).isRequired,
};

export default CorrelationHeatmap;
