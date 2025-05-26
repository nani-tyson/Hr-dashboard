// src/pages/Home.jsx
import React, { useEffect, useState, useRef, useCallback } from 'react';
import EmployeeCard from '../components/EmployeeCard';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import DarkModeToggle from '../components/DarkModeToggle';
import CreateUserModal from '../components/CreateUserModal';
import Button from '../components/UI/Button';

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8); // Load 8 at a time
  const [showModal, setShowModal] = useState(false);

  const observer = useRef();

  const lastEmployeeRef = useCallback(
    node => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && visibleCount < filteredEmployees.length) {
          setVisibleCount(prev => prev + 8);
        }
      });
      if (node) observer.current.observe(node);
    },
    [filteredEmployees.length, visibleCount]
  );

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await fetch('https://dummyjson.com/users?limit=20');
      const data = await res.json();
      const enhanced = data.users.map(emp => ({
        ...emp,
        department: ['HR', 'Engineering', 'Sales', 'Marketing'][Math.floor(Math.random() * 4)],
        performance: Math.floor(Math.random() * 5) + 1,
      }));
      setEmployees(enhanced);
      setFilteredEmployees(enhanced);
    };
    fetchEmployees();
  }, []);

  const handleSearch = (query) => {
    const result = employees.filter(emp =>
      `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(query.toLowerCase()) ||
      emp.email.toLowerCase().includes(query.toLowerCase()) ||
      emp.department.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEmployees(result);
    setVisibleCount(8); // reset view on search
  };

  const handleFilter = (department, rating) => {
    const result = employees.filter(emp => {
      const deptMatch = department ? emp.department === department : true;
      const ratingMatch = rating ? emp.performance === rating : true;
      return deptMatch && ratingMatch;
    });
    setFilteredEmployees(result);
    setVisibleCount(8); // reset view on filter
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <header className="mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">👥 HR Performance Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Monitor and manage employee performance across departments.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <DarkModeToggle />
            <Button onClick={() => setShowModal(true)}>➕ Add Employee</Button>
          </div>
        </header>

        <div className="mb-6 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          <div className="flex-1">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div>
            <FilterDropdown onFilter={handleFilter} />
          </div>
        </div>

        {filteredEmployees.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p>No matching employees found 😕</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredEmployees.slice(0, visibleCount).map((emp, index) => {
              if (index === visibleCount - 1) {
                return (
                  <div key={emp.id} ref={lastEmployeeRef}>
                    <EmployeeCard employee={emp} />
                  </div>
                );
              }
              return <EmployeeCard key={emp.id} employee={emp} />;
            })}
          </div>
        )}

        <CreateUserModal open={showModal} setOpen={setShowModal} />
      </div>
    </section>
  );
};

export default Home;
