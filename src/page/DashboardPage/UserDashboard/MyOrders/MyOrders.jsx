import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { UserAuth } from "../../../../hooks/userAuth/userAuth";
import useAxiosSecure from "../../../../hooks/axisonsecure/axiosSecure";
import Loader from "../../../../components/Loader/Loader";
import ErrorPage from "../../../ErrorPage/ErrorPage";
import PageTitle from "../../../../components/PageTitle/PageTitle";

const MyOrders = () => {
  const { user } = UserAuth();
  const axiosScure = useAxiosSecure();
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const totalPage = Math.ceil(count / perPage) || 0;
  const pageArray = [...Array(totalPage).keys()];
  const {
    data: myOrders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user order", currentPage, perPage],
    queryFn: async () => {
      try {
        const res = await axiosScure.get(
          `/user/orders?email=${user?.email}&page=${currentPage}&limit=${perPage}`
        );
        return res?.data?.result;
      } catch (err) {
        // Manually throw an error to react-query's `error`
        const errorMessage =
          err?.response?.data?.message || "Failed to fetch orders";
        throw new Error(errorMessage);
      }
    },
  });

  if (error) {
    return <ErrorPage message={error.message} />;
  }
  return (
    <div className="min-h-screen my-10">
      <PageTitle title={'My Orders'}/>
      <div>
        {myOrders?.length === 0 ? (
          <p>Your Order Not Found</p>
        ) : isLoading ? (
          <Loader></Loader>
        ) : (
          <div className="overflow-x-auto bg-base-100 p-2">
            <table className="table">
              <thead>
                <th>Images</th>
                <th>Medicine Name</th>
                <th>Total Price</th>
                <th>Order Status</th>
                <th> Order Date</th>
                <th>Company Name</th>
              </thead>
              <tbody>
                {myOrders?.map((order) => (
                  <tr>
                    <td>
                      <img
                        src={order.products[0].images}
                        alt="images products"
                        className="w-20"
                      />
                    </td>
                    <td> {order.products[0].name}</td>
                    <td> {order.totalAmount}</td>
                    <td>{order.orderStatus}</td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                    <td>{order.products[0].company}</td>
                  </tr>
                ))}
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
                  disabled={
                    pageArray?.length - 1 === currentPage ? true : false
                  }
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </button>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
