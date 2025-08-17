import axios from "axios";
import React from "react";

const axiosinstance = () => {
  const instance = axios.create({
    baseURL: "http://localhost:5000/api/",
  });

  return instance;
};
export default axiosinstance;
