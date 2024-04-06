import React from "react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <div className="flex justify-between border-b-[1px] dark:white border-white">
      <h1 className="text-3xl text-bold text-white dark:text-zinc-200 md: py-4 ml-6">Task Driver</h1>
      <div className="mr-3 mt-5">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
