// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('hr-dashboard-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem('hr-dashboard-user', JSON.stringify(user));
    else localStorage.removeItem('hr-dashboard-user');
  }, [user]);

  const login = (email, password) => {
    // Simple mock login: accept any email/password with basic validation
    if (email && password) {
      setUser({ email, name: 'HR Manager' }); // mock user data
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
