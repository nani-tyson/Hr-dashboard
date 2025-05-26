import { createContext, useContext, useState, useEffect } from 'react';

// Create Context
const BookmarkContext = createContext();

// Provider Component
export const BookmarkProvider = ({ children }) => {
  // Bookmarks state with localStorage persistence
  const [bookmarks, setBookmarks] = useState(() => {
    const stored = localStorage.getItem('bookmarkedEmployees');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookmarkedEmployees', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (employee) => {
    if (!bookmarks.some(emp => emp.id === employee.id)) {
      setBookmarks((prev) => [...prev, employee]);
    }
  };

  const removeBookmark = (id) => {
    setBookmarks((prev) => prev.filter((emp) => emp.id !== id));
  };

  const isBookmarked = (id) => bookmarks.some(emp => emp.id === id);

  // ========== Dark Mode State & Logic ==========

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  // ========== Provide everything in one context ==========

  return (
    <BookmarkContext.Provider value={{
      bookmarks,
      addBookmark,
      removeBookmark,
      isBookmarked,
      darkMode,
      toggleTheme,
    }}>
      {children}
    </BookmarkContext.Provider>
  );
};

// Custom hook for convenience
export const useBookmarks = () => useContext(BookmarkContext);
