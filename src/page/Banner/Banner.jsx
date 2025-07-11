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

  const highlightPercentageText = (text) => {
    const percentRegex = /\d+%/g; // Detects any percentage like 30%, 50%, etc.
    return text.split(percentRegex).map((part, index, arr) => {
      // If part matches the percentage, highlight that part
      if (index < arr.length - 1) {
        const match = text.match(percentRegex)[index];
        return (
          <>
            {part}
            <span key={index} className="text-primary font-bold">{match}</span>
          </>
        );
      }
      return part;
    });
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load banners
      </div>
    );

  return (
    <div className="w-11/12 mx-auto my-2">
      <Swiper
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true}
        speed={1500}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination, Navigation]}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="rounded-xl overflow-hidden"
      >
        {data?.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[250px] md:h-[600px]">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-4">
                {/* Animate text only on active slide */}
                {activeIndex === index && (
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 200 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeIn" }}
                  >
                  
                    <h2 className="text-xl md:text-6xl font-bold mb-2">
                      {highlightPercentageText(banner.title)}
                    </h2>
                    <p className="text-sm md:text-3xl mb-4">
                      {banner.subTitle}
                    </p>
                    <Link href={banner.link || "/shop"} className="">
                      <Button
                        children={banner.btnText}
                        className={"text-white"}
                      />
                    </Link>
                  </motion.div>
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
