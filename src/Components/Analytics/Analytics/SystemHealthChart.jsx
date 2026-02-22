import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SystemHealthChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'System Health Score',
        data: [82, 79, 85, 88, 84, 87, 90, 86, 88, 91, 89, 92],
        borderColor: '#2962ff',
        backgroundColor: 'rgba(41, 98, 255, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#2962ff',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#2962ff',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `Health Score: ${context.parsed.y}%`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#999',
          font: {
            family: 'Inter',
            size: 12,
          },
        },
      },
      y: {
        min: 70,
        max: 100,
        grid: {
          color: '#f0f0f0',
          drawBorder: false,
        },
        ticks: {
          color: '#999',
          font: {
            family: 'Inter',
            size: 12,
          },
          stepSize: 5,
          callback: function(value) {
            return value;
          }
        },
      },
    },
    interaction: {
      mode: 'nearest',
      intersect: false,
    },
  };

  return (
    <div style={{ width: '100%', height: '320px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default SystemHealthChart;
