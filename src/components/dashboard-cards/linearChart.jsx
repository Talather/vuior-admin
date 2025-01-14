'use client'
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DashboardStats = ({ paymentsData }) => {
  // Line chart data
  const chartData = {
    labels: paymentsData.dates, // Array of dates for the x-axis
    datasets: [
      {
        label: 'Payments Processed',
        data: paymentsData.values, // Array of payment amounts
        borderColor: '#10a37f',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        pointBorderColor: '#4CAF50',
        pointBackgroundColor: '#fff',
        pointHoverBackgroundColor: '#4CAF50',
        pointHoverBorderColor: '#fff',
        fill: true, // Fill under the line
      },
    ],
  };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       tooltip: {
//         callbacks: {
//           label: function (tooltipItem) {
//             return `$${tooltipItem.raw.toFixed(2)}`;
//           },
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

    
    
    
    const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      enabled: true,
    },
  },
  scales: {
    x: {
      grid: {
        drawBorder: false, // Removes the border line on the x-axis
        display: false, // Removes the grid lines
      },
      ticks: {
        display: true, // Hides the ticks on the x-axis
      },
    },
    y: {
      grid: {
        drawBorder: false, // Removes the border line on the y-axis
        display: false, // Removes the grid lines
      },
      ticks: {
        display: true, // Hides the ticks on the y-axis
      },
    },
  },
};
  return (
    <div className="">
      

          












      {/* Payments Processed Line Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md ">
        <h3 className="text-xl font-semibold mb-4">Payments Processed</h3>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default DashboardStats;
