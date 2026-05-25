import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = ["#22c55e", "#ef4444", "#3b82f6", "#f59e0b", "#8b5cf6"];

function buildCategoryData(transactions) {
  const map = {};
  transactions.forEach((t) => {
    map[t.category] = (map[t.category] || 0) + Number(t.amount || 0);
  });
  return Object.keys(map).map((key) => ({ name: key, value: map[key] }));
}

function buildTimeSeries(transactions) {
  const grouped = {};
  // group by date (YYYY-MM-DD)
  transactions.forEach((t) => {
    const d = t.date || "";
    grouped[d] =
      (grouped[d] || 0) +
      Number(t.amount || 0) * (t.type === "expense" ? -1 : 1);
  });
  // sort dates
  const keys = Object.keys(grouped).sort();
  return keys.map((k) => ({ date: k, amount: grouped[k] }));
}

export default function Charts({ transactions }) {
  const pieData = buildCategoryData(transactions).slice(0, 5);
  const lineData = buildTimeSeries(transactions);

  return (
    <div className="charts-grid">
      <div className="chart-card">
        <h3 className="chart-title">Spending by Category</h3>
        <div style={{ width: "100%", height: 260 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                fill="#8884d8"
              >
                {pieData.map((_, idx) => (
                  <Cell
                    key={`cell-${idx}`}
                    fill={COLORS[idx % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card">
        <h3 className="chart-title">Income / Expense Over Time</h3>
        <div style={{ width: "100%", height: 260 }}>
          <ResponsiveContainer>
            <LineChart
              data={lineData}
              margin={{ top: 8, right: 12, left: -8, bottom: 8 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
