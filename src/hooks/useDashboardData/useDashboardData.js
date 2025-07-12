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

  const adminDashboardQuery = useQuery({
    queryKey: ["adminDashboard"],
    queryFn: fetchAdminStats,
    enabled: role?.includes("admin"),
  });

  return {
    sellerMedicineQuery,
    sellerBannerQuery,
    adminDashboardQuery,
    role,
    user,
  };
};

export default useDashboardData;
