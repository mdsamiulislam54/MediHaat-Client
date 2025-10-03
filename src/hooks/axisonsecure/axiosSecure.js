import axios from "axios";
// http://localhost:5000/api/
// `http://localhost:5000/api/
import { UserAuth } from "../userAuth/userAuth";

const useAxiosSecure = () => {
  const { user } = UserAuth();
  const instance = axios.create({
    baseURL: `https://medihaat-server.vercel.app/api/`,
  });

  instance.interceptors.request.use(
    (config) => {
      if (user) {
        config.headers.Authorization = `Bearer ${user?.accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return instance;
};

export default useAxiosSecure;
