import React, { useState, useEffect } from "react";
import Modal from "react-modal";

export default function Todo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

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
      const newTask = {
        id: new Date().getTime().toString(),
        title: task,
      };
      setTasks([...tasks, newTask]);
      localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask]));
      setTask("");
    }
  };

  const handleKeyDown = (e) => {
    if (task) {
      const newTask = {
        id: new Date().getTime().toString(),
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

  return (
    <div className='text-white h-screen w-screen bg-blue-400 flex flex-col justify-between'>
      <div className='content flex py-2 m-auto gap-2'>
        <img
          src={"/images/3Fings.png"}
          alt='3F logo'
          className='w-15 h-15 m-auto'
        />

        <h1 className='text-md font-bold text-center m-auto text-white'>
          git.shit.done
        </h1>
      </div>

      {/* <div className='text-center mb-5 mt-1 text-sm px-5'>
        {!tasks.length
          ? null
          : tasks.length === 1
          ? "You have 1 task - gently does it"
          : tasks.length > 1 && tasks.length < 3
          ? `You have ${tasks.length} tasks - that's already a big responsibility`
          : tasks.length === 3
          ? `You have your maximum ${tasks.length} tasks for the day - now go
          git shit done`
          : null}
      </div> */}

      {tasks.map((task) => (
        <div key={task.id} className='flex flex-row p-2'>
          <div className='basis-3/4 p-1'>
            <h1 className='text-white bg-black w-full border rounded-lg p-3 break-words h-full'>
              {task.title}
            </h1>
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
            <button
              className='bg-green-500 p-3 border rounded-lg b-black w-full'
              onClick={addTask}
            >
              add
            </button>
          </div>
        </div>
      ) : (
        <div className='flex flex-row mb-4 p-2'>
          <div className='basis w-full p-1'></div>
        </div>
      )}

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
          <div className='text-white bg-blue-400 w-full h-full p-5'>
            <div>
              <h1 className='text-center text-yellow-300'>DANGER ZONE</h1>
              <h2
                // ref={(_subtitle) => (subtitle = _subtitle)}
                className='mt-10  w-full text-center'
              >
                Are you sure you want to clear all your todos?
              </h2>
            </div>
            <div>
              {" "}
              <button
                className='mt-10 mx-auto bg-red-500 p-3 border rounded-lg w-full h-full'
                onClick={() => handleClear()}
              >
                confirm
              </button>
            </div>
            <div>
              {" "}
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
    </div>
  );
}
