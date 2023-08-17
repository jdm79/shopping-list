import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Button from "./Button";
import Splash from "./Splash";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

export default function Todo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  let d = currentDate.getDay();
  const timeAgo = new TimeAgo("en-US");

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = weekday[d];

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

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
      let now = new Date();
      let time = now.toLocaleTimeString().replace(/(.*)\D\d+/, "$1");

      const newTask = {
        id: new Date().getTime().toString(),
        date: Date.now(),
        time: time,
        title: task,
      };
      setTasks([...tasks, newTask]);
      localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask]));
      setTask("");
    }
  };

  const handleKeyDown = (e) => {
    if (task) {
      let now = new Date();
      // let time = now.toLocaleTimeString().replace(/(.*)\D\d+/, "$1");

      const newTask = {
        id: new Date().getTime().toString(),
        date: Date.now(),
        time: now,

        title: task,
      };
      if (e.key === "Enter") {
        // 👇 Get input value
        setTasks([...tasks, newTask]);
        localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask]));
        setTask("");
      }
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
    closeModal();
  };

  // -- HERE'S WHERE THE JSX GOES --
  return (
    <div className='text-white h-screen w-screen bg-blue-400 flex flex-col justify-between '>
      <div className='text-center mb-10 text-md px-5 font-bold border-b md:mt-2 md:rounded-lg bg-black w-full md:w-fit mx-auto  p-1'>
        <div className='text-center font-bold text-yellow-300 bg-black w-full md:w-fit mx-auto lowercase'>
          {day}
        </div>
        {!tasks.length ? (
          <div>
            <h2 className='text-yellow-300'>
              tasks: <span className='text-white'>{tasks.length}</span>
            </h2>
            <h2 className='text-yellow-300'> choose 3 tasks</h2>
          </div>
        ) : tasks.length === 1 ? (
          <div>
            <h2 className='text-yellow-300'>
              tasks: <span className='text-white'>{tasks.length}</span>
            </h2>
            <h2 className='text-yellow-300'>
              {" "}
              nice. now think of two more things you can do
            </h2>
          </div>
        ) : tasks.length > 1 && tasks.length < 3 ? (
          <div>
            <h2 className='text-yellow-300'>
              tasks: <span className='text-white'>{tasks.length}</span>
            </h2>
            <h2 className='text-yellow-300'>add one more and we can go!</h2>
          </div>
        ) : tasks.length === 3 ? (
          <div>
            <h2 className='text-yellow-300'>
              tasks: <span className='text-white'>{tasks.length}</span>
            </h2>
            <h2 className='text-yellow-300'>that's your fill. go do it</h2>
          </div>
        ) : null}
      </div>

      <Splash />

      {/* -- TODO SECTION -- */}
      {tasks.map((task) => (
        <div key={task.id} className='flex flex-row '>
          <div className='basis-3/4 p-1'>
            <div className='text-white bg-black w-full border rounded-lg pb-3 pt-1 px-3 break-words h-full'>
              <h1 className='bg-white text-black p-3 rounded'>{task.title}</h1>

              <span className='text-xs'>
                {typeof task.date !== String ? (
                  <h3 className='mt-2'>
                    {timeAgo.format(task.date, "round-minute")}
                  </h3>
                ) : null}
              </span>
            </div>
          </div>
          <div className='basis-1/4 p-1'>
            <button
              className='bg-amber-400 text-black rounded-lg p-3 border w-full h-full'
              onClick={() => handleDelete(task)}
            >
              delete
            </button>
          </div>
        </div>
      ))}

      {/* -- TODO INPUT SECTION -- */}
      {tasks.length !== 3 ? (
        <div className='flex flex-row mb-6 p-2'>
          <div className='basis-3/4 p-1'>
            <input
              name='task'
              type='text'
              value={task}
              placeholder='Write your task here'
              className='form-control text-black w-full p-3 rounded-lg border-black border-2'
              onChange={(e) => setTask(e.target.value)}
              maxlength='100'
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className='basis-1/4 p-1'>
            <Button func={addTask} title='add' bgColor='green-500' mt='0' />
          </div>
        </div>
      ) : (
        <div className='flex flex-row mb-4 p-2'>
          <div className='basis w-full p-1'></div>
        </div>
      )}

      {/* -- CLEAR TODOS SECTION -- */}
      <div className='h-10 mb-10 mx-auto'>
        {tasks.length > 0 ? (
          <button
            onClick={openModal}
            className='bg-red-500 p-3 border rounded-lg border-white w-full mb-10'
          >
            clear all tasks
          </button>
        ) : (
          <div className='bg-blue-400 p-3  w-full mb-10'></div>
        )}

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          // style={customStyles}
          contentLabel='Example Modal'
        >
          {/* -- CONFIRMATION OF CLEARING OF TODOS SECTION -- */}
          <div className='text-white bg-blue-400 w-full h-full p-5'>
            <div>
              <h1 className='text-center text-yellow-300'>DANGER ZONE</h1>
              <h2 className='mt-10 w-full text-center'>
                are you sure you want to clear all your tasks?
              </h2>
            </div>
            <div>
              <button
                className='mt-10 mx-auto bg-red-500 p-3 border rounded-lg w-full h-full'
                onClick={() => handleClear()}
              >
                confirm
              </button>
            </div>
            <div>
              <button
                className='mt-10 mx-auto bg-green-500 p-3 border rounded-lg w-full h-full'
                onClick={closeModal}
              >
                cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
      <div className='bg-blue-400 text-white text-xs text-center w-full p-2 mt-2'>
        3Fings © {year} James Malvern
      </div>
    </div>
  );
}
