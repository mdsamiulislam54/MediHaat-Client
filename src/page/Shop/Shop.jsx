import { useContext, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { BsCartPlus } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import axiosinstance from "../../hooks/axiosInstance/axiosinstance";


import { CartContext } from "../../Contextapi/AddToCart/cartContext";
import { Link, useLocation, useNavigate } from "react-router";
import { FaSearch } from "react-icons/fa";
import PageTitle from "../../components/PageTitle/PageTitle";
import { MdOutlineAddShoppingCart } from "react-icons/md";
const Shop = () => {
  const axiosInstanceCall = axiosinstance();
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(20);
  const { addToCart } = useContext(CartContext);
  const location = useLocation();
  const categoryName = location.state?.category;
  const [sortOrder, setSortOrder] = useState("");
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate()

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "shop",
      currentPage,
      perPage,
      categoryName,
      sortOrder,
      searchText,
    ],
    queryFn: async () => {
      const res = await axiosInstanceCall.get(
        `/get-medicine?page=${currentPage}&limit=${perPage}${categoryName ? `&category=${categoryName}` : ""
        }${sortOrder ? `&sort=${sortOrder}` : ""}${searchText ? `&search=${searchText}` : ""
        }`
      );
      return res.data;
    },
  });

  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const medicines = data?.result || [];
  const totalCount = data?.count || 0;
  const totalPage = Math.ceil(totalCount / perPage);
  const pageArray = [...Array(totalPage).keys()];


  const handleCheckout = (id) => {
    navigate(`/medicine-details/${id}`)
  }
  if (error) return <p className="text-center text-red-500">{error.message}</p>;

  return (
    <div className="min-h-screen">
      <PageTitle title={"Shop"} />
      {/* Banner */}
      <div className=" relative">
        <img
          className="w-full h-[200px] object-center object-cover "
          src="https://live.themewild.com/medion/assets/img/breadcrumb/01.jpg"
          alt=""
        />
        <div className="absolute inset-0  bg-black/40 text-white flex items-center justify-center">
          <div>
            <h2 className="text-3xl font-bold  flex items-center gap-2"><MdOutlineAddShoppingCart />Shop</h2>

          </div>
        </div>
      </div>
      <div className="custom-container">


        {/* Search & Sort */}
        <div className="flex flex-col md:flex-row items-center justify-between my-6 gap-4">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search by name, generic, or company"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="input input-bordered w-full pl-10"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary text-lg pointer-events-none">
              <FaSearch />
            </div>
          </div>
          <select
            className="select select-bordered w-full max-w-xs"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort by Price</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        {/* Card Layout */}
        {isLoading ? (
          <div className="min-h-screen flex justify-center items-center">
            <Loader />
          </div>
        ) : medicines.length === 0 ? (
          <p className="text-center text-red-500">No medicines found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 font-rubik">
            {medicines.map((product) => (

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
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center my-10 ">
          <button
            className="btn mx-4"
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Prev
          </button>
          <ul className="flex gap-4">
            {pageArray?.map((page) => (
              <li
                key={page}
                className={`btn bg-gray-200 ${currentPage === page ? "bg-primary text-white" : ""
                  }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </li>
            ))}
            <button
              className="btn mx-4"
              disabled={pageArray?.length - 1 === currentPage}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </ul>
        </div>

        {/* Medicine Details Modal
        <AnimatePresence>
          {isModalOpen && selectedMedicine && (
            <MedicineDetails
              medicine={selectedMedicine}
              onClose={() => {
                setIsModalOpen(false);
                setSelectedMedicine(null);
              }}
            />
          )}
        </AnimatePresence> */}
      </div>
    </div>
  );
};

export default Shop;
