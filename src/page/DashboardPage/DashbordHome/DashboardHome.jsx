import { FaMoneyBill } from "react-icons/fa";
import useDashboardData from "../../../hooks/useDashboardData/useDashboardData";
import { UserAuth } from "../../../hooks/userAuth/userAuth";
import {
  IoPersonCircle,
  IoCheckmarkCircle,
  IoCalendarClear,
} from "react-icons/io5";
import useAxiosSecure from "../../../hooks/axisonsecure/axiosSecure";
import { useQuery } from "@tanstack/react-query";

const DashboardHome = () => {
  const { user, role } = UserAuth();

  const {
 
    sellerMedicineQuery,
    sellerPaidOrder,
    adminDashboardTotalPaid,
  } = useDashboardData();
  const axiosScure = useAxiosSecure();
  const { data: myOrders } = useQuery({
    queryKey: ["user order"],
    queryFn: async () => {
      const res = await axiosScure(`/user/orders?email=${user?.email}`);
      return res?.data;
    },
  });



  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-primary to-blue-500 text-white p-6 rounded-xl shadow flex flex-col md:flex-row items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Welcome, {user?.displayName || "User"}!
          </h2>
          <p className="text-sm mt-1">
            Glad to see you back on your dashboard.
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <IoPersonCircle className="text-4xl" />
          <div>
            <h3 className="font-semibold">{user?.email}</h3>
            <p className="text-xs mt-2">
              Role:
              <span className="bg-white text-primary font-semibold px-2 py-1 rounded ml-1">
                {role?.join(", ") || "user"}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {role?.includes("user") && (
          <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
            <div>
              <h4 className="text-lg font-semibold">Total Order</h4>
              <p className="text-lg text-gray-800 font-bold ">
                {myOrders?.length}
              </p>
            </div>
          </div>
        )}
        {role?.includes("admin") && (
          <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
            <FaMoneyBill className="text-4xl text-green-500" />
            <div>
              <h4 className="text-lg font-semibold">Total Sale</h4>
              <p className="text-lg text-gray-800 font-bold ">
                ${adminDashboardTotalPaid?.data?.totalPaidAmount || 0}
              </p>
            </div>
          </div>
        )}
        <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
          <IoCheckmarkCircle className="text-4xl text-green-500" />
          <div>
            <h4 className="text-lg font-semibold">Active Account</h4>
            <p className="text-sm text-gray-500">
              Your account is in good standing.
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
          <IoCalendarClear className="text-4xl text-blue-500" />
          <div>
            <h4 className="text-lg font-semibold">Last Login</h4>
            <p className="text-sm text-gray-500">
              {user?.metadata?.lastSignInTime}
            </p>
          </div>
        </div>

        {role?.includes("seller") && (
          <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
            <IoPersonCircle className="text-4xl text-yellow-500" />
            <div>
              <h4 className="text-lg font-semibold">Your Total Medicine</h4>
              <p className="text-sm text-gray-500">
                {sellerMedicineQuery.data?.length || 0}
              </p>
            </div>
          </div>
        )}
        {role?.includes("seller") && (
          <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
            <div className="flex items-center gap-5">
              <div className="flex gap-3">
                <IoPersonCircle className="text-4xl text-yellow-500" />
                <div>
                  <h4 className="text-lg font-semibold">Total Paid </h4>
                  <p className="text-sm text-gray-500">
                    {sellerPaidOrder?.data?.paidOrders || 0}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <IoPersonCircle className="text-4xl text-yellow-500" />
                <div>
                  <h4 className="text-lg font-semibold">Pending Order</h4>
                  <p className="text-sm text-gray-500">
                    {sellerPaidOrder?.data?.pendingOrders || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {role?.includes("seller") && (
          <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
            <IoPersonCircle className="text-4xl text-yellow-500" />
            <div>
              <h4 className="text-lg font-semibold">Total Earn</h4>
              <p className="text-sm text-gray-800 font-bold">
                ${
                 ( sellerPaidOrder?.data?.paid?.reduce((acc, order)=> acc + order.totalAmount,0))
                }
              </p>
            </div>
          </div>
        )}
        {/* admin */}
        {role?.includes("admin") && (
          <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
            <div className="flex items-center gap-5">
              <div className="flex gap-3">
                <IoPersonCircle className="text-4xl text-yellow-500" />
                <div>
                  <h4 className="text-lg font-semibold"> Total Paid</h4>
                  <p className="text-sm text-gray-600 font-bold">
                    {adminDashboardTotalPaid?.data?.paidOrders || 0}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <IoPersonCircle className="text-4xl text-yellow-500" />
                <div>
                  <h4 className="text-lg font-semibold"> Total Pending</h4>
                  <p className="text-sm text-gray-600 font-bold">
                    {adminDashboardTotalPaid?.data?.pendingOrders || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
