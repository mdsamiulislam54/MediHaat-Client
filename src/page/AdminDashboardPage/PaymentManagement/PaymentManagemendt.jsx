import React from "react";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/axisonsecure/axiosSecure";
import useDashboardData from "../../../hooks/useDashboardData/useDashboardData";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/Loader/Loader";

const PaymentManagement = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: orders,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-paid-orders");
      return res.data?.allOrders;
    },
  });

  console.log(orders);

  const handleAcceptPayment = async (orderId) => {
    try {
      const res = await axiosSecure.patch(`/admin/orders/payment-status/${orderId}`, {
        payStatus: "paid",
      });

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
    <div>
      <h2 className="text-2xl font-bold my-5">Payment Management</h2>

      {orders?.length === 0 ? (
        <div className="text-center">No payments found.</div>
      ) : (
        <div className="overflow-x-auto">
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
    </div>
  );
};

export default PaymentManagement;
