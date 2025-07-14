import { useQuery } from "@tanstack/react-query";

import axiosinstance from "../axiosInstance/axiosinstance";
import { UserAuth } from "../userAuth/userAuth";

const useDashboardData = () => {
  const { user, role } = UserAuth();
  const axios = axiosinstance();

  const fetchSellerMedicines = async () => {
    const res = await axios.get(`seller-medicine/${user?.email}`);
    return res.data.result;
  };

  const fetchSellerBanners = async () => {
    const res = await axios.get(`seller-added-banner/${user?.email}`);
    return res.data.result;
  };
  const sellerPaidOrderFn = async () => {
    const res = await axios.get(
      `/seller-payment-history?sellerEmail=${user?.email}`
    );

    const allProducts = res.data.result.flat();
    const pendingOrders = allProducts.filter(
      (item) => item?.orderStatus === "pending"
    );

    const paidOrders = allProducts.filter((item) => item?.payStatus === "paid");

    const sellerData = {
      totalOrders: allProducts.length,
      pendingOrders: pendingOrders.length,
      paidOrders: paidOrders.length,
      allOrders: allProducts,
    };
    return sellerData;
  };

  // admin
const fetchAdminTotalPaidOrders = async () => {
  const res = await axios.get(`/admin-paid-orders`);
  const paidOrders = res.data.paidOrders;
  const pendingOrders = res.data.pendingOrders;

  console.log("Paid Orders:", paidOrders);
  console.log("Pending Orders:", pendingOrders);

  return {
    paidOrders: paidOrders.length,
    pendingOrders: pendingOrders.length,
  };
};



  const fetchAdminStats = async () => {
    const res = await axios.get(`admin-dashboard-summary`);
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
