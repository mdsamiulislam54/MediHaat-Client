import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Button from "../../components/Button/Button";

const DiscountProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/products.json");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (isLoading) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="my-20">
      <div className="w-11/12 mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Discounted Products
        </h2>

        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
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
              <div className="product-card shadow-md rounded-xl p-4 bg-white  transition-all duration-500 relative group my-10 hover:shadow-primary/70">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-44 md:h-48 object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  <p className="bg-accent text-xs font-medium px-2 py-1 text-white rounded-full absolute top-2 right-2">
                    {product.discountPercentage}%
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-1 max-lg:text-center">
                  {product.name}
                </h3>

                <ul className="grid grid-cols-2 gap-1 text-[11px] text-gray-600 mb-3 px-2 ">
                  {product.features.map((feature, i) => (
                    <li
                      key={i}
                      className="list-disc list-inside leading-4"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex max-lg:justify-center gap-3 items-center mt-auto">
                  <span className="text-lg font-bold text-green-600">
                    ${product.discountedPrice}
                  </span>
                  <span className="text-xs line-through text-gray-400">
                    ${product.originalPrice}
                  </span>
                </div>

                <div className="mt-3 flex max-lg:justify-center">
                  <Button children={"Shop Now"} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default DiscountProducts;
