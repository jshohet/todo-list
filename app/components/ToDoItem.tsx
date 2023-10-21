"use client";
import React from "react";
import { FaTrashAlt } from "@react-icons/all-files/fa/FaTrashAlt";
import { ListItem } from "./types";

function ToDoItem({
  description,
  isChecked,
  handleItem,
  id,
  scheduledToDelete,
  deleteItem,
}: ListItem) {
  return (
    <div className="flex mb-2">
      <div
        className={`flex flex-row m-1 text-black  dark:text-black p-4 rounded-full ${
          isChecked ? "bg-green-400 " : "bg-rose-200"
        } ${isChecked ? "dark:bg-green-600" : "dark:bg-rose-200"}`}>
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

        <p className="text-xl break-all">{description}</p>
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
