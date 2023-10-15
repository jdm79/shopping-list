import React from "react";

export default function Footer() {
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  return (
    <div className='bg-black text-white text-xs text-center w-full p-2 mt-16'>
      git grocery things © {year} James Malvern
    </div>
  );
}
