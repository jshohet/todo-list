"use client";
import React, { MouseEventHandler } from "react";
//TODO - refactor to separate client components - button/input
const FirstTime = () => {
  const [show, setShow] = React.useState(true);
  const [formData, setFormData] = React.useState({ name: "" });
  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setShow(false);
    localStorage.setItem("name", formData.name);
    localStorage.setItem("firstTime", "false");
  }
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: [event.target.value],
      };
    });
  }
  React.useEffect(() => {
    if (localStorage.getItem("name") != null) {
      const localName = localStorage.getItem("name") as string;
      setFormData((prevData) => ({ ...prevData, name: localName }));
    }
    if (
      localStorage.getItem("firstTime") != null &&
      localStorage.getItem("name") != null
    ) {
      const localShow = localStorage.getItem("firstTime") as string;
      if (localShow === "false") {
        setShow(false);
      }
    }
  }, []);

  return (
    <div className="my-2 flex justify-center ">
      {show ? (
        <div className="text-center mt-10  py-2 px-4 rounded-md mb-2 w-fit">
          <h1 className="lg:text-4xl md:text-5xl xs:text-2xl sm:text-2xl font-semibold mb-3 text-slate-800  md:mx-1">
            Please enter your name:
          </h1>
          <form>
            <input
              type="text"
              className="border-solid dark:bg-[#2B2B36] text-[#D5D7D7] bg-slate-800 md:text-2xl xs:text-lg sm:text-xl border-2 p-2 rounded-lg focus:border-sky-300 dark:border-slate-400"
              placeholder="Name goes here"
              id="name"
              name="name"
              onChange={handleChange}
            />
            <br />
            <button
              onClick={handleSubmit}
              className="font-bold bg-zinc-200 border-2 text-2xl my-6 rounded-lg border-slate-500 hover:border-slate-700 hover:bg-green-700 px-4 py-2 dark:bg-zinc-200 dark:text-black dark:hover:bg-emerald-400">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="text-center mt-10">
          <h1 className=" lg:text-4xl md:text-4xl xs:text-2xl sm:text-2xl font-semibold mb-10 text-slate-800  md:mx-1">
            Hello,{" "}
            <span className="font-bold text-green-600 dark:text-purple-800">
              {formData.name}
            </span>
            ! This is your to-do list:
          </h1>
        </div>
      )}
    </div>
  );
};

export default FirstTime;
