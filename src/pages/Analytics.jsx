import React, { useState, useMemo } from "react";
import {
  ArrowPathIcon as RefreshIcon,
  ChartBarIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const tabs = [
  {
    id: "dept",
    label: "Department Ratings",
    icon: <ChartBarIcon className="w-5 h-5 inline-block mr-2" />,
  },
  {
    id: "bookmarks",
    label: "Bookmark Trends",
    icon: <ChartPieIcon className="w-5 h-5 inline-block mr-2" />,
  },
];

const mockDepartments = [
  "Engineering",
  "Marketing",
  "HR",
  "Sales",
  "Design",
];

const mockAvgRatings = [4.2, 3.8, 4.5, 3.9, 4.0];

const mockBookmarkTrends = [
  { month: "Jan", bookmarks: 5 },
  { month: "Feb", bookmarks: 8 },
  { month: "Mar", bookmarks: 12 },
  { month: "Apr", bookmarks: 7 },
  { month: "May", bookmarks: 10 },
];

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("dept");
  const [refreshing, setRefreshing] = useState(false);

  // Data for Dept Ratings Bar Chart
  const deptData = useMemo(
    () => ({
      labels: mockDepartments,
      datasets: [
        {
          label: "Avg Rating",
          data: mockAvgRatings,
          backgroundColor: "rgba(59, 130, 246, 0.7)", // Tailwind blue-500 with opacity
          borderRadius: 6,
          maxBarThickness: 40,
        },
      ],
    }),
    []
  );

  const deptOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    animation: {
      duration: 800,
    },
  };

  // Data for Bookmark Trends Pie Chart
  const bookmarkData = useMemo(() => {
    const labels = mockBookmarkTrends.map((item) => item.month);
    const data = mockBookmarkTrends.map((item) => item.bookmarks);

    return {
      labels,
      datasets: [
        {
          label: "Bookmarks",
          data,
          backgroundColor: [
            "#3b82f6", // blue-500
            "#60a5fa", // blue-400
            "#93c5fd", // blue-300
            "#bfdbfe", // blue-200
            "#dbeafe", // blue-100
          ],
          borderWidth: 1,
          borderColor: "#2563eb", // blue-600
        },
      ],
    };
  }, []);

  const bookmarkOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#374151" }, // Tailwind gray-700
      },
      tooltip: { enabled: true },
    },
    animation: {
      duration: 800,
    },
  };

  // Refresh handler (simulate fetching new data)
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      // Here you would normally re-fetch or recalc data
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
          Analytics Dashboard
        </h1>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-md transition"
          aria-label="Refresh Analytics Data"
          title="Refresh Analytics Data"
        >
          <RefreshIcon
            className={`w-5 h-5 animate-spin ${refreshing ? "" : "hidden"}`}
          />
          <RefreshIcon
            className={`w-5 h-5 ${refreshing ? "hidden" : "block"}`}
          />
          Refresh
        </button>
      </header>

      <nav className="flex space-x-6 mb-6 border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center py-2 px-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-blue-600 text-blue-700 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
            aria-current={activeTab === tab.id ? "page" : undefined}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </nav>

      <section className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        {activeTab === "dept" && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Average Department Ratings
            </h2>
            <Bar data={deptData} options={deptOptions} />
          </>
        )}
        {activeTab === "bookmarks" && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Bookmark Trends by Month
            </h2>
            <Pie data={bookmarkData} options={bookmarkOptions} />
          </>
        )}
      </section>
    </div>
  );
}
