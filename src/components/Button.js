import React from "react";

function Button({ func, title, bgColor, textColor, mt }) {
  return (
    <button
      className={`mx-auto mt-${mt} p-3 bg-${bgColor} text-${textColor} border rounded-lg w-full h-full`}
      onClick={func}
    >
      {title}
    </button>
  );
}

export default Button;
