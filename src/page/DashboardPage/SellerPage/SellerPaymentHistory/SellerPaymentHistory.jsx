import React from "react";
import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../../../hooks/axisonsecure/axiosSecure";
import { UserAuth } from "../../../../hooks/userAuth/userAuth";
import Loader from "../../../../components/Loader/Loader";

const SellerPaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UserAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["sellerPaymentHistory", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/seller-payment-history?sellerEmail=${user?.email}`
      );
      return res.data.result;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  if (error) return <p className="text-center text-red-500">{error.message}</p>;

  return (
    <div className="w-11/12 mx-auto my-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Payment History</h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-center  ">
                <th>Images</th>
              <th>Medicine Name</th>
              <th>Customer Name</th>
              <th>Customer Email</th>
              <th>totalQuantity</th>
              <th>Order Date</th>
              <th>Price</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-red-500">
                  No payment history found.
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index} className="text-center">
                    <td>
                        <img src={item.product.images} alt="products images" className="md:w-[60px] w-[40px]"/>
                    </td>
                  <td>{item.product.name}</td>
                  <td>{item.customerName}</td>
                  <td>{item.email}</td>
                  <td>{item.totalQuantity}</td>
                  <td>{new Date(item.orderDate).toLocaleDateString()}</td>
                  <td>${item.totalAmount}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.payStatus === "paid"
                          ? "badge-primary"
                          : "badge-warning"
                      }`}
                    >
                      {item.payStatus}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerPaymentHistory;
