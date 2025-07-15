import { useQuery } from "@tanstack/react-query";
import React from "react";
import { UserAuth } from "../../../../hooks/userAuth/userAuth";
import useAxiosSecure from "../../../../hooks/axisonsecure/axiosSecure";
import Loader from "../../../../components/Loader/Loader";

const MyOrders = () => {
  const { user } = UserAuth();
  const axiosScure = useAxiosSecure();
  const {
    data: myOrders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user order"],
    queryFn: async () => {
      const res = await axiosScure(`/user/orders?email=${user?.email}`);
      return res?.data;
    },
  });
  return (
    <div className="min-h-screen my-10">
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
                {
                    myOrders?.map(order => <tr>
                        <td>
                           <img src= {order.products[0].images} alt="images products" className="w-20" />
                        </td>
                        <td> {order.products[0].name}</td>
                        <td> {order.totalAmount}</td>
                        <td>{order.orderStatus}</td>
                        <td>{new Date(order.createdAt).toLocaleString()}</td>
                        <td>{order.products[0].company}</td>
                    </tr>)
                }
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
