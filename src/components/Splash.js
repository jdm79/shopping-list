import React from "react";

function Splash() {
  return (
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
  );
}

export default Splash;
