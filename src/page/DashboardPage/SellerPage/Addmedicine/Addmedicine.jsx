import React from "react";
import { useForm } from "react-hook-form";
import { IoAddCircleOutline } from "react-icons/io5";
import axiosinstance from "../../../../hooks/axiosInstance/axiosinstance";
import Swal from "sweetalert2";
import { UserAuth } from "../../../../hooks/userAuth/userAuth";

const AddMedicineForm = () => {
  const axiosinstanceCall = axiosinstance();
  const {user} = UserAuth()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axiosinstanceCall.post("/add-medicine", data);

      if (res.data) {
        Swal.fire({
          icon: "success",
          title: "Medicine Added Successfully!",
          text: `${data.name} has been added to your store.`,
        });
      }
    } catch (error) {
      console.error("Add Medicine Error:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Add Medicine!",
        text: error.response?.data?.message || "Something went wrong.",
      });
    }

    reset();
  };

  const categories = [
    "Painkiller",
    "Antibiotic",
    "Vitamin",
    "Baby Care",
    "Heart Care",
    "Ayurveda & Herbal",
    "Women's Health",
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
        <IoAddCircleOutline /> Add New Medicine
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Name */}
        <div>
          <input
            {...register("name", { required: "Medicine name is required" })}
            type="text"
            placeholder="Medicine Name"
            className="input input-bordered w-full"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Generic Name */}
        <div>
          <input
            {...register("genericName", {
              required: "Generic name is required",
            })}
            type="text"
            placeholder="Generic Name"
            className="input input-bordered w-full"
          />
          {errors.genericName && (
            <p className="text-red-600 text-sm mt-1">
              {errors.genericName.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <select
            {...register("category", { required: "Category is required" })}
            className="select select-bordered w-full"
          >
            <option value="">Select Category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-600 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Medicine Type */}
        <div>
          <select
            {...register("medicineType", { required: "Type is required" })}
            className="select select-bordered w-full"
          >
            <option value="">Select Type</option>
            <option value="Prescription">Prescription</option>
            <option value="OTC">OTC</option>
          </select>
          {errors.medicineType && (
            <p className="text-red-600 text-sm mt-1">
              {errors.medicineType.message}
            </p>
          )}
        </div>

        {/* Manufacturer */}
        <div>
          <input
            {...register("manufacturer", {
              required: "Manufacturer name is required",
            })}
            type="text"
            placeholder="Manufacturer"
            className="input input-bordered w-full"
          />
          {errors.manufacturer && (
            <p className="text-red-600 text-sm mt-1">
              {errors.manufacturer.message}
            </p>
          )}
        </div>

        {/* Expiry Date */}
        <div>
          <input
            {...register("expiryDate", { required: "Expiry date is required" })}
            type="date"
            className="input input-bordered w-full"
          />
          {errors.expiryDate && (
            <p className="text-red-600 text-sm mt-1">
              {errors.expiryDate.message}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <input
            {...register("price", { required: "Price is required" })}
            type="number"
            placeholder="Price (৳)"
            className="input input-bordered w-full"
          />
          {errors.price && (
            <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Stock */}
        <div>
          <input
            {...register("stock", { required: "Stock is required" })}
            type="number"
            placeholder="Stock (pcs)"
            className="input input-bordered w-full"
          />
          {errors.stock && (
            <p className="text-red-600 text-sm mt-1">{errors.stock.message}</p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <input
            {...register("imageURL", { required: "Image URL is required" })}
            type="text"
            placeholder="Image URL"
            className="input input-bordered w-full"
          />
          {errors.imageURL && (
            <p className="text-red-600 text-sm mt-1">
              {errors.imageURL.message}
            </p>
          )}
        </div>

        {/* Discount */}
        <div>
          <input
            {...register("discount")}
            type="number"
            placeholder="Discount (%)"
            className="input input-bordered w-full"
          />
        </div>

        {/* Seller Email */}
        <div>
          <input
            {...register("sellerEmail", {
              required: "Seller email is required",
            })}
            type="email"
            placeholder="Seller Email"
            value={user?.email}
            className="input input-bordered w-full"
          />
          {errors.sellerEmail && (
            <p className="text-red-600 text-sm mt-1">
              {errors.sellerEmail.message}
            </p>
          )}
        </div>
        <div>
          <input
            {...register("sellerName", { required: "Seller Name is required" })}
            type="text"
            placeholder="Seller Name"
            value={user?.displayName}
            className="input input-bordered w-full"
          />
          {errors.sellerName && (
            <p className="text-red-600 text-sm mt-1">
              {errors.sellerName.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Description"
            className="textarea textarea-bordered w-full"
            rows="3"
          ></textarea>
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary md:col-span-2">
          Add Medicine
        </button>
      </form>
    </div>
  );
};

export default AddMedicineForm;
