import { useContext, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { FaEye } from "react-icons/fa";
import { BiSolidCartAdd } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import axiosinstance from "../../hooks/axiosInstance/axiosinstance";
import { UserAuth } from "../../hooks/userAuth/userAuth";
import MedicineDetails from "./MedicineDetails";
import { AnimatePresence } from "framer-motion";
import { CartContext } from "../../Contextapi/AddToCart/cartContext";
import { Link, useLocation } from "react-router";
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

  const handleViewDetails = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

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
            {medicines.map((medicine) => (
              <div
                key={medicine._id}
                className="bg-white shadow-md rounded-lg overflow-hidden p-4 flex flex-col justify-between group hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative overflow-hidden rounded-lg mb-4"
                onClick={()=>addToCart(cart)}
                >
                  <img
                    src={medicine.image}
                    alt={medicine.name}
                    className="w-full h-30  object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  <p className="bg-primary text-xs font-medium px-2 py-1 text-white rounded-full absolute top-2 right-2">
                    {Math.round(((medicine.price - medicine.discountPrice) / medicine.price) * 100)}%
                  </p>
                </div>
                <h3 className="text-md font-semibold mb-1 line-clamp-1">{medicine.name}</h3>
                <p className="text-gray-600 text-sm  mb-2 line-clamp-1">
                  {medicine.shortDescription || medicine.genericName}
                </p>
                <div className="flex justify-between items-center   gap-3  mt-auto mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-green-600">
                      ${medicine.discountPrice}
                    </span>
                    <span className="text-xs line-through text-gray-600">
                      ${medicine.price}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm flex justify-center">
                     
                      {medicine.brand}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 justify-center mt-auto">
                  <button
                    onClick={() => addToCart(medicine)}
                    className="btn btn-primary btn-sm flex-1"
                  >
                    <BiSolidCartAdd className="text-xl" />
                  </button>
                  <button
                    onClick={() => handleViewDetails(medicine)}
                    className="btn btn-sm btn-primary flex-1"
                  >
                    <FaEye className="text-xl" />
                  </button>
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

        {/* Medicine Details Modal */}
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
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Shop;
