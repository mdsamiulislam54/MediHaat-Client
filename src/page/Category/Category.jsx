import React from "react";

import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import {
  FaCapsules, FaHeartbeat, FaHeart, FaBaby, FaPills, FaSpa,
  FaShieldVirus, FaStethoscope, FaFemale, FaBriefcaseMedical, FaLeaf
} from "react-icons/fa";


// Icon Mapping
const iconMap = {
  FaCapsules: FaCapsules,
  FaHeartbeat: FaHeartbeat,
  FaHeart: FaHeart,
  FaBaby: FaBaby,
  FaPills: FaPills,
  FaSpa: FaSpa,
  FaShieldVirus: FaShieldVirus,
  FaStethoscope: FaStethoscope,
  FaFemale: FaFemale,
  FaBriefcaseMedical: FaBriefcaseMedical,
  FaLeaf: FaLeaf,
};

const Category = () => {


  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/categories.json");
      const data = await res.json()
      
      return data;
    },
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Failed to load categories</div>;

  return (
    <div className="w-11/12 mx-auto my-20">
      <h2 className="text-3xl font-bold mb-6 text-center">Shop by Category</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280:{slidesPerView:6}
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
        {data.map((category) => {
          const Icon = iconMap[category.icon];
          return (
            <SwiperSlide key={category.id} className="">
              <div className=" shadow shadow-primary/50 my-5 rounded-lg p-4 flex flex-col items-center text-center hover:shadow-md transition cursor-pointer h-[150px]  ">
                <div className="text-4xl text-primary rose-500 ">
                  {Icon && <Icon />}
                </div>
                <h3 className="text-base font-semibold">{category.name}</h3>
                <p className="text-xs text-gray-500">{category.medicineCount} Medicines</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Category;
