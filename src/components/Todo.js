import React, { useState, useEffect } from "react";

export default function Todo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("localTasks")) {
      const storedList = JSON.parse(localStorage.getItem("localTasks"));
      setTasks(storedList);
    }
  }, []);

  const addTask = (e) => {
    if (localStorage.getItem("localTasks")) {
      const storedList = JSON.parse(localStorage.getItem("localTasks"));
      console.log(storedList);
    }

    if (task) {
      const newTask = {
        id: new Date().getTime().toString(),
        title: task,
      };
      setTasks([...tasks, newTask]);
      localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask]));
      setTask("");
    }
  };

  const handleDelete = (task) => {
    const deleted = tasks.filter((t) => t.id !== task.id);
    setTasks(deleted);
    localStorage.setItem("localTasks", JSON.stringify(deleted));
  };

  const handleClear = () => {
    setTasks([]);
    localStorage.removeItem("localTasks");
  };

  return (
    <div className='text-white h-screen w-screen bg-blue-400 flex flex-col justify-between'>
      <h1 className='text-xl font-bold text-center text-white p-5 mt-3'>
        3Fings
      </h1>
      {tasks.length !== 3 ? (
        <div className='flex flex-row'>
          <div className='basis-3/4 p-3'>
            <input
              name='task'
              type='text'
              value={task}
              placeholder='Write your task'
              className='form-control text-black w-full p-3'
              onChange={(e) => setTask(e.target.value)}
              maxlength='100'
            />
          </div>
          <div className='basis-1/4 p-3'>
            <button
              className='bg-green-500 p-3 border b-black w-full'
              onClick={addTask}
            >
              add
            </button>
          </div>
        </div>
      ) : null}

      {tasks.map((task) => (
        <div key={task.id} className='flex flex-row'>
          <div className='basis-3/4 p-3'>
            <h1 className='text-black bg-white w-full p-3 break-all'>
              {task.title}
            </h1>
          </div>
          <div className='basis-1/4 p-3'>
            <button
              className='bg-red-500 p-3 border w-full h-full'
              onClick={() => handleDelete(task)}
            >
              delete
            </button>
          </div>
        </div>
      ))}
      <div></div>
      <div className='text-center mb-10 text-sm'>
        {!tasks.length
          ? null
          : tasks.length === 1
          ? "(You have 1 task)"
          : tasks.length > 1 && tasks.length < 3
          ? `(You have ${tasks.length} tasks)`
          : tasks.length === 3
          ? `(You have your maximum ${tasks.length} tasks for the day)`
          : null}
      </div>

      {!tasks.length ? null : (
        <div className='h-10 mb-3'>
          <button
            className='bg-red-500 p-3 border w-full'
            onClick={() => handleClear()}
          >
            Clear todos
          </button>
        </div>
      )}
    </div>
  );
}
