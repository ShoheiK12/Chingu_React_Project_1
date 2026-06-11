import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

// Chart.js register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function EnergyChart({ data }) {
  // if data is empty, no display
  if (!data || data.length === 0) {
    return <p>No data to display</p>;
  }

  // Transform data for Chart.js
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Energy Usage (kWh)",
        data: data.map((item) => item.usage),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.3, 
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 12,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },

      title: {
        display: true,
        text: "Energy Consumption Overview",
        font: {
          size: 16,
          weight: "600",
        },
      },

      tooltip: {
        mode: "index",
        intersect: false,
      },
    },

    interaction: {
      mode: "index",
      intersect: false,
    },

    scales: {
      x: {
        grid: {
          display: false, 
        },
      },

      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0,0,0,0.05)", 
        },
        ticks: {
          beginAtZero: true 
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "300px", marginTop: "20px" }}>
      <Line data={chartData} options={options} />
    </div>
  );
}