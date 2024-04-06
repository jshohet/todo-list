"use client";
import React from "react";
import { FaTrashAlt } from "@react-icons/all-files/fa/FaTrashAlt";
import { ListItem } from "../types/types";
import randomColor from "randomcolor";

function ToDoItem({
  description,
  isChecked,
  handleItem,
  id,
  dateTime,
  dateDate,
  deleteItem,
  category,
}: ListItem) {
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="flex mb-2">
      <div
        className={`flex flex-row m-1 text-black dark:text-black font-semibold p-4 rounded-md shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] 
         ${
           isChecked
             ? "bg-green-400 dark:bg-green-600"
             : "bg-rose-400 dark:bg-rose-400"
         }`}>
        <input
          type="checkbox"
          className="mr-6 sm:w-6 sm:h-6 xs:w-8 xs:h-8 my-auto"
          onChange={() => {
            if (handleItem) {
              handleItem(id);
            }
          }}
          checked={isChecked}
        />

        <div className="">
          <p className="text-xl break-all">{description}</p>
          {category && <p>{capitalizeFirstLetter(category["value"])}</p>}
          <p className="mt-1 text-black/70">
            {dateTime}&nbsp;{dateDate}
          </p>
        </div>
        <button
          className="ml-6"
          onClick={() => {
            if (deleteItem) {
              deleteItem(id);
            }
          }}>
          <FaTrashAlt size={20} />
        </button>
      </div>
    </div>
  );
}

export default ToDoItem;
