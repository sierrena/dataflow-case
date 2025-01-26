import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { useDataContext } from "../context/DataContext";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const ChartsPage: React.FC = () => {
  const { teams } = useDataContext();

  const pieData = teams.map((team) => ({
    name: team.name,
    value: team.users.length,
  }));

  const barData = teams.map((team) => ({
    name: team.name,
    users: team.users.length,
  }));

  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          padding: "1rem",
        }}
      >
        <h3>Pie Chart: Users per Team</h3>
        <PieChart width={300} height={300}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          padding: "1rem",
        }}
      >
        <h3>Bar Chart: Users per Team</h3>
        <BarChart width={400} height={300} data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="users" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default ChartsPage;
