import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../../../hooks/axisonsecure/axiosSecure";
import { UserAuth } from "../../../../hooks/userAuth/userAuth";
import Loader from "../../../../components/Loader/Loader";

const SellerPaymentHistory = () => {
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(6);
  const totalPage = Math.ceil(count / perPage) || 0;
  const pageArray = [...Array(totalPage).keys()];

  const axiosSecure = useAxiosSecure();
  const { user } = UserAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["sellerPaymentHistory", user?.email,currentPage,perPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/seller-payment-history?sellerEmail=${user?.email}&page=${currentPage}&limit=${perPage}`
      );
      setCount(res?.data?.count);
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
    <div className="w-11/12 mx-auto my-10 min-h-screen">
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
                    <img
                      src={item.product.images}
                      alt="products images"
                      className="md:w-[60px] w-[40px]"
                    />
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

export default SellerPaymentHistory;
