// src/components/FilterDropdown.jsx
import React, { useState } from 'react';

// src/components/FilterDropdown.jsx
const FilterDropdown = ({ onFilter }) => {
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedRating, setSelectedRating] = useState('');

  const handleFilter = () => onFilter(selectedDept, Number(selectedRating));

  return (
    <div className="flex flex-wrap gap-2">
      <select
        className="px-3 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
        value={selectedDept}
        onChange={(e) => setSelectedDept(e.target.value)}
      >
        <option value="">All Departments</option>
        <option value="HR">HR</option>
        <option value="Engineering">Engineering</option>
        <option value="Sales">Sales</option>
        <option value="Marketing">Marketing</option>
      </select>

      <select
        className="px-3 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
        value={selectedRating}
        onChange={(e) => setSelectedRating(e.target.value)}
      >
        <option value="">All Ratings</option>
        {[1, 2, 3, 4, 5].map(r => (
          <option key={r} value={r}>{r} Stars</option>
        ))}
      </select>

      <button
        onClick={handleFilter}
        className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Apply
      </button>
    </div>
  );
};

export default FilterDropdown;
