import React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom"; // or your router's Link

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <ExclamationTriangleIcon className="w-20 h-20 text-red-600 mb-6" />
      <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white mb-4">404</h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Go back home
      </Link>
    </div>
  );
}
