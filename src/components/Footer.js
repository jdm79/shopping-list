import React from "react";

export default function Footer() {
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  return (
    <div className='bg-blue-400 text-white text-xs text-center w-full p-2'>
      3Fings © {year} James Malvern
    </div>
  );
}
