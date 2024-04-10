"use client";
import React, { ReactNode, useEffect, useState } from "react";
import ToDoItem from "./ToDoItem";
import { nanoid } from "nanoid";
import { ListItem, PresetOptions, options } from "../types/types";
import dynamic from "next/dynamic";
import { setItemData } from "../slices/ItemDataSlice";
import { setCategoryOptions } from "../slices/CategorySlice";
import { useAppDispatch, useAppSelector } from "../hooks/Hooks";
const ReactSelect = dynamic(() => import("react-select"), {
  loading: () => <p>Loading...</p>,
});
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPlusSquare } from "react-icons/fa";

const AddToDo = () => {
  //use redux store
  const itemData = useAppSelector((state) => state.itemData.itemData);
  const dispatch = useAppDispatch();

  //category options redux
  const categoryOptions = useAppSelector(
    (state) => state.categoryOptions.category
  );

  const clickedCategory = useAppSelector(
    (state) => state.clickedCategory.category
  );

  //states just in this file
  const [filteredData, setFilteredData] = useState<ListItem[]>(itemData);
  const [inputData, setInputData] = useState<string>("");
  const [selectedDropdown, setSelectedDropdown] = useState<options>({
    value: "",
    label: "",
  });
  const [addCategory, setAddCategory] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");

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
    if (category === "") {
      toast.warn("Enter a category name!", { toastId: nanoid() });
      return;
    }
    if (!categoryOptions.some((item) => item.label === newCategory.label)) {
      dispatch(setCategoryOptions([...categoryOptions, newCategory]));
      setSelectedDropdown(newCategory);
      setCategory("");
      setAddCategory(false);
      toast.success("Category added!", { toastId: nanoid() });
      return;
    } else {
      toast.warn("This category already exists!", { toastId: nanoid() });
      return;
    }
  };

  const handleAdd = (event: any) => {
    event.preventDefault();
    if (inputData === "") {
      toast.warn("Please enter a to-do item!");
      return;
    }
    if(selectedDropdown.value === ""){
      toast.warn("Please select a cateogry!");
      return;
    }
      dispatch(
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
        ])
      );
      setFilteredData([
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
      toast.success("Item added!", { toastId: nanoid() });
    
    setInputData("");
  };

  const toggleItem = (id: string) => {
    dispatch(
      setItemData(
        itemData.map((item) => {
          return item.id === id
            ? { ...item, isChecked: !item.isChecked }
            : item;
        })
      )
    );
    setFilteredData(
      itemData.map((item) => {
        return item.id === id ? { ...item, isChecked: !item.isChecked } : item;
      })
    );
  };

  const deleteItem = (id: string) => {
    dispatch(
      setItemData(
        itemData.filter((item) => {
          return item.id !== id;
        })
      )
    );
    setFilteredData(
      itemData.filter((item) => {
        return item.id !== id;
      })
    );
    localStorage.setItem("listItems", [].toString());
  };

  const createList = filteredData.map((item: ListItem) => {
    localStorage.setItem("listItems", JSON.stringify(itemData));

    if (filteredData) {
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
          category={item.category}
        />
      );
    }
  });

  useEffect(() => {
    if (clickedCategory.value !== "") {
      setFilteredData(
        itemData.filter((item) => {
          return item.category.value === clickedCategory.value;
        })
      );
    } else {
      setFilteredData(itemData);
    }
  }, [clickedCategory]);

  useEffect(() => {
    if (localStorage.getItem("listItems")) {
      const localItems = localStorage.getItem("listItems") as string;
      dispatch(setItemData(JSON.parse(localItems) || []));
      setFilteredData(JSON.parse(localItems) || []);
    }
  }, []);

  return (
    <div className="flex items-center flex-col mt-2 ">
      <ToastContainer
        limit={2}
        autoClose={2000}
        closeOnClick={true}
        theme="dark"
        position="bottom-right"
      />
      <form className="flex items-center flex-col  py-2 px-4 rounded-md mb-2">
        <div className="">
          <label
            htmlFor="react select"
            className="text-2xl text-white/90 font-bold mb-0.5">
            Select a category:
          </label>
        </div>
        <ReactSelect
          name="react select"
          className="dark:text-slate-800 mb-2 md:mb-6 font-bold w-full px-2 text-xl"
          isSearchable={true}
          options={categoryOptions}
          value={selectedDropdown}
          onChange={handleDropDownChange}
        />
        {addCategory && (
          <div className="mx-2 mb-2 flex justify-center items-center">
            <input
              className="dark:bg-[#2B2B36] text-[#D5D7D7] bg-slate-800 border-solid w-[70%] sm:text-2xl xs:text-lg border-2 p-2 mb-2 rounded-md placeholder:text-center focus:border-sky-300 dark:border-slate-400"
              defaultValue={"Name your category"}
              name="category"
              autoComplete="on"
              value={category}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCategory(e.target.value);
              }}></input>
            <button
              className=" ml-4 rounded-lg hover:text-green-700 mb-2.5 hover:bg-slate-900 dark:hover:text-emerald-400"
              onClick={categoryAdd}>
              <FaPlusSquare className="" size={40} />
            </button>
          </div>
        )}
        <textarea
          className="dark:bg-[#2B2B36] text-[#D5D7D7] bg-slate-800 resize-none border-solid sm:text-2xl xs:text-lg border-2 p-2 rounded-lg w-max placeholder:text-center focus:border-sky-300 dark:border-slate-400"
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
            addCategory || inputData === "" || selectedDropdown.value === ""
              ? "border-0 cursor-not-allowed  dark:text-slate-800"
              : "border-slate-500 hover:border-slate-700 hover:bg-green-700  dark:bg-zinc-200 dark:text-black dark:hover:bg-emerald-400"
          } border-2 text-2xl bg-zinc-200 my-6 rounded-lg px-4 py-2 font-bold`}>
          Add Item
        </button>
      </form>
      {clickedCategory.value && (
        <h2 className="font-semibold text-slate-800  text-xl mb-2">
          Filtered to {clickedCategory.value}
        </h2>
      )}
      {createList}
    </div>
  );
};

export default AddToDo;
