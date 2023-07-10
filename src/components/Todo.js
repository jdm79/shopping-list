import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Button from "./Button";
import Splash from "./Splash";

export default function Todo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  const [modalIsOpen, setIsOpen] = React.useState(false);

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
      const newTask = {
        id: new Date().getTime().toString(),
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
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
      const newTask = {
        id: new Date().getTime().toString(),
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
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
    <div className='text-white h-screen w-screen bg-blue-400 flex flex-col justify-between'>
      <Splash />

      {/* -- TODO SECTION -- */}
      {tasks.map((task) => (
        <div key={task.id} className='flex flex-row p-2'>
          <div className='basis-3/4 p-1'>
            <div className='text-white bg-black w-full border rounded-lg pb-3 pt-1 px-3 break-words h-full'>
              <h1 className='bg-white text-black p-3 rounded'>{task.title}</h1>

              <span className='text-xs'>
                set at: {task.time} {task.date}
              </span>
            </div>
          </div>
          <div className='basis-1/4 p-1'>
            <Button
              func={() => handleDelete(task)}
              title='delete'
              bgColor='amber-400'
              textColor='black'
              mt='0'
            />
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
              placeholder='Write your task'
              className='form-control text-black w-full p-3 rounded-lg border-black border-1'
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

      {/* -- LITTLE MESSAGES FROM ME SECTION -- */}
      <div className='text-center mb-10 mt-1 text-md px-5'>
        {!tasks.length
          ? "You can add up to three tasks - anything more than that is just cray cray"
          : tasks.length === 1
          ? "You have added 1 task to the list - just add two more and we can get out of here"
          : tasks.length > 1 && tasks.length < 3
          ? `Nice. You have ${tasks.length} tasks - that's already a big responsibility though, btw`
          : tasks.length === 3
          ? `Great news! You now have your maximum ${tasks.length} tasks for the day - go
          git shit done`
          : null}
      </div>

      {/* -- CLEAR TODOS SECTION -- */}
      <div className='h-10 mb-20 mx-3'>
        <button
          onClick={openModal}
          className='bg-red-500 p-3 border rounded-lg border-white w-full mb-10'
        >
          clear todos
        </button>
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
                Are you sure you want to clear all your todos?
              </h2>
            </div>
            <div>
              <Button
                func={handleClear}
                title='confirm'
                bgColor='red-500'
                mt='10'
              />
            </div>
            <div>
              <Button
                func={closeModal}
                title='cancel'
                bgColor='green-500'
                mt='10'
              />
            </div>
          </div>
        </Modal>
      </div>
      <div className='bg-blue-400 text-white text-xs text-center w-full p-2 mt-16'>
        3Fings © {year} James Malvern
      </div>
    </div>
  );
}
