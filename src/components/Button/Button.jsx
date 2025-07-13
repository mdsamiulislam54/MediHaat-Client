import React from "react";
import Loader from "../Loader/Loader";

const Button = ({ children, onClick, className, type = "button", loader ,isDisable=false}) => {
  return (
    <button
      type={type}
      disable={isDisable}
      onClick={onClick}
      className={`border-2 border-primary text-black b px-5 py-2 rounded-md hover:bg-primary hover:text-white cursor-pointer transition-all duration-300  ${className}`}
    >
      {
        children && (children)
      }
      {
        loader && <Loader/>
      }
    </button>
  );
};

export default Button;
