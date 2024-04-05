"use client";
import React, { use } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/Hooks";
import { nanoid } from "@reduxjs/toolkit";
import { setClickedCategory } from "../slices/ClickedCategorySlice";
import { toast } from "react-toastify";

const Sidebar = () => {
  const categoryOptions = useAppSelector(
    (state) => state.categoryOptions.category
  );
  const dispatch = useAppDispatch();

  const clickCategory = (event: any) => {
    dispatch(
      setClickedCategory({
        value: event.target.innerHTML,
        label: event.target.innerHTML,
      })
    );
    toast.success(`Filtered to ${event.target.innerHTML.toLowerCase()}.`, {
      toastId: nanoid(),
    });
  };

  const clearCategory = (event: any) => {
    dispatch(setClickedCategory({ value:"",label:""}));
    toast.success("Category filter cleared.");
  };

  const createCategories = categoryOptions.map((category) => {
    if (category.label !== "Add new category") {
      return (
        <li key={nanoid()} className="cursor-pointer mb-0.5 hover:underline" onClick={clickCategory}>
          {category.label}
        </li>
      );
    } else {
      return <li></li>;
    }
  });

  return (
    <div className="md:ml-[3%] lg:ml-[10%] mb-2 flex items-center md:fixed flex-col ">
      <h2 className="mb-1 text-xl">Category filter:</h2>
      <ul className="dark:bg-[#2B2B36] bg-gray-500 text-zinc-100 text-lg px-2 py-1 rounded-md">
        <li onClick={clearCategory} className="mb-1 hover:underline cursor-pointer">
          Clear filter
        </li>
        {createCategories}
      </ul>
    </div>
  );
};

export default Sidebar;



