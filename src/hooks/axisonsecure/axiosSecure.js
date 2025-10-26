import axios from "axios";
// https://medihaat-server.vercel.app/api/
// `https://medihaat-server.vercel.app/api/
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
