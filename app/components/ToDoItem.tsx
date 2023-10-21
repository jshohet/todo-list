"use client";
import React from "react";
import { FaTrashAlt } from "@react-icons/all-files/fa/FaTrashAlt";
import { ListItem } from "./types";

function ToDoItem({ description, isChecked, handleItem, id, scheduledToDelete, deleteItem }: ListItem) {
  return (
    <div className="flex flex-wrap justify-center  mb-2">
      <div
        className={`flex flex-row  text-black  dark:text-black w-fit  dark:bg-zinc-300  p-4 rounded-full ${
          isChecked ? "bg-green-400 " : "bg-rose-200"
        } ${isChecked ? "dark:bg-green-600" : "dark:bg-rose-200"}`}>
        <input
          type="checkbox"
          className="mr-10 w-6 h-6 mt-0.5"
          onChange={() => {
            if (handleItem) {
              handleItem(id);
            }
          }}
          checked={isChecked}
        />

        <p className="text-xl">{description}</p>
        <button className="ml-6" onClick={()=>{
          if(deleteItem){
            deleteItem(id)
          }
        }}>
          <FaTrashAlt size={20} />
        </button>
      </div>
    </div>
  );
}

export default ToDoItem;
