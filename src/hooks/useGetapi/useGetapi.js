import axiosinstance from "../axiosInstance/axiosinstance";
import { useQuery } from "@tanstack/react-query";

const useGetapi = (url) => {
  const axiosInstanceCall = axiosinstance();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["getData", url], 
    queryFn: async () => {
      const res = await axiosInstanceCall.get(url);
      return res.data;
    },
  });

  return { data, isLoading, isError, error, refetch };
};

export default useGetapi;
