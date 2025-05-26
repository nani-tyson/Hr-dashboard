// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EmployeeDetails from './pages/EmployeeDetails';
import Bookmarks from './pages/Bookmarks';
import Analytics from './pages/Analytics';
import NotFound from './pages/NotFound';
import Login from './pages/Login';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Add a Header/NavBar here if needed */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/employee/:id" element={<EmployeeDetails />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
