import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useGetapi from "../../../../hooks/useGetapi/useGetapi";
import Loader from "../../../../components/Loader/Loader";
import Button from "../../../../components/Button/Button";
import { AnimatePresence, motion } from "framer-motion";
import { UserAuth } from "../../../../hooks/userAuth/userAuth";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/axisonsecure/axiosSecure";
import { image, link } from "framer-motion/client";
import { FaWindowClose } from "react-icons/fa";
import PageTitle from "../../../../components/PageTitle/PageTitle";

const AdvertiseRequest = () => {
  const { user } = UserAuth();
  const { data, isLoading, isError, error } = useGetapi(
    `/seller/banner?email=${user?.email}`
  );
  const axisonsecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  if (isLoading) return <Loader />;
  if (isError) return <p>{error.message}</p>;

  const onSubmit = async (formData) => {
    try {
      console.log(formData);
      const {
        image,
        title,
        subTitle,
        sellerEmail,
        description,
        medicineName,
        btnText,
      } = formData;
      const data = {
        image,
        title,
        subTitle,
        sellerEmail,
        btnText,
        medicineName,
        description,
        isActive: false,
        status: "pending",
        link: "/shop",
      };
      console.log(data);
      const res = await axisonsecure.post("/banner", data);
      if (res.data) {
        Swal.fire({
          icon: "success",
          title: "Advertise Banner slider Added Successfully!",
        });
      }
    } catch (err) {
      // If error
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "There was an error while submitting your advertise request.",
        confirmButtonText: "Try Again",
      });
      console.log(err); // You can log the error for debugging purposes
    }
  };

  return (
    <div className="px-4 pt-10">
      <PageTitle title={'Advertise'}/>
      {/* Add Advertise Button */}
      <div className="flex justify-end mb-4">
        <Button onClick={() => setIsOpen(true)} children={"Add Advertise"} />
      </div>

      {/* Existing Banners */}
      {!data || data.length === 0 ? (
        <p>Banner is not found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Medicine Name</th>
                <th>Title</th>
                <th>Sub Title</th>
                <th>Status</th>
                <th>Description</th>
                <th>Button Text</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 rounded object-cover"
                    />
                  </td>
                  <td>{item.medicineName}</td>
                  <td>{item.title}</td>
                  <td>{item.subTitle}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-white text-xs ${
                        item.isActive ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {item.isActive ? "Active" : "Non Active"}
                    </span>
                  </td>
                  <td>{item.description}</td>
                  <td>{item.btnText}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 flex justify-center items-center z-50"
          >
            <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-xl font-bold"
                onClick={() => setIsOpen(false)}
              >
                <FaWindowClose className="text-primary cursor-pointer" />
              </button>
              <h2 className="text-2xl font-bold mb-4 text-center">
                Add Advertise
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Image URL */}
                <div>
                  <input
                    type="text"
                    {...register("image", {
                      required: "Image URL is required",
                    })}
                    placeholder="Image URL"
                    className="input w-full"
                  />
                  {errors.image && (
                    <p className="text-red-500">{errors.image.message}</p>
                  )}
                </div>

                {/* Title */}
                <div>
                  <input
                    type="text"
                    {...register("title", { required: "Title is required" })}
                    placeholder="Title"
                    className="input w-full"
                  />
                  {errors.title && (
                    <p className="text-red-500">{errors.title.message}</p>
                  )}
                </div>
                {/* medicine name */}
                <div>
                  <input
                    type="text"
                    {...register("medicineName", {
                      required: "medicine name is required",
                    })}
                    placeholder="Medicine Name.."
                    className="input w-full"
                  />
                  {errors.medicineName && (
                    <p className="text-red-500">
                      {errors.medicineName.message}
                    </p>
                  )}
                </div>

                {/* Sub Title */}
                <div>
                  <input
                    type="text"
                    {...register("subTitle", {
                      required: "Sub Title is required",
                    })}
                    placeholder="Sub Title"
                    className="input w-full"
                  />
                  {errors.subTitle && (
                    <p className="text-red-500">{errors.subTitle.message}</p>
                  )}
                </div>
                {/* Sub Title */}
                <div>
                  <input
                    type="text"
                    {...register("btnText", {
                      required: "btnText is required",
                    })}
                    placeholder="Button  Text"
                    className="input w-full"
                  />
                  {errors.btnText && (
                    <p className="text-red-500">{errors.btnText.message}</p>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    {...register("sellerEmail", {
                      required: "Email is required",
                    })}
                    value={user?.email}
                    className="input w-full"
                  />
                  {errors.sellerEmail && (
                    <p className="text-red-500">{errors.sellerEmail.message}</p>
                  )}
                </div>

                <div>
                  <textarea
                    type="text"
                    {...register("description", {
                      required: "Description is required",
                    })}
                    placeholder="Description.."
                    className="input w-full"
                  />
                </div>

                <Button children={"Request Advertise"} type="submit" />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvertiseRequest;
