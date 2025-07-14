import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/axisonsecure/axiosSecure";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get("/admin/users");
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      console.log(userId, newRole);
      const response = await axiosSecure.put("/admin/update-role", {
        userId,
        newRole,
      });

      Swal.fire({
        icon: "success",
        title: "Role Updated",
        text: response.data.message,
      });

      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
      });
    }
  };

  return (
    <div className="w-11/12 mx-auto pt-20">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table ">
            {/* head */}
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
              {users.map(({ _id, photoURL, name, role }) => (
                <tr key={_id}>
                  <td>
                    <img
                      src={photoURL}
                      alt="user profile"
                      className="w-10 h-10 rounded-full border"
                    />
                  </td>
                  <td>{name}</td>
                  <td>{role}</td>
                  <td className="flex flex-wrap items-center gap-2">
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
                        className="btn sm btn-warning"
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
    </div>
  );
};

export default ManageUsers;
