import React from "react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <div className="flex justify-between border-b-[1px] dark:border-zinc-400 border-slate-500">
      <h1 className="text-3xl text-bold text-zinc-600 dark:text-zinc-200 md: py-4 ml-6">Your To-Do List</h1>
      <div className="mr-3 mt-5">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
