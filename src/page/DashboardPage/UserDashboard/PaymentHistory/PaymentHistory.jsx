import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { UserAuth } from "../../../../hooks/userAuth/userAuth";
import ReactPaginate from "react-paginate";
import useAxiosSecure from "../../../../hooks/axisonsecure/axiosSecure";
import ErrorPage from "../../../ErrorPage/ErrorPage";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import Loader from "../../../../components/Loader/Loader";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UserAuth();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const { data, isLoading, error } = useQuery({
    queryKey: ["order-history", user?.email, currentPage],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(
          `/order/${user.email}?page=${currentPage + 1}&limit=${itemsPerPage}`
        );
        return res.data;
      } catch (err) {
        console.error("Order fetch error:", err?.response?.data || err.message);

        const message =
          err?.response?.data?.message ||
          "Failed to fetch orders. Please try again.";
        throw new Error(message);
      }
    },

    keepPreviousData: true,
  });



  if (isLoading) return <Loader/>;
  if (error)
    return <ErrorPage message={error.message}/>;

  const { orders = [], totalOrders = 0 } = data || {};
  const pageCount = Math.ceil(totalOrders / itemsPerPage);
  const pageArray = [...Array(pageCount).keys()];
  console.log(pageArray);

  return (
    <div className="custom-container py-10">
      <PageTitle title={'My Payment History'}/>;
      <h2 className="text-2xl font-semibold mb-6">My Payment History</h2>

      <div className="overflow-x-auto bg-base-100 p-2">
        <table className="table">
          <thead className="">
            <tr>
              <th>#</th>
              <th>Transaction ID</th>
              <th>Total Paid</th>
              <th>Status</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} className="border-t">
                <td className="">{currentPage * itemsPerPage + index + 1}</td>
                <td className="">{order.paymentIntentId}</td>
                <td className=" text-green-600 font-semibold">
                  ${order.totalAmount}
                </td>
                <td className=" capitalize text-primary">{order.payStatus}</td>
                <td className="">
                  <ul className="space-y-1">
                    {order.products.slice(0, 3).map((p) => (
                      <li key={p.id}>
                        {p.name}{" "}
                        <span className="text-sm text-gray-500">
                          ({p.category})
                        </span>
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
