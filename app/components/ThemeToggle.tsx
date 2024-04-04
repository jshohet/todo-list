"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { FaMoon } from "@react-icons/all-files/fa/FaMoon";
import { FaSun } from "react-icons/fa6";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("theme") != null) {
      const localTheme = localStorage.getItem("theme") || "";
      setTheme(localTheme);
    }else{
      localStorage.setItem("theme", "light")
    }
    setMounted(true)}, [setTheme]);

  if (!mounted) {
    return null;
  }

  function changeTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }
//   get from local storage
  
  return (
    <div>
      <button onClick={changeTheme}>
        {theme === "light" ? (
          <FaMoon size={30} />
        ) : (
          <FaSun size={30} color="white" />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
