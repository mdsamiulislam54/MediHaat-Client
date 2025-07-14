import React from "react";
import useAxiosSecure from "../../../hooks/axisonsecure/axiosSecure";
import { useQuery } from "@tanstack/react-query";

const ManageCategory = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: category,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/category");
      return res.data;
    },
  });
  return (
    <div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Category Logo</th>
                <th>Name</th>
                <th>Total Medicine</th>
                <th>Update</th>
                <th>Delete</th>
                <th>Add Category</th>
              </tr>
            </thead>
            <tbody>
              {category.length === 0 ? (
                <></>
              ) : (
                category.map((cat) => (
                  <tr key={cat._id}>
                    <th>
                        <img src={cat.images} alt={cat.name} className="w-10 h-10" />
                    </th>
                    <td>{cat.name}</td>
                    <td>{cat.total}</td>
                    <td>
                        <button className="btn btn-sm btn-primary">Update</button>
                    </td>
                    <td>
                        <button className="btn btn-sm btn-warning">Delete</button>
                    </td>
                    <td>
                        <button className="btn btn-sm btn-primary">Update</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageCategory;
