// src/pages/Bookmarks.jsx
import React from 'react';
import { useBookmarks } from '../context/BookmarkContext';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const Bookmarks = () => {
  const { bookmarks, removeBookmark } = useBookmarks();
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📌 Bookmarked Employees</h1>

      {bookmarks.length === 0 ? (
        <p className="text-gray-500">No bookmarked employees found. Bookmark from Dashboard.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bookmarks.map((employee) => (
            <div key={employee.id} className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
              <div className="mb-2">
                <h2 className="text-lg font-semibold">
                  {employee.firstName} {employee.lastName}
                </h2>
                <p className="text-sm text-gray-500">{employee.email}</p>
                <p className="text-sm text-gray-500">Department: {employee.department}</p>
              </div>

              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`h-4 w-4 ${i < employee.performance ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>

              <div className="flex flex-col space-y-2 mt-4">
                <button
                  onClick={() => navigate(`/employee/${employee.id}`)}
                  className="btn bg-indigo-600 text-white"
                >
                  View Profile
                </button>
                <button
                  onClick={() => removeBookmark(employee.id)}
                  className="btn bg-red-500 text-white"
                >
                  Remove Bookmark
                </button>
                <button className="btn bg-green-500 text-white">Assign to Project</button>
                <button className="btn bg-blue-500 text-white">Promote</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
