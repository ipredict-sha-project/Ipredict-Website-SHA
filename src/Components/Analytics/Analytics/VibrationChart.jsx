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

const VibrationChart = () => {
  const data = {
    labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
    datasets: [
      {
        label: 'Vibration Level',
        data: [],
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#f59e0b',
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
        borderColor: '#f59e0b',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `Vibration: ${context.parsed.y} mm/s`;
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
        min: 0,
        max: 2,
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
          stepSize: 0.5,
          callback: function(value) {
            return value + ' mm/s';
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

export default VibrationChart;
