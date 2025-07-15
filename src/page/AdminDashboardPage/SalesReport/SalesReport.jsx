import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/axisonsecure/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/Loader/Loader";

const SalesReport = () => {
  const axiosSecure = useAxiosSecure();
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(4);
  const totalPage = Math.ceil(count / perPage) || 0;
  const pageArray = [...Array(totalPage).keys()];
  console.log(pageArray);
  const {
    data: orders,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["order", currentPage,perPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/sales/report?page=${currentPage}&limit=${perPage}`);
      console.log(res)
      setCount(res?.data?.count);
      return res.data?.result;
    },
  });

  if (isLoading) return <Loader />;
  console.log(orders);
  return (
    <div className="px-4 ">
      <div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Images</th>
                <th>Medicine Name</th>
                <th>Seller Email</th>
                <th>Buyer Email</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orders?.length === 0 ? (
                <div></div>
              ) : (
                orders?.map((order) => (
                  <tr>
                    <th>
                      <img
                        src={order.products[0].images}
                        alt="order images"
                        className="lg:w-14 w-10"
                      />
                    </th>
                    <td>{order.products[0].name}</td>
                    <td>{order.products[0].sellerEmail}</td>
                    <td>{order.email}</td>
                    <td>${order.totalAmount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
    </div>
  );
};

export default SalesReport;
