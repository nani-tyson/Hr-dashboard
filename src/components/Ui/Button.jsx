import React from "react";

const Button = ({ children, variant = "primary", ...props }) => {
  const styles = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400",
    secondary:
      "bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-400",
  };
  return (
    <button className={styles[variant]} {...props}>
      {children}
    </button>
  );
};

export default Button;
