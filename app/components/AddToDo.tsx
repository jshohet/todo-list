"use client";
import React, { ReactNode, useEffect, useState } from "react";
import ToDoItem from "./ToDoItem";
import { ListItem } from "../types/types";
import { nanoid } from "nanoid";
import { PresetOptions, options } from "../types/types";
import dynamic from "next/dynamic";
const ReactSelect = dynamic(() => import("react-select"), {
  loading: () => <p>Loading...</p>,
});
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddToDo = () => {
  //state array -> push on "add item" click and set localstorage
  const [itemData, setItemData] = useState<ListItem[]>([]);
  const [inputData, setInputData] = useState<string>("");
  const [selectedDropdown, setSelectedDropdown] = useState<options>({
    value: "",
    label: "",
  });
  const [addCategory, setAddCategory] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [categoryOptions, setCategoryOptions] =
    useState<options[]>(PresetOptions);

  const handleDropDownChange = (selection: any) => {
    if (selection.value === "Add new category") {
      setAddCategory(true);
      setSelectedDropdown(selection);
    } else {
      setAddCategory(false);
      setSelectedDropdown(selection);
    }
  };

  const categoryAdd = (event: any) => {
    event.preventDefault();
    const newCategory: options = { value: category, label: category };
    if(category === ""){
      toast.warn("Enter a category name!");
      return;
    }
    if (!categoryOptions.some((item) => item.label === newCategory.label)) {
      setCategoryOptions(() => [...categoryOptions, newCategory]);
      setSelectedDropdown(newCategory);
      setCategory("");
      setAddCategory(false);
      toast.success("Category added!");
      return;
    } else {
      toast.warn("This category already exists!");
      return;
    }
  };

  function handleAdd(event: any) {
    event.preventDefault();
    setItemData([
      ...itemData,
      {
        id: nanoid(),
        description: inputData,
        isChecked: false,
        dateTime: new Date().toLocaleTimeString(),
        dateDate: new Date().toLocaleDateString(),
        category: selectedDropdown,
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
          deleteItem={deleteItem}
          dateTime={item.dateTime}
          dateDate={item.dateDate}
          category={selectedDropdown}
        />
      );
    }
  });

  useEffect(() => {
    if (localStorage.getItem("listItems")) {
      const localItems = localStorage.getItem("listItems") as string;
      setItemData(JSON.parse(localItems) || []);
    }
  }, []);
  return (
    <div className="flex items-center flex-col mt-2">
      <ToastContainer
        limit={2}
        autoClose={2000}
        closeOnClick={true}
        theme="dark"
        position="bottom-right"
      />
      <form className="flex items-center flex-col">
        <label htmlFor="react select" className="text-2xl mb-0.5">Category:</label>
        <ReactSelect
          name="react select"
          className="dark:text-black mb-6 font-bold w-full mx-auto text-xl resize-none"
          isSearchable={true}
          options={categoryOptions}
          value={selectedDropdown}
          onChange={handleDropDownChange}
        />
        {addCategory && (
          <div>
            <input
              className="bg-slate-200 dark:bg-slate-800 border-solid sm:text-2xl xs:text-lg border-2 p-2 mb-2 rounded-md placeholder:text-center focus:border-sky-300 dark:border-slate-400"
              defaultValue={"Name your category"}
              name="category"
              autoComplete="on"
              value={category}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCategory(e.target.value);
              }}></input>
            <button
              className="ml-2 border-2 text-2xl my-6 rounded-lg px-2 py-2 border-slate-500 hover:border-slate-700 hover:bg-green-700  dark:bg-zinc-200 dark:text-black dark:hover:bg-emerald-400"
              onClick={categoryAdd}>
              Add
            </button>
          </div>
        )}
        <textarea
          className="bg-slate-200 dark:bg-slate-800 resize-none border-solid sm:text-2xl xs:text-lg border-2 p-2 rounded-lg w-max placeholder:text-center focus:border-sky-300 dark:border-slate-400"
          placeholder="New to-do item"
          id="name"
          name="todo"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setInputData(e.target.value)
          }
          value={inputData}
        />
        <button
          disabled={addCategory}
          onClick={handleAdd}
          className={`${
            addCategory
              ? "border-0 cursor-not-allowed bg-zinc-200 dark:text-slate-800"
              : "border-slate-500 hover:border-slate-700 hover:bg-green-700  dark:bg-zinc-200 dark:text-black dark:hover:bg-emerald-400"
          } border-2 text-2xl my-6 rounded-lg px-4 py-2`}>
          Add Item
        </button>
      </form>
      {createList}
    </div>
  );
};

export default AddToDo;
