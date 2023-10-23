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
      {
        id: nanoid(),
        description: inputData,
        isChecked: false,
        scheduledToDelete: false,
      },
    ]);
    setInputData("");
  }
  function toggleItem(id: string) {
    setItemData((prevItemData) => {
      return prevItemData.map((item) => {
        return item.id === id ? { ...item, isChecked: !item.isChecked } : item;
      });
    });
    
  }

  function deleteItem(id: string) {
    setItemData((prevItemData) => {
      return prevItemData.filter((item) => {
        return item.id !== id;
      });
    });
    localStorage.setItem("listItems", [].toString());
  }

  const createList = itemData.map((item) => {
    localStorage.setItem("listItems", JSON.stringify(itemData));

    if (itemData) {
      return (
        <ToDoItem
          key={item.id}
          description={item.description}
          isChecked={item.isChecked}
          id={item.id}
          handleItem={toggleItem}
          scheduledToDelete={item.scheduledToDelete}
          deleteItem={deleteItem}
        />
      );
    }
  });
  React.useEffect(() => {
    if (localStorage.getItem("listItems")) {
      const localItems = localStorage.getItem("listItems") as string;
      setItemData(JSON.parse(localItems) || []);
    }
  }, []);
  return (
    <div className="flex items-center flex-col">
      <textarea
        className="bg-slate-200 dark:bg-slate-800 resize-none border-solid sm:text-2xl xs:text-lg border-2 p-2 rounded-lg w-80 placeholder:text-center focus:border-sky-300 dark:border-slate-400"
        placeholder="New to-do item"
        id="name"
        name="todo"
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setInputData(e.target.value)
        }
        value={inputData}
      />
      <button
        onClick={handleAdd}
        className="border-2 text-2xl my-6 rounded-lg border-slate-500 hover:border-slate-700 hover:bg-green-700 px-4 py-2 dark:bg-zinc-200 dark:text-black dark:hover:bg-emerald-400">
        Add Item
      </button>
      {createList}
    </div>
  );
};

export default AddToDo;
