// src/pages/EmployeeDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import Tabs from '../components/Tabs';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/users/${id}`);
        const data = await res.json();
        data.department = ['HR', 'Engineering', 'Sales', 'Marketing'][Math.floor(Math.random() * 4)];
        data.performance = Math.floor(Math.random() * 5) + 1;
        data.bio = 'A passionate team member who consistently exceeds expectations.';
        data.address = `${data.address.address}, ${data.address.city}`;
        setEmployee(data);
      } catch (err) {
        console.error('Failed to load employee', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!employee) return <div className="p-6">Employee not found.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        {employee.firstName} {employee.lastName}
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Phone:</strong> {employee.phone}</p>
            <p><strong>Address:</strong> {employee.address}</p>
            <p><strong>Department:</strong> {employee.department}</p>
            <p className="flex items-center">
              <strong>Performance:</strong>&nbsp;
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={`h-4 w-4 ${i < employee.performance ? 'text-yellow-400' : 'text-gray-300'}`} />
              ))}
              <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                employee.performance >= 4
                  ? 'bg-green-200 text-green-800'
                  : employee.performance >= 3
                  ? 'bg-yellow-200 text-yellow-800'
                  : 'bg-red-200 text-red-800'
              }`}>
                {employee.performance}/5
              </span>
            </p>
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 italic">{employee.bio}</p>
      </div>

      <Tabs employee={employee} />
    </div>
  );
};

export default EmployeeDetails;
