import React from "react";

const Button = ({ children, onClick, className, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`border-2 border-primary text-black b px-5 py-2 rounded-md hover:bg-primary hover:text-white cursor-pointer transition-all duration-300  ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
