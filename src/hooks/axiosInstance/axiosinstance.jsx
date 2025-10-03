import axios from "axios";
import React from "react";

const axiosinstance = () => {
  const instance = axios.create({
    baseURL: "https://medihaat-server.vercel.app/api/",
  });

  return instance;
};
export default axiosinstance;
