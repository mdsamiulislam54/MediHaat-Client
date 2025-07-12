import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useGetapi from "../../../../hooks/useGetapi/useGetapi";
import Loader from "../../../../components/Loader/Loader";
import Button from "../../../../components/Button/Button";
import { AnimatePresence, motion } from "framer-motion";
import { UserAuth } from "../../../../hooks/userAuth/userAuth";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/axisonsecure/axiosSecure";
import { image } from "framer-motion/client";
import { FaWindowClose } from "react-icons/fa";

const AdvertiseRequest = () => {
  const { data, isLoading, isError, error } = useGetapi("/all-banner");
  const axisonsecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = UserAuth();

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
        console.log(formData)
        const {image,title,subTitle,email,description}= formData;
        const data = {
            image,
            title,
            subTitle,
            sellerEmail:email,
            description
        }
        console.log(data)
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
      {/* Add Advertise Button */}
      <div className="flex justify-end mb-4">
        <Button onClick={() => setIsOpen(true)} children={"Add Advertise"} />
      </div>

      {/* Existing Banners */}
      {!data || data.length === 0 ? (
        <p>Banner is not found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.map((item) => (
            <div
              key={item._id}
              className="relative rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={item.image}
                alt=""
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white p-6 text-center space-y-2">
                <h2 className="text-3xl font-bold">{item.title}</h2>
                <p className="text-lg">{item.subTitle}</p>
                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium ${
                    item.isActive ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {item.isActive ? "Active" : "Non Active"}
                </span>
              </div>
            </div>
          ))}
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
                <FaWindowClose className="text-primary cursor-pointer"/>
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

                <div>
                  <input
                    type="email"
                    {...register("sellerEmail", { required: "Email is required" })}
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

                <Button
                  children={"Request Advertise"}
                  type="submit"
                  
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvertiseRequest;
