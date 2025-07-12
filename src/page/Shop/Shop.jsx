import React, { useState } from "react";
import Loader from "../../components/Loader/Loader";
import Button from "../../components/Button/Button";
import { FaEye } from "react-icons/fa";
import { BiSolidCartAdd } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import axiosinstance from "../../hooks/axiosInstance/axiosinstance";
import { UserAuth } from "../../hooks/userAuth/userAuth";

const Shop = () => {
  const axiosInstanceCall = axiosinstance();
  const { user } = UserAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const { data, isLoading, error } = useQuery({
    queryKey: ["shop", currentPage, perPage],
    
    queryFn: async () => {
      const res = await axiosInstanceCall.get(
        `/get-medicine?page=${currentPage}&limit=${perPage}`
      );
      console.log("shop", res);
      return res.data;
    },
  });


  if (error) return <p className="text-center text-red-500">{error.message}</p>;

  const medicines = data?.result || [];
  const totalCount = data?.count || 0;
  const totalPage = Math.ceil(totalCount / perPage);
  const pageArray = [...Array(totalPage).keys()];

  return (
    <div className="min-h-screen">
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
                          src={medicine.imageURL}
                          alt={medicine.medicineName}
                          className="w-[40px] h-auto rounded object-cover"
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
                        <button className="btn btn-primary btn-sm">
                          <BiSolidCartAdd className="text-xl" />
                        </button>
                        <button className="btn btn-sm btn-primary">
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
      </div>
    </div>
  );
};

export default Shop;
