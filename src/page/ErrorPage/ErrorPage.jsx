import React from "react";
import { useNavigate } from "react-router";
import { BiErrorCircle } from "react-icons/bi";

const ErrorPage = ({ message = "Something went wrong!" }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4 text-center">
      <BiErrorCircle className="text-red-500 text-6xl mb-4" />
      <h1 className="text-3xl font-semibold text-gray-800 mb-2">Oops!</h1>
      <p className="text-gray-600 mb-4">{message}</p>
      <button
        onClick={handleGoBack}
        className="px-6 py-2 hover:bg-primary border  hover:text-white rounded-md  cursor-pointer transition duration-300"
      >
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
