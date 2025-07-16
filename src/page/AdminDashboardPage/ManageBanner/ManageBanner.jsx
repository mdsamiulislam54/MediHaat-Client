import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/axisonsecure/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/Loader/Loader";
import Swal from "sweetalert2";
import ErrorPage from "../../ErrorPage/ErrorPage";

const ManageBanner = () => {
  const axiosSecure = useAxiosSecure();
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(8);
  const totalPage = Math.ceil(count / perPage) || 0;
  const pageArray = [...Array(totalPage).keys()];
  const {
    data: banner,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["banner",currentPage,perPage],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/admin/banner?page=${currentPage}&limit=${perPage}`);
        setCount(res?.data?.count)
        return res?.data.banner;
      } catch (error) {
        throw new Error(
          error?.response?.data?.message || "Error fetching categories"
        );
      }
    },
  });

  const handleBannerAdd = async (id) => {
    try {
      const res = await axiosSecure.patch(`/admin/banner/add/${id}`);
      if (res.data.modifiedCount === 1) {
        Swal.fire({
          icon: "success",
          title: "Banner added Successfully!",
        });
        refetch();
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
      if (res.data.deletedCount === 1) {
        Swal.fire({
          icon: "success",
          title: "Banner added Successfully!",
        });
        refetch();
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Banner added Unsuccessfully!",
      });
    }
  };

  if (error) return <ErrorPage message={error.message} />;

  return (
    <div className="min-h-screen mt-10">
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
                      <button
                        onClick={() => handleBannerRemove(ban._id)}
                        className="btn btn-warning"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

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

export default ManageBanner;
