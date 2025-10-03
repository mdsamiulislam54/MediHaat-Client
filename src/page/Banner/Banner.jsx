import { useQuery } from "@tanstack/react-query";
import axiosinstance from "../../hooks/axiosInstance/axiosinstance";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import { useState } from "react";
import { Link } from "react-router";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";

const Banner = () => {
  const instance = axiosinstance();
  const [activeIndex, setActiveIndex] = useState(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ["bannerimages"],
    queryFn: async () => {
      const res = await instance.get("/banner");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="text-center py-10 min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load banners
      </div>
    );

  return (
    <div className="w-full mx-auto lg:min-h-[80vh] shadow flex justify-center items-center" >
      <Swiper
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
       
        speed={1000}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination, ]}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="overflow-hidden  "
      >
        {data?.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="w-full flex items-center justify-center ">
              <div className="custom-container flex flex-col lg:flex-row justify-between items-center gap-6 h-full bg-pri">
                {activeIndex === index && (
                  <>
                    {/* Left Text */}
                    <motion.div
                      key={activeIndex}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.8 }}
                      className="flex-1 text-center lg:text-left"
                    >
                      <p className="uppercase text-sm lg::text-base tracking-widest text-primary font-semibold">
                        {banner.title || "Easy Health Care"}
                      </p>
                      <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
                        {banner.heading || (
                          <>
                            Medicine & Health Care{" "}
                            <span className="text-primary">For Your</span>{" "}
                            Family
                          </>
                        )}
                      </h2>
                      <p className="text-sm md:text-lg text-gray-600 mb-5 max-w-xl">
                        {banner.subTitle +
                          "We provide quality medicine and health care products for your family with trusted service."}
                      </p>

                      <Link to={banner.link || "/shop"}>
                        <Button
                          children={banner.btnText || "Shop Now"}
                          className={"text-black"}
                        />
                      </Link>
                    </motion.div>

                    {/* Right Image */}
                    <div
                      
                      className="lg:flex-1 flex justify-center my-10 lg:my-0 "
                    >
                      <img
                        src={banner.image}
                        alt="banner"
                        className="w-[24rem] lg:w-[28rem] drop-shadow-lg  "
                      />
                      
                    </div>
                  </>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
