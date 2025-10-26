import { useContext } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { BsCartPlus } from "react-icons/bs";
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
    navigate(`/medicine-details/${id}`)
  }


  return (
    <div className="py-16">
      <div className="custom-container">
        <h2 className="text-3xl font-bold mb-8 font-syne ">Discounted Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (

            <div key={product._id} className="product-card shadow-md rounded-xl  bg-white transition-all duration-500 relative group flex flex-col  ">
              <div className="relative overflow-hidden rounded-lg mb-4 " onClick={() => handleCheckout(product._id)} >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-50  object-contain transition-transform duration-300 group-hover:scale-125 cursor-pointer"
                />
                <p className="bg-primary text-xs font-medium px-2 py-1 text-white rounded-full absolute top-2 right-2">
                  {Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                </p>
              </div>

              <div className="bg-gray-100 p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-syne text-gray-600">{product.category}</p>
                  <p className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill={i < Math.floor(product.rating) ? "green" : "#e5e7eb"}
                        className="w-4 h-4"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.382 2.46a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118l-3.382-2.46a1 1 0 00-1.175 0l-3.382 2.46c-.785.57-1.84-.197-1.54-1.118l1.286-3.966a1 1 0 00-.364-1.118L2 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                      </svg>
                    ))}
                  </p>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2  line-clamp-1 font-syne">
                  {product.name}
                </h3>



              

                <div className="font-syne flex justify-between items-center mt-auto">
                  <button onClick={() => addToCart(product)} className="border border-primary px-4 py-1 text-md font-syne rounded-md hover:bg-primary hover:text-white cursor-pointer transition-all duration-300 flex items-center gap-2">Add To Cart <BsCartPlus /></button>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-green-600">
                      ৳{product.discountPrice}
                    </span>
                    <span className="text-xs line-through text-gray-600">
                      ${product.price}
                    </span>
                  </div>

                </div>
              </div>
            </div>

          ))}
        </div>

        <div className="flex justify-center items-center mt-10">
          <Link to={'/shop'} className="border-2 border-primary text-black b px-5 py-1 rounded-md hover:bg-primary hover:text-white cursor-pointer transition-all duration-300">See More</Link>
        </div>
      </div>
    </div>
  );
};

export default DiscountProducts;
