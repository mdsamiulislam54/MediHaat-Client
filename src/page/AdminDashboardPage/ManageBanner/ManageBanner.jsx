import React from "react";
import useAxiosSecure from "../../../hooks/axisonsecure/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/Loader/Loader";
import Swal from "sweetalert2";

const ManageBanner = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: banner,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/banner");
      return res?.data;
    },
  });

  const handleBannerAdd = async (id) => {
    try {
      const res = await axiosSecure.patch(`/admin/banner/add/${id}`);
      if (res.data.modifiedCount===1) {
        Swal.fire({
          icon: "success",
          title: "Banner added Successfully!",
        });
        refetch()
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Banner added Unsuccessfully!",
      });
    }
  };
  const handleBannerRemove = async (id) => {
    try {
      const res = await axiosSecure.delete(`/admin/banner/remove/${id}`);
      if (res.data.deletedCount ===1) {
        Swal.fire({
          icon: "success",
          title: "Banner added Successfully!",
        });
        refetch()
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Banner added Unsuccessfully!",
      });
    }
  };

  return (
    <div>
      <div>
        {isLoading ? (
          <Loader />
        ) : banner?.length === 0 ? (
          <div>
            <p>Banner Not found </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table">
              <thead>
                <th>Images</th>
                <th>Medicine Name</th>
                <th>Description</th>
                <th>Seller Email</th>
                <th>Status</th>
                <th>Add</th>
                <th>Remove</th>
              </thead>
              <tbody>
                {banner?.map((ban) => (
                  <tr>
                    <td>
                      <img
                        src={ban.image}
                        alt={ban.title}
                        className="lg:w-20 w-14"
                      />
                    </td>
                    <td>{ban.medicineName}</td>
                    <td>{ban.description}</td>
                    <td>{ban.sellerEmail}</td>
                    <td className="text-primary">
                      {ban.isActive ? "active" : "pending"}
                    </td>
                    <td>
                      <button
                        onClick={() => handleBannerAdd(ban._id)}
                        className="btn btn-primary"
                      >
                        Add
                      </button>
                    </td>
                    <td>
                      <button onClick={()=>handleBannerRemove(ban._id)} className="btn btn-warning">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBanner;
