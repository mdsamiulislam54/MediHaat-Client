import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { UserAuth } from "../../../../hooks/userAuth/userAuth";
import ReactPaginate from "react-paginate";
import useAxiosSecure from "../../../../hooks/axisonsecure/axiosSecure";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UserAuth();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["order-history", user?.email, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/order/${user.email}?page=${currentPage + 1}&limit=${itemsPerPage}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load data</p>;

  const { orders = [], totalOrders = 0 } = data || {};
  const pageCount = Math.ceil(totalOrders / itemsPerPage);
  const pageArray = [...Array(pageCount).keys()];
  console.log(pageArray)

  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-2xl font-semibold mb-6">My Payment History</h2>

      <div className="overflow-x-auto bg-base-100 p-2">
        <table className="table">
          <thead className="">
            <tr>
              <th >#</th>
              <th >Transaction ID</th>
              <th >Total Paid</th>
              <th >Status</th>
              <th >Products</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} className="border-t">
                <td className="">{currentPage * itemsPerPage + index + 1}</td>
                <td className="">{order.paymentIntentId}</td>
                <td className=" text-green-600 font-semibold">${order.totalAmount}</td>
                <td className=" capitalize text-primary">{order.payStatus}</td>
                <td className="">
                  <ul className="space-y-1">
                    {order.products.slice(0, 3).map((p) => (
                      <li key={p.id}>
                        {p.name}{" "}
                        <span className="text-sm text-gray-500">({p.category})</span>
                      </li>
                    ))}
                    {order.products.length > 3 && (
                      <li className="text-sm text-gray-400">
                        + {order.products.length - 3} more
                      </li>
                    )}
                  </ul>
                </td>
              </tr>
            ))}
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
  );
};

export default PaymentHistory;
