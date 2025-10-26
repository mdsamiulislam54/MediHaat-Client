import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/axisonsecure/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/Loader/Loader";
import { useReactToPrint } from "react-to-print";
import { DownloadTableExcel } from "react-export-table-to-excel-xlsx";
import { Range } from "react-range";

const SalesReport = () => {
  const axiosSecure = useAxiosSecure();
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(4);
  const totalPage = Math.ceil(count / perPage) || 0;
  const pageArray = [...Array(totalPage).keys()];
  console.log(pageArray);
  const {
    data: orders,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["order", currentPage, perPage, priceRange],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/admin/sales/report?page=${currentPage}&limit=${perPage}&min=${priceRange[0]}&max=${priceRange[1]}`
      );
      console.log(res);
      setCount(res?.data?.count);
      return res.data?.result;
    },
  });

  const contentRef = useRef();
  const handlePrint = useReactToPrint({ contentRef });

 
  console.log(orders);
  return (
    <div className="px-4 ">
      <div>
        <div className="flex items-center justify-between my-10">
          <div className="flex items-center gap-4">
          
            <div className="w-64">
              <Range
                step={1}
                min={0}
                max={10000}
                values={priceRange}
                onChange={(values) => setPriceRange(values)}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    className="h-2 bg-gray-300 rounded"
                    style={{ ...props.style }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div {...props} className="h-5 w-5 bg-primary rounded-full" />
                )}
              />
              <div className="flex justify-between text-xs mt-1">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <DownloadTableExcel
                filename="users table"
                sheet="users"
                currentTableRef={contentRef.current}
              >
                <button className="p-2 border border-primary rounded-md hover:bg-primary hover:text-white font-bold text-sm transition-all duration-300 cursor-pointer">
                  Export xlsx
                </button>
              </DownloadTableExcel>
            </div>
            <button
              onClick={handlePrint}
              className="p-2 border border-primary rounded-md hover:bg-primary hover:text-white font-bold text-sm transition-all duration-300 cursor-pointer"
            >
              Export PDF
            </button>
          </div>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table ref={contentRef} className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Images</th>
                  <th>Medicine Name</th>
                  <th>Seller Email</th>
                  <th>Buyer Email</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {orders?.length === 0 ? (
                  <div></div>
                ) : (
                  orders?.map((order) => (
                    <tr>
                      <th>
                        <img
                          src={order.products.image}
                          alt="order images"
                          className="lg:w-14 w-10"
                        />
                      </th>
                      <td>{order.products.name}</td>
                      <td>{order.sellerEmail}</td>
                      <td>{order.email}</td>
                      <td>${order.totalAmount}</td>
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
  );
};

export default SalesReport;
