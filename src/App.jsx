import { useState } from "react";
import EnergyChart from "./components/EnergyChart";

export default function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");

  const [form, setForm] = useState({
    date: "",
    usage: ""
  });

  // 入力変更
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // データ追加
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.date || !form.usage) return;

    const newEntry = {
      id: Date.now(),
      date: form.date,
      usage: Number(form.usage)
    };

    setData((prev) => [...prev, newEntry]);

    setForm({
      date: "",
      usage: ""
    });
  };

  // filtering
  const getFilteredData = () => {
    if (filter === "week") {
      return data.slice(-7);
    }

    if (filter === "month") {
      return data.slice(-30);
    }

    return data;
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Energy Dashboard</h1>

      {/* フォーム */}
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />

        <input
          type="number"
          name="usage"
          value={form.usage}
          onChange={handleChange}
        />

        <button type="submit">Add</button>
      </form>

      <hr />

      {/* フィルタ */}
      <div style={{ margin: "10px 0" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("week")}>Week</button>
        <button onClick={() => setFilter("month")}>Month</button>
      </div>

      {/* グラフ */}
      <EnergyChart data={getFilteredData()} />

      {/* 一覧 */}
      <h2>Records</h2>

      {data.length === 0 ? (
        <p>No data yet</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              {item.date} → {item.usage} kWh
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

