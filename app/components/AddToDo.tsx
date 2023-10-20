"use client";
import React, { ReactNode } from "react";
import ToDoItem from "./ToDoItem";
import { ListItem } from "./types";
import { nanoid } from "nanoid";

const AddToDo = () => {
  //state array -> push on "add item" click and set localstorage
  const [itemData, setItemData] = React.useState<ListItem[]>([]);
  const [inputData, setInputData] = React.useState<string>("");
  function handleAdd(event: any) {
    event.preventDefault();
    setItemData([
      ...itemData,
      { id: nanoid(), description: inputData, isChecked: false },
    ]);
  }
  function toggleItem(id: string) {
    setItemData((prevItemData) => {
      return prevItemData.map((item) => {
        return item.id === id ? { ...item, isChecked: !item.isChecked } : item;
      });
    });
  }

  const createList = itemData.map((item) => {
    return (
      <ToDoItem
        key={item.id}
        description={item.description}
        isChecked={false}
        id={item.id}
        handleItem={toggleItem}
      />
    );
  });
  console.log(itemData);
  //array of objects with description and isChecked
  //TODO - use effect to get from localstorage
  return (
    <div className="flex items-center flex-col">
      <input
        type="text"
        className="border-solid text-2xl border-2 p-2 rounded-lg focus:border-sky-300 dark:border-slate-400"
        placeholder="New to-do item"
        id="name"
        name="todo"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputData(e.target.value)
        }
      />
      <button
        onClick={handleAdd}
        className="border-2 text-2xl my-6 rounded-lg border-slate-500 hover:border-slate-700 hover:bg-cyan-500 px-4 py-2 dark:bg-zinc-200 dark:text-black dark:hover:bg-sky-300">
        Add Item
      </button>
      {createList}
    </div>
  );
};

export default AddToDo;
