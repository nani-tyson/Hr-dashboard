// src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { pathname } = useLocation();

  const navItem = (to, label) => (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg transition ${
        pathname === to
          ? 'bg-blue-600 text-white'
          : 'text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900'
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
          HR Dashboard
        </Link>
        <div className="flex items-center gap-2">
          {navItem('/bookmarks', '📌 Bookmarks')}
          {navItem('/analytics', '📊 Analytics')}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
