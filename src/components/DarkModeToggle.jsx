import { useBookmarks } from '../context/BookmarkContext';

function DarkModeToggle() {
  const { darkMode, toggleTheme } = useBookmarks();

  return (
    <button onClick={toggleTheme} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
      {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}
export default DarkModeToggle;