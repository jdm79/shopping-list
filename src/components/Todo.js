import React, { useState, useEffect } from "react";

export default function Todo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [id, setId] = useState(1);
  let num = 1;

  useEffect(() => {
    if (localStorage.getItem("localTasks")) {
      const storedList = JSON.parse(localStorage.getItem("localTasks"));
      setTasks(storedList);
      console.log(storedList.length);
    }
  }, []);

  const addTask = (e) => {
    if (localStorage.getItem("localTasks")) {
      const storedList = JSON.parse(localStorage.getItem("localTasks"));
      num = num + storedList.length;
    }

    if (task) {
      const newTask = {
        id: new Date().getTime().toString(),
        title: task,
        num,
      };
      setTasks([...tasks, newTask]);
      localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask]));
      // setId(id + 1);
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
    setId(1);
    num = "";
    localStorage.removeItem("localTasks");
  };

  return (
    <div className=' text-white h-fit'>
      <h1 className='text-3xl font-bold text-center text-white mt-3'>
        Three Things
      </h1>
      <div className='flex columns-2 w-full p-3 gap-3'>
        <div className='row w-5/6 m-auto'>
          <input
            name='task'
            type='text'
            value={task}
            placeholder='Write your task'
            className='form-control'
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <div className='row w-1/6 m-auto'>
          <button className='bg-green-500 p-2 rounded-md' onClick={addTask}>
            add
          </button>
        </div>
      </div>

      <div className='text-center'>
        {!tasks.length
          ? `(You have no tasks)`
          : tasks.length === 1
          ? "(You have 1 task)"
          : tasks.length > 1
          ? `(You have ${tasks.length} tasks)`
          : null}
      </div>
      {tasks.map((task) => (
        <React.Fragment key={task.id}>
          <div className='flex columns-2 w-full p-3 gap-3'>
            <div className='row w-5/6 m-auto'>
              <span className='text-white'>
                {task.num}: {task.title}
              </span>
            </div>
            <div className='row w-1/6 m-auto'>
              <button
                className='bg-red-500 p-2 rounded-md'
                onClick={() => handleDelete(task)}
              >
                delete
              </button>
            </div>
          </div>
        </React.Fragment>
      ))}
      <div></div>

      {!tasks.length ? null : (
        <div className='flex columns-1 mb-3'>
          <div className='row m-auto'>
            <button
              className='bg-red-500 p-2 rounded-md'
              onClick={() => handleClear()}
            >
              Clear todos
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
