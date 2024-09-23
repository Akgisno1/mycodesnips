"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa"; // Importing icons

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300 `}
      onClick={handleToggle}
      aria-label="Toggle Dark Mode"
    >
      {theme === "dark" ? (
        <FaMoon className="text-yellow-400 text-xl" />
      ) : (
        <FaSun className="text-yellow-500 text-xl" />
      )}
    </button>
  );
};

export default DarkModeToggle;
