import React, { useEffect, useRef, useState } from "react";
import { IoIosRadioButtonOff } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Todo = () => {
  const [todolist, setTodolist] = useState(
    localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []
  );

  const inputRef = useRef();

  const add = () => {
    const Inputext = inputRef.current.value.trim();

    if (Inputext === "") {
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: Inputext,
      isComplete: false,
    };
    setTodolist((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const handleDelete = (id) => {
    setTodolist((prevsTodo) => prevsTodo.filter((todo) => todo.id !== id));
  };

  const toggle = (id) => {
    setTodolist((prvsTodos) =>
      prvsTodos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todolist));
  }, [todolist]);

  return (
    <div className="bg-black flex justify-center min-h-screen">
      <div className="bg-white h-[430px] max-w-md w-11/12 rounded-[30px] place-self-center p-7">
        {/* ----------------Title---------- */}
        <h1 className="text-2xl font-semibold mt-3">To-Do-List</h1>

        {/* ----------------Input box------------ */}
        <div className="flex items-center rounded-full bg-gray-200 mt-5">
          <input
            type="text"
            ref={inputRef}
            className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-4 rounded-full placeholder:text-slate-600"
            placeholder="Input activity"
          />
          <button
            onClick={add}
            className="bg-blue-600 border-none rounded-full w-32 h-14 text-lg text-white font-medium cursor-pointer"
          >
            ADD +
          </button>
        </div>

        {/* ----------------To-Do List------------ */}
        <div className="mt-5 space-y-3 h-60 overflow-y-auto pr-2">
          {todolist.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div onClick={() => toggle(item.id)} className="flex items-center cursor-pointer">
                {item.isComplete ? (
                  <FaCheckCircle className="h-7 w-7 text-orange-600" />
                ) : (
                  <IoIosRadioButtonOff className="h-7 w-7 text-gray-500" />
                )}
                <p className={`text-lg ml-3 ${item.isComplete ? "line-through" : ""}`}>
                  {item.text}
                </p>
              </div>
              <MdDelete
                onClick={() => handleDelete(item.id)}
                className="h-6 w-6 text-red-600 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
