import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/axisonsecure/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/Loader/Loader";
import ErrorPage from "../../ErrorPage/ErrorPage";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(8);
  const totalPage = Math.ceil(count / perPage) || 0;
  const pageArray = [...Array(totalPage).keys()];

  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users", search, roleFilter, currentPage, perPage],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(
          `/admin/users?role=${roleFilter}&search=${search}&page=${currentPage}&limit=${perPage}`
        );
        console.log(res.data)
        setCount(res?.data?.count);
        return res.data?.result;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Error fetching users"
        );
      }
    },
  });

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await axiosSecure.put("/admin/update-role", {
        userId,
        newRole,
      });
      refetch();
      Swal.fire({
        icon: "success",
        title: "Role Updated",
        text: res.data.message,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message,
      });
    }
  };

  if (error) return <ErrorPage message={error.message} />;

  return (
    <div className="w-11/12 mx-auto pt-20">
      {/* Search & Sort UI */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or ID"
          className="input input-bordered w-full md:w-1/3"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Sort by role */}
        <select
          className="select select-bordered w-full md:w-1/4"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="seller">Seller</option>
          <option value="user">User</option>
        </select>
      </div>

      {/* Table */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto">
          <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Name</th>
                <th>Role</th>
                <th>Make Admin</th>
                <th>Make Seller</th>
                <th>Make User</th>
              </tr>
            </thead>
            <tbody>
              {users?.map(({ _id, name, photoURL, role }) => (
                <tr key={_id}>
                  <td>
                    <img
                      src={photoURL}
                      alt="profile"
                      className="w-10 h-10 rounded-full border"
                    />
                  </td>
                  <td>{name}</td>
                  <td>{role}</td>
                  <td>
                    {role !== "admin" && (
                      <button
                        onClick={() => handleRoleChange(_id, "admin")}
                        className="btn btn-sm btn-primary"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                  <td>
                    {role !== "seller" && (
                      <button
                        onClick={() => handleRoleChange(_id, "seller")}
                        className="btn btn-sm btn-warning"
                      >
                        Make Seller
                      </button>
                    )}
                  </td>
                  <td>
                    {role !== "user" && (
                      <button
                        onClick={() => handleRoleChange(_id, "user")}
                        className="btn btn-sm btn-accent text-white"
                      >
                        Downgrade
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* pagination */}
      <div className="flex justify-center items-center my-10">
        <button
          className="btn mx-4"
          disabled={currentPage === 0}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <ul className="flex gap-4">
          {pageArray?.map((page) => {
            return (
              <li
                key={page}
                className={`btn bg-gray-200 ${
                  currentPage === page ? "bg-primary text-white" : ""
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page + 1}
              </li>
            );
          })}
          <button
            className="btn mx-4"
            disabled={pageArray?.length - 1 === currentPage ? true : false}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </ul>
      </div>
    </div>
  );
};

export default ManageUsers;
