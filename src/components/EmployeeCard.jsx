// src/components/EmployeeCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookmarks } from '../context/BookmarkContext';
import { FaStar } from 'react-icons/fa';

const EmployeeCard = ({ employee }) => {
  const navigate = useNavigate();
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();

  const handleBookmark = () => {
    isBookmarked(employee.id) ? removeBookmark(employee.id) : addBookmark(employee);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded p-4 shadow">
      <h2 className="text-lg font-semibold">{employee.firstName} {employee.lastName}</h2>
      <p className="text-sm text-gray-500">{employee.email}</p>
      <p>Age: {employee.age}</p>
      <p>Department: <span className="font-medium">{employee.department}</span></p>
      <div className="flex items-center my-2">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className={`h-4 w-4 ${i < employee.performance ? 'text-yellow-400' : 'text-gray-300'}`} />
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        <button onClick={() => navigate(`/employee/${employee.id}`)} className="btn">View</button>
        <button onClick={handleBookmark} className="btn bg-blue-500 text-white">
          {isBookmarked(employee.id) ? 'Unbookmark' : 'Bookmark'}
        </button>
        <button className="btn bg-green-600 text-white">Promote</button>
      </div>
    </div>
  );
};

export default EmployeeCard;
