'use client'
import React from "react";

const FirstTime = () => {
  const [show, setShow] = React.useState(true)
  const [formData, setFormData] = React.useState({name: ""})
  function handleSubmit(e: any){
    e.preventDefault()
    setShow(false) 
    localStorage.setItem("name", formData.name) 
    localStorage.setItem("firstTime", "false")   
  }  
  function handleChange(event: any) {
    setFormData(prevData =>{
      return{
        ...prevData,
        [event.target.name]: [event.target.value]
      }
    })
  }
  React.useEffect(()=>{
    if (localStorage.getItem("name") != null) {
      const localName = localStorage.getItem("name") || "";
      setFormData(prevData=> ({...prevData, name: localName}));
    }
    if (localStorage.getItem("firstTime") != null) {
      const localShow = localStorage.getItem("firstTime") || "";
      if (localShow === "false") {
        setShow(false);
      }
    }
  },[])

  return (
    <div>
      {show ? (
        <div className="text-center mt-10">
          <h1 className="text-7xl font-semibold mb-10 text-slate-700 dark:text-zinc-200">
            Please enter your name:
          </h1>
          <form>
            <input
              type="text"
              className="border-solid text-2xl border-2 p-2 rounded-lg focus:border-sky-300 dark:border-slate-400"
              placeholder="Name goes here"
              id="name"
              name="name"
              onChange={handleChange}
            />
            <br />
            <button
              onClick={handleSubmit}
              className="border-2 text-2xl mt-6 rounded-lg hover:border-slate-700 hover:bg-slate-500 px-4 py-2 dark:bg-zinc-200 dark:text-slate-500 dark:hover:text-black dark:hover:bg-sky-300">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="text-center mt-10">
          <h1 className="text-7xl font-semibold mb-10 text-slate-700 dark:text-zinc-200">
            Hello, {formData.name}! This is your to-do list:
          </h1>
        </div>
      )}
    </div>
  );
};

export default FirstTime;
