import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function SystemActivityChart() {
  const chartRef = React.useRef(null);

  // Time labels for X-axis
  const timeLabels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'];
  
  // Data points for Active Devices (blue line)
  const devicesValues = [1700, 1800, 2100, 2300, 2600, 2400, 2200, 2100];
  
  // Data points for Sensor Readings (green line)
  const sensorsValues = [4200, 4500, 5000, 5400, 5800, 6000, 5600, 5300];

  const data = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Sensor Readings',
        data: sensorsValues,
        borderColor: '#10b981',
        backgroundColor: '#10b981',
        borderWidth: 2.5,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointHoverBackgroundColor: '#10b981',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2,
      },
      {
        label: 'Active Devices',
        data: devicesValues,
        borderColor: '#2962ff',
        backgroundColor: '#2962ff',
        borderWidth: 2.5,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: '#2962ff',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointHoverBackgroundColor: '#2962ff',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'nearest',
      intersect: true,
      axis: 'xy'
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#ffffff',
        titleColor: '#1f2937',
        bodyColor: '#1f2937',
        borderColor: '#e5e7eb',
        borderWidth: 2,
        padding: 12,
        displayColors: true,
        boxWidth: 8,
        boxHeight: 8,
        usePointStyle: true,
        titleFont: {
          size: 13,
          weight: '600'
        },
        bodyFont: {
          size: 13
        },
        callbacks: {
          title: (context) => {
            return `Time: ${context[0].label}`;
          },
          label: (context) => {
            return `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`;
          },
          labelColor: (context) => {
            return {
              borderColor: context.dataset.borderColor,
              backgroundColor: context.dataset.borderColor,
              borderWidth: 2,
              borderRadius: 2,
            };
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
            family: 'Inter, sans-serif'
          }
        }
      },
      y: {
        min: 0,
        max: 6000,
        ticks: {
          stepSize: 1500,
          color: '#6b7280',
          font: {
            size: 12,
            family: 'Inter, sans-serif'
          },
          callback: function(value) {
            return value;
          }
        },
        grid: {
          color: '#e5e7eb',
          drawBorder: false,
        }
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '280px' }}>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
}

export default SystemActivityChart;
