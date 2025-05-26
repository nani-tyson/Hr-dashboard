// src/components/SearchBar.jsx
import React from 'react';

// src/components/SearchBar.jsx
const SearchBar = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="🔍 Search by name, email or department"
      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBar;
