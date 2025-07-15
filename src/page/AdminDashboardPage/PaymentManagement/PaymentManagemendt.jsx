import React, { useState } from "react";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/axisonsecure/axiosSecure";
import useDashboardData from "../../../hooks/useDashboardData/useDashboardData";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/Loader/Loader";

const PaymentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(8);
  const totalPage = Math.ceil(count / perPage) || 0;
  const pageArray = [...Array(totalPage).keys()];

  const {
    data: orders,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["order",currentPage,perPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/paid/payment?page=${currentPage}&limit=${perPage}`);
      setCount(res?.data?.count);
      return res?.data?.result;
    },
  });

  console.log(orders);

  const handleAcceptPayment = async (orderId) => {
    try {
      const res = await axiosSecure.patch(
        `/admin/orders/payment-status/${orderId}`,
        {
          payStatus: "paid",
        }
      );

      if (res.data.result?.modifiedCount > 0) {
        Swal.fire("Success", "Payment status updated to 'Paid'", "success");
        refetch();
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update payment status", "error");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen relative my-10">
      <h2 className="text-2xl font-bold my-5">Payment Management</h2>

      {orders?.length === 0 ? (
        <div className="text-center">No payments found.</div>
      ) : (
        <div className="overflow-x-auto bg-base-100 p-2">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total Amount</th>
                <th>Total Quantity</th>
                <th>Payment Method</th>
                <th>Payment Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.customerName}</td>
                  <td>${order.totalAmount}</td>
                  <td>{order.totalQuantity}</td>
                  <td>
                    {" "}
                    {order.paymentMethod === "cod" && "Cash on Delivery"}
                    {order.paymentMethod === "stripe" && "Paid by Card"}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        order.payStatus === "paid"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {order.payStatus}
                    </span>
                  </td>
                  <td>
                    {order.payStatus === "pending" && (
                      <button
                        onClick={() => handleAcceptPayment(order._id)}
                        className="btn btn-sm btn-primary"
                      >
                        Accept Payment
                      </button>
                    )}
                    {order.payStatus === "paid" && (
                      <span className="text-green-500 font-semibold">
                        ✔ Paid
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* pagination */}
      <div className="flex justify-center items-center my-10 absolute -bottom-4 left-[50%] translate-x-[-50%]">
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

export default PaymentManagement;
