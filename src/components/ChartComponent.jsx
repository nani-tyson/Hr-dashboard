// src/components/ChartComponent.jsx
import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = ({ type = "bar", data, options }) => {
  if (!data) return <p>Loading chart...</p>;

  return (
    <div className="w-full h-96">
      {type === "bar" && <Bar data={data} options={options} />}
      {type === "line" && <Line data={data} options={options} />}
    </div>
  );
};

export default ChartComponent;
