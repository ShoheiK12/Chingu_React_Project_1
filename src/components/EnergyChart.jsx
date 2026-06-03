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

// Chart.js登録（必須）
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
  // データが空なら何も表示しない
  if (!data || data.length === 0) {
    return <p>No data to display</p>;
  }

  // Chart.js用に整形
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Energy Usage (kWh)",
        data: data.map((item) => item.usage),
        borderColor: "blue",
        backgroundColor: "rgba(0,0,255,0.2)",
        tension: 0.3, // 曲線のなめらかさ
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Energy Consumption Overview",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <Line data={chartData} options={options} />
    </div>
  );
}