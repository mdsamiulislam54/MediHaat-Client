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
import { useLocation } from "react-router";
import { FaSearch } from "react-icons/fa";
import PageTitle from "../../components/PageTitle/PageTitle";

const Shop = () => {
  const axiosInstanceCall = axiosinstance();
  const { user } = UserAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const { addToCart } = useContext(CartContext);
  const location = useLocation();
  const categoryName = location.state?.category;
  const [sortOrder, setSortOrder] = useState(""); // "asc" | "desc"
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
        `/get-medicine?page=${currentPage}&limit=${perPage}${
          categoryName ? `&category=${categoryName}` : ""
        }${sortOrder ? `&sort=${sortOrder}` : ""}${
          searchText ? `&search=${searchText}` : ""
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

  // Handle eye button click
  const handleViewDetails = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  if (error) return <p className="text-center text-red-500">{error.message}</p>;
  console.log(data)
  return (
    <div className="min-h-screen">
      <PageTitle title={'Shop'}/>
      <div className="w-11/12 mx-auto">
        {/* Banner */}
        <div className="my-4 relative">
          <img
            className="w-full h-[400px] object-center object-cover rounded-xl"
            src="https://img.freepik.com/free-photo/pharmacist-work_23-2150600102.jpg?t=st=1752303511~exp=1752307111~hmac=05a78a3bb2e8468bfe7d35e7d813a773ab0dbfa22bf639bd70296f1318d6313f&w=1380"
            alt=""
          />
          <div className="absolute inset-0 bg-black/40 rounded-xl flex justify-center items-center text-white">
            <h2 className="text-3xl font-bold underline">Shop</h2>
          </div>
        </div>
        {/* sorted */}
        <div className="flex flex-col md:flex-row items-center justify-between my-6 gap-4">
          {/* Search Input with Icon */}
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

          {/* Sort Dropdown */}
          <select
            className="select select-bordered w-full max-w-xs"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option className="p-2 bg-white  border-b" value="">Sort by Price</option>
            <option className="p-2 bg-white " value="asc">Low to High</option>
            <option className="p-2 bg-white " value="desc">High to Low</option>
          </select>
        </div>

        {/* Medicine Table */}
        {isLoading ? (
          <div className="min-h-screen flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-center bg-secondary">
                  <th>Images</th>
                  <th>Name</th>
                  <th>GenericName</th>
                  <th>Category</th>
                  <th>Company</th>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Seller</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {medicines.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="text-center text-red-500">
                      No medicines found.
                    </td>
                  </tr>
                ) : (
                  medicines.map((medicine) => (
                    <tr
                      key={medicine._id}
                      className="text-center hover:bg-secondary cursor-pointer transition-all duration-300"
                    >
                      <td>
                        <img
                          src={medicine.image}
                          alt={medicine.medicineName}
                          className="lg:w-[80px] w-[40px] h-auto rounded object-cover"
                        />
                      </td>
                      <td>{medicine.name}</td>
                      <td>{medicine.genericName}</td>
                      <td>{medicine.category}</td>
                      <td>{medicine.manufacturer}</td>
                      <td>{medicine.stock}</td>
                      <td>${medicine.price}</td>
                      <td>{medicine.discount}%</td>
                      <td>{medicine.sellerName}</td>
                      <td className="space-x-2 flex justify-center">
                        <button
                          onClick={() => addToCart(medicine)}
                          className="btn btn-primary btn-sm"
                        >
                          <BiSolidCartAdd className="text-xl" />
                        </button>
                        <button
                          onClick={() => handleViewDetails(medicine)}
                          className="btn btn-sm btn-primary"
                        >
                          <FaEye className="text-xl" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* pagination */}
        <div className="flex justify-center items-center my-10 ">
          <button
            className="btn mx-4"
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Prev
          </button>
          <ul className="flex gap-4">
            {pageArray?.map((page) => {
              return (
                <li
                  key={page}
                  className={`btn bg-gray-200 ${
                    currentPage === page ? "bg-primary text-white" : ""
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </li>
              );
            })}
            <button
              className="btn mx-4"
              disabled={pageArray?.length - 1 === currentPage ? true : false}
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
