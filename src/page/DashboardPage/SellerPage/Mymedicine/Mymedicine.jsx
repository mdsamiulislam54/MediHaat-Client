import React, { useState } from "react";
import axiosinstance from "../../../../hooks/axiosInstance/axiosinstance";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../components/Loader/Loader";
import { UserAuth } from "../../../../hooks/userAuth/userAuth";

const Mymedicine = () => {
  const axiosInstanceCall = axiosinstance();
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const totalPage = Math.ceil(count / perPage) || 0;
  const pageArray = [...Array(totalPage).keys()];
  const {user} = UserAuth()

  const { data, isLoading, error } = useQuery({
    queryKey: ["medicine", currentPage, perPage],
    queryFn: async () => {
      const res = await axiosInstanceCall.get(
        `all-medicine?limit=${perPage}&page=${currentPage}&email=${user.email}`
      );
      console.log(res);
      setCount(res.data.count);
      return res.data.result;
    },
  });


  if (error) {
    return <p>{error.message}</p>;
  }
  console.log(count);
  console.log(totalPage);
  return (
    <div>
      <div className="px-4">
        <h2>Total Medicines: {count}</h2>

        <div>
          {data?.length === 0 ? (
            <p className="min-h-screen flex justify-center items-center">No medicines found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr className="bg-secondary">
                    <th></th>
                    <th>Name</th>
                    <th>GenericName</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan="6">
                        <div className="flex justify-center items-center h-20 min-h-screen">
                          <Loader />
                        </div>
                      </td>
                    </tr>
                  ) : (
                    data.map((medicine) => (
                      <tr key={medicine._id} className="hover:bg-secondary">
                        <th>
                          <img
                            src={medicine.imageURL}
                            alt=""
                            className="max-w-[40px] h-auto object-contain"
                          />
                        </th>
                        <td>{medicine.name}</td>
                        <td>{medicine.genericName}</td>
                        <td>{medicine.category}</td>
                        <td>{medicine.price}</td>
                        <td>x</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        {/* pagination */}
          <div className="flex justify-center items-center my-10">
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
                    {page + 1}
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
    </div>
  );
};

export default Mymedicine;
