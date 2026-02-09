import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AlertsIncidentChart = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Info',
        data: [12, 16, 19, 13, 24, 18, 14],
        backgroundColor: '#2962ff',
        borderRadius: 4,
      },
      {
        label: 'Warning',
        data: [12, 9, 16, 11, 19, 13, 11],
        backgroundColor: '#ff6900',
        borderRadius: 4,
      },
      {
        label: 'Critical',
        data: [8, 6, 8, 7, 10, 7, 7],
        backgroundColor: '#fb2c36',
        borderRadius: 4,
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
        backgroundColor: '#fff',
        titleColor: '#000',
        bodyColor: '#6b7280',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return context.dataset.label + ': ' + context.parsed.y + ' alerts';
          }
        }
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
            family: 'Inter',
          },
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        max: 60,
        grid: {
          color: '#e5e7eb',
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          stepSize: 15,
          color: '#6b7280',
          font: {
            size: 12,
            family: 'Inter',
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default AlertsIncidentChart;
