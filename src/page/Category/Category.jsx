import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/axisonsecure/axiosSecure";
import Loader from "../../components/Loader/Loader";
import ErrorPage from "../ErrorPage/ErrorPage";

const Category = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    data: catrgory,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/category");
        return res?.data.result;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Error fetching users"
        );
      }
    },
  });

  const handleCategoryClick = (categoryName) => {
    navigate("/shop", { state: { category: categoryName } });
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorPage message={error.message} />;

  return (
    <div className="w-11/12 mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Shop by Category</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 6 },
        }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={800}
        modules={[Autoplay]}
        className="py-2"
      >
        {catrgory?.map((category) => {
          return (
            <SwiperSlide key={category._id}>
              <div
                onClick={() => handleCategoryClick(category.name)}
                className="shadow shadow-primary/50 my-5 rounded-lg p-4 flex flex-col items-center text-center hover:shadow-md transition cursor-pointer h-[150px]"
              >
                <div className="text-4xl text-primary">
                  <img
                    src={category.images}
                    alt=""
                    className="w-14 h-14 mb-4"
                  />
                </div>
                <h3 className="text-base font-semibold">{category.name}</h3>
                <p className="text-xs text-gray-500">
                  {category.medicineCount} Medicines
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Category;
