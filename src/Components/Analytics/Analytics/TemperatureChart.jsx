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

const TemperatureChart = () => {
  const data = {
    labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
    datasets: [
      {
        label: 'Temperature',
        data: [],
        borderColor: '#fb2c36',
        backgroundColor: 'rgba(251, 44, 54, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#fb2c36',
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
        borderColor: '#fb2c36',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `Temperature: ${context.parsed.y}°C`;
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
        min: 15,
        max: 35,
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
            return value + '°C';
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
    <div style={{ width: '100%', height: '280px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default TemperatureChart;
