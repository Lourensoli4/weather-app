import React from "react";

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => (
  <input
    {...props}
    className={`px-3 w-full py-2 border-gray-200 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8DD8FF] shadow-2xl ${
      props.className || ""
    }`}
  />
);

export default Input;
