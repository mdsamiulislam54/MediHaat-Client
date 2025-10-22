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
import { Link, useNavigate } from "react-router";
import Loader from "../../components/Loader/Loader";

const DiscountProducts = () => {
  const axiossecure = useAxiosSecure();
  const { addToCart } = useContext(CartContext)
const navigate = useNavigate()
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["discountProducts"],
    queryFn: async () => {
      const res = await axiossecure.get("/discount/products");
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center py-10 min-h-screen flex justify-center items-center"><Loader /></div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  const handleCheckout = (id) => {
    navigate(`/checkout/${id}`)
  }
  return (
    <div className="py-16">
      <div className="custom-container">
        <h2 className="text-3xl font-bold mb-8 ">Discounted Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (

            <div key={product._id} className="product-card shadow-md rounded-xl p-4 bg-white transition-all duration-500 relative group flex flex-col h-[300px] ">
              <div className="relative overflow-hidden rounded-lg mb-4" onClick={()=>handleCheckout(product._id)} >
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

              <p className="text-gray-600 text-sm  line-clamp-1 mb-2 ">
                {product.shortDescription}
              </p>

              <div className="flex justify-between items-center   gap-3  mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-green-600">
                    ৳{product.discountPrice}
                  </span>
                  <span className="text-xs line-through text-gray-600">
                    ${product.price}
                  </span>
                </div>
                <div>
                  <p className="flex justify-center line-clamp-1 text-xs">
                    <span className="font-bold">Brand : </span>
                    {product.brand}
                  </p>
                </div>
              </div>

              <div className="">
                <button onClick={() => addToCart(product)} className="border border-primary px-4 py-2 rounded-md hover:bg-primary hover:text-white cursor-pointer transition-all duration-300">Add To Cart</button>
              </div>
            </div>

          ))}
        </div>

        <div className="flex justify-end items-center">
          <Link to={'/shop'} className="border-2 border-primary text-black b px-5 py-1 rounded-md hover:bg-primary hover:text-white cursor-pointer transition-all duration-300">See More</Link>
        </div>
      </div>
    </div>
  );
};

export default DiscountProducts;
