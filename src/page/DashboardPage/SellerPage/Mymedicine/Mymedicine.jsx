import React from "react";
import axiosinstance from "../../../../hooks/axiosInstance/axiosinstance";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../components/Loader/Loader";

const Mymedicine = () => {
  const axiosInstanceCall = axiosinstance();

  const { data, isLoading, error } = useQuery({
    queryKey: ["medicine"],
    queryFn: async () => {
      const res = await axiosInstanceCall.get("/all-medicine");
      console.log(res);
      return res.data.result;
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <div className="px-4">
        <h2>Total Medicines: {data.length}</h2>

        <div>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>GenericName</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((medicine) => {
                  return (
                    <tr>
                      <th>
                        <img src={medicine.imageURL} alt="" className="w-8 h-8 object-contain" />
                      </th>
                      <td>{medicine.name}</td>
                      <td>{medicine.genericName}</td>
                      <td>{medicine.category}</td>
                      <td>{medicine.price}</td>
                      <td>x</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mymedicine;
