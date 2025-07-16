import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/axisonsecure/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import Button from "../../../components/Button/Button";
import Loader from "../../../components/Loader/Loader";
import Swal from "sweetalert2";
import uploadImageToCloudinary from "../../../hooks/profileImagesUpload/profileImagesUpload";
import ErrorPage from "../../ErrorPage/ErrorPage";

const ManageCategory = () => {
  const axiosSecure = useAxiosSecure();
  const [isOpenModal, setIsModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [updateImageFile, setUpdateImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [updatedData, setUpdatedData] = useState(false);
  const [updateImg, setUpdateImg] = useState("");
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(8);
  const totalPage = Math.ceil(count / perPage) || 0;
  const pageArray = [...Array(totalPage).keys()];

  const {
    data: category,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["categories", currentPage, perPage],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(
          `/category?limit=${perPage}&page=${currentPage}`
        );
        console.log(res)
        setCount(res?.data?.count)
        return res.data.result;
      } catch (error) {
        throw new Error(
          error?.response?.data?.message || "Error fetching categories"
        );
      }
    },
  });

  const handleAddCategory = async (e) => {
    e.preventDefault();

    try {
      setUploading(true);
      let imageUrl;
      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile);
      }

      const newCategory = {
        name: e.target.name.value,
        images: imageUrl,
        total: e.target.quantity.value || 0,
      };

      const res = await axiosSecure.post("/category", { newCategory });
      console.log(res);

      if (res.data) {
        Swal.fire("Success", "Category Added Successfully", "success");
        refetch();
        setIsModal(false);
        setCategoryName("");
        setImageFile(null);
      }
    } catch (err) {
      Swal.fire("Error", "Failed to add category", "error", error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    try {
      setUploading(true);

      let imageUrl;

      // only upload if new image selected
      if (updateImageFile) {
        imageUrl = await uploadImageToCloudinary(updateImageFile);
      }

      console.log(imageUrl);
      console.log(updateModal);

      const updatedCategory = {
        name: e.target.name.value || updatedData.name,
        images: imageUrl ? imageUrl : updatedData.images,
        quantity: e.target.quantity.value || updatedData.total,
      };

      console.log(updatedCategory);
      const res = await axiosSecure.patch(
        `/admin/category/${updatedData._id}`,
        {
          updatedCategory,
        }
      );
      console.log(res);
      if (res.data) {
        Swal.fire("Updated", "Category Updated Successfully", "success");
        refetch();
        setUpdateModal(false);
      }
    } catch (err) {
      Swal.fire("Error", "Failed to update category", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleted = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/admin/category/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Category has been deleted.", "success");
            refetch();
          } else {
            Swal.fire("Failed!", "Something went wrong.", "error");
          }
        } catch (error) {
          Swal.fire("Error!", error.message, "error");
        }
      }
    });
  };

  const handleUpdateModal = (cat) => {
    setUpdateModal(true);
    setUpdatedData(cat);
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorPage message={error.message} />;

  return (
    <div>
      <div className="flex justify-between items-center my-10 px-4">
        <p className="font-bold text-2xl">All Categories</p>
        <Button onClick={() => setIsModal(true)} children={"Add Category"} />
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Logo</th>
              <th>Name</th>
              <th>Total Medicine</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {category.map((cat) => (
              <tr key={cat._id}>
                <td>
                  <img src={cat.images} alt={cat.name} className="w-10 h-10" />
                </td>
                <td>{cat.name}</td>
                <td>{cat.total}</td>
                <td>
                  <button
                    onClick={() => handleUpdateModal(cat)}
                    className="btn btn-sm btn-primary"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleted(cat._id)}
                    className="btn btn-sm btn-warning"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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

      {/* Add Category Modal */}
      {isOpenModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] md:w-[400px] relative">
            <button
              onClick={() => setIsModal(false)}
              className="absolute top-2 right-3 text-xl"
            >
              ✖
            </button>
            <h3 className="text-xl font-bold mb-4">Add New Category</h3>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Category Name"
                className="input input-bordered w-full"
                required
              />
              <input
                type="number"
                name="quantity"
                placeholder="Total Quantity"
                className="input input-bordered w-full"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="file-input file-input-bordered w-full"
                required
              />
              <button
                type="submit"
                disabled={uploading}
                className="btn btn-primary w-full"
              >
                {uploading ? "Uploading..." : "Add Category"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Update Category Modal */}
      {updateModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] md:w-[400px] relative">
            <button
              onClick={() => setUpdateModal(null)}
              className="absolute top-2 right-3 text-xl"
            >
              ✖
            </button>
            <h3 className="text-xl font-bold mb-4">Update Category</h3>
            <form onSubmit={handleUpdateCategory} className="space-y-4">
              <input
                type="text"
                name="name"
                defaultValue={updatedData.name}
                placeholder="Category Name"
                className="input input-bordered w-full"
              />
              <input
                type="number"
                name="quantity"
                defaultChecked={updatedData.total}
                placeholder="total quantity"
                className="input input-bordered w-full"
              />
              <input
                type="file"
                accept="image/*"
                defaultValue={updatedData.image}
                onChange={(e) => setUpdateImageFile(e.target.files[0])}
                className="file-input file-input-bordered w-full"
              />
              <button
                type="submit"
                disabled={uploading}
                className="btn btn-primary w-full"
              >
                {uploading ? "Updating..." : "Update Category"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategory;
