import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Button from "../../components/Button/Button";
import useAxiosSecure from "../../hooks/axisonsecure/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../../Contextapi/AddToCart/cartContext";
import { Link } from "react-router";

const DiscountProducts = () => {
  const axiossecure = useAxiosSecure();
  const {addToCart} = useContext(CartContext)

  const { data: products, isLoading, error } = useQuery({
    queryKey: ["discountProducts"],
    queryFn: async () => {
      const res = await axiossecure.get("/discount/products");
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center py-10">Loading products...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">Discounted Products</h2>

        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          breakpoints={{
            450: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1440: { slidesPerView: 4 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="product-card shadow-md rounded-xl p-4 bg-white transition-all duration-500 relative group flex flex-col h-[350px] mb-14">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-30  object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  <p className="bg-primary text-xs font-medium px-2 py-1 text-white rounded-full absolute top-2 right-2">
                    {Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-2  line-clamp-1">
                  {product.name}
                </h3>

                <p className="text-gray-600 text-sm mb-1 line-clamp-2  text-justify">
                  {product.shortDescription}
                </p>

                <div className="flex justify-between items-center   gap-3 items-center mt-auto mb-4">
                  <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-green-600">
                    ${product.discountPrice}
                  </span>
                  <span className="text-xs line-through text-gray-600">
                    ${product.price}
                  </span>
                  </div>
                  <div>
                    <p className="text-sm flex justify-center">
                      <span className="font-bold">Brand : </span>
                      {product.brand}
                    </p>
                  </div>
                </div>

                <div className="">
                  <button  onClick={()=>addToCart(product)} className="border border-primary px-4 py-2 rounded-md hover:bg-primary hover:text-white cursor-pointer transition-all duration-300">Add To Cart</button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-end items-center">
          <Link to={'/shop'} className="border-2 border-primary text-black b px-5 py-2 rounded-md hover:bg-primary hover:text-white cursor-pointer transition-all duration-300">See More</Link>
        </div>
      </div>
    </div>
  );
};

export default DiscountProducts;
