import { useQuery } from "@tanstack/react-query";


import { UserAuth } from "../userAuth/userAuth";

import useAxiosSecure from "../axisonsecure/axiosSecure";

const useDashboardData = () => {
  const { user, role } = UserAuth();
 const axiosSecure = useAxiosSecure()

  const fetchSellerMedicines = async () => {
    const res = await axiosSecure.get(`seller-medicine/${user?.email}`);
    return res.data.result;
  };

  const fetchSellerBanners = async () => {
    const res = await axiosSecure.get(`seller-added-banner/${user?.email}`);
    return res.data.result;
  };
  const sellerPaidOrderFn = async () => {
    const res = await axiosSecure.get(
      `/seller-payment-history?sellerEmail=${user?.email}`
    );

    const allProducts = res?.data?.result?.flat();
    const pendingOrders = allProducts?.filter(
      (item) => item?.orderStatus === "pending"
    );

    const paidOrders = allProducts.filter((item) => item?.payStatus === "paid");

    const sellerData = {
      totalOrders: allProducts?.length || 0,
      pendingOrders: pendingOrders?.length ||0,
      paidOrders: paidOrders?.length ||0,
      allOrders: allProducts || []
    };
    return sellerData;
  };

  // admin
const fetchAdminTotalPaidOrders = async () => {
  const res = await axiosSecure.get(`/admin-paid-orders`);
  const paidOrders = res.data.paidOrders || 0
  const pendingOrders = res.data.pendingOrders || 0
  const totalPaidAmount = res.data?.totalPaidAmount || 0
  const allOrders = res?.data?.allOrders || []

  return {
    allOrders:allOrders,
    paid:paidOrders,
    pending:pendingOrders,
    paidOrders: paidOrders.length || 0,
    pendingOrders: pendingOrders.length || 0,
    totalPaidAmount
  };
};


  const fetchAdminStats = async () => {
    const res = await axiosSecure.get(`/admin/users`);
    return res.data.result;
  };


  const sellerMedicineQuery = useQuery({
    queryKey: ["sellerMedicines", user?.email],
    queryFn: fetchSellerMedicines,
    enabled: role?.includes("seller"),
  });

  const sellerBannerQuery = useQuery({
    queryKey: ["sellerBanners", user?.email],
    queryFn: fetchSellerBanners,
    enabled: role?.includes("seller"),
  });

  const sellerPaidOrder = useQuery({
    queryKey: ["sellerPaidOrder", user?.email],
    queryFn: sellerPaidOrderFn,
    enabled: role?.includes("seller"),
  });

  const adminDashboardQuery = useQuery({
    queryKey: ["adminDashboard"],
    queryFn: fetchAdminStats,
    enabled: role?.includes("admin"),
  });

  const adminDashboardTotalPaid = useQuery({
    queryKey: ["adminDashboardTotalPaid"],
    queryFn: fetchAdminTotalPaidOrders,
    enabled: role?.includes("admin"),
  });

  return {
    sellerMedicineQuery,
    sellerBannerQuery,
    adminDashboardQuery,
    sellerPaidOrder,
    adminDashboardTotalPaid,
    role,
    user,
  };
};

export default useDashboardData;
