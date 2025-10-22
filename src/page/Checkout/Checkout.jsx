import { Link, useLoaderData, useLocation, useNavigate } from "react-router";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Payment from "../Payment/Payment";
import { UserAuth } from "../../hooks/userAuth/userAuth";
import Swal from "sweetalert2";
import axiosSecure from "../../hooks/axisonsecure/axiosSecure";
import useAxiosSecure from "../../hooks/axisonsecure/axiosSecure";
import PageTitle from "../../components/PageTitle/PageTitle";
import { address } from "framer-motion/client";


const Checkout = () => {

  const [isPayment, setPayment] = useState(false);
  const [data, setData] = useState({});
  const { user, role } = UserAuth();
  const axisonsecure = useAxiosSecure()
  const navigate = useNavigate();
  const checkOutData = useLoaderData()
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCreateOrder = async (paymentMethod, formData) => {
    try {
      const orderDetails = {
        customerName: formData.name,
        email: formData.email,
        address:formData.address,
        zip:formData.zip,
        city: formData.city,
        totalAmount:
        checkOutData.price - (checkOutData.price * checkOutData.discount) / 100,
        orderStatus: "pending",
        paymentMethod,
        payStatus: paymentMethod === "cod" ? "pending" : "paid",
        paymentIntentId: `${formData.name}${new Date().toLocaleDateString()}`,
        totalQuantity: 1,
        products: {
          id: checkOutData._id,
          image: checkOutData.image,
          name: checkOutData.name,
          price: checkOutData.price,
          discount: checkOutData.discount,
          category: checkOutData.category,
          
        },
      };
      console.log('order', orderDetails)
      const res = await axisonsecure.post("/order-history", orderDetails);
      if (res.data) {
        Swal.fire("Order Placed!", "Your order has been created.", "success");
        navigate("/order-success", { state: orderDetails });
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to place order", "error");
    }
  };


  const onSubmit = (data) => {
    if (!role.includes("user")) {
      Swal.fire({
        icon: "error",
        title: "You do not have permission to complete the purchase!",
      });
      return;
    }

    if (data.payment === "stripe") {
      setData(data);
      setPayment(true);
    }
    else if (data.payment === "cod") {
      handleCreateOrder("cod", data);

    }


  };

  const onClose = () => {
    setPayment(!isPayment);
  };
  const price = checkOutData.price;
  const discount = checkOutData.discount;
  const afterDiscount = price - (price * discount) / 100;
  const totalPay = afterDiscount * quantity;
  const paymentData = {
    data: checkOutData,
    productId: checkOutData._id,
    name: checkOutData.name,
    image: checkOutData.image,
    quantity,
    price,
    discount,
    afterDiscount,
    totalPay,
    formData: data,
    customer: {
      name: user?.displayName,
      email: user?.email,
    },
  };


  return (
    <div className=" py-10 bg-gray-100">
      <div className="custom-container">
        <PageTitle title={'Checkout'} />
        <h2 className="text-3xl font-semibold mb-8">Checkout</h2>

        {checkOutData === null ? (
          <p className="text-center text-gray-500">
            No items selected for checkout.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Billing & Payment */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Billing Information</h3>

              {/* Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">Full Name</label>
                    <input
                      type="text"
                      {...register("name", { required: "Full Name is required" })}
                      placeholder="Enter your full name"
                      value={user?.displayName}
                      className="input input-bordered w-full mt-2"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      {...register("email", { required: "Email is required" })}
                      placeholder="Enter your email"
                      value={user?.email}
                      className="input input-bordered w-full mt-2"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium">Address</label>
                  <input
                    type="text"
                    {...register("address", { required: "Address is required" })}
                    placeholder="Enter your address"
                    className="input input-bordered w-full mt-2"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">City</label>
                    <input
                      type="text"
                      {...register("city", { required: "City is required" })}
                      placeholder="Enter your city"
                      className="input input-bordered w-full mt-2"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm">{errors.city.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Zip Code</label>
                    <input
                      type="text"
                      {...register("zip", { required: "Zip Code is required" })}
                      placeholder="Enter your zip code"
                      className="input input-bordered w-full mt-2"
                    />
                    {errors.zip && (
                      <p className="text-red-500 text-sm">{errors.zip.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold">Payment Method</h3>
                <div className=" flex items-center gap-8 mt-4 ">
                  {/* Credit Card */}
                  <div className="flex items-center space-x-4">
                    <input
                      type="radio"
                      {...register("payment", {
                        required: "Select a payment method",
                      })}
                      value="stripe"
                      className="radio radio-primary"
                    />
                    <label>Credit Card (Stripe)</label>
                  </div>

                  {/* Cash On Delivery */}
                  <div className="flex items-center space-x-4">
                    <input
                      type="radio"
                      {...register("payment", {
                        required: "Select a payment method",
                      })}
                      value="cod"
                      className="radio radio-primary"
                    />
                    <label>Cash on Delivery</label>
                  </div>

                  {/* Error Message */}
                  {errors.payment && (
                    <p className="text-red-500 text-sm">
                      {errors.payment.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={!role.includes("user")}
                className={`w-full py-3 mt-6 bg-green-600  hover:bg-green-700 rounded-lg cursor-pointer ${!role.includes("user")
                  ? "bg-primary/20 text-red-800 hover:bg-primary/30"
                  : "text-white"
                  } `}
              >
                {!role.includes("user")
                  ? "Restricted (Purchase to only Customer)"
                  : "Complete Purchase"}
              </button>
            </div>
            {/* Order Summary */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

              <div className="space-y-2">
                <div className="flex justify-between items-center py-1">
                  <div className="flex items-center">
                    <img
                      src={checkOutData.image}
                      alt={checkOutData.name}
                      className="h-20 w-20 object-contain mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{checkOutData.name}</h4>
                      <p className="text-sm text-gray-500">{checkOutData.genericName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${afterDiscount.toFixed(2)}</p>
                  </div>
                </div>

                {/* Quantity System */}
                <div className="flex items-center justify-between mt-3">
                  <p className="text-lg font-medium">Quantity:</p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleDecrease}
                      className="px-3 py-1 bg-gray-200 rounded-md"
                    >-</button>
                    <span className="font-semibold">{quantity}</span>
                    <button
                      type="button"
                      onClick={handleIncrease}
                      className="px-3 py-1 bg-gray-200 rounded-md"
                    >+</button>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-primary pt-4">
                <div className="flex justify-between">
                  <p className="text-lg">Price:</p>
                  <p className="text-lg font-semibold">${price.toFixed(2)}</p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-lg">Discount:</p>
                  <p className="text-lg font-semibold">{discount}%</p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-lg">After Discount:</p>
                  <p className="text-lg font-semibold">${afterDiscount.toFixed(2)}</p>
                </div>
                <div className="flex justify-between mt-4 border-t border-primary pt-4">
                  <p className="text-xl font-semibold">Total Payable:</p>
                  <p className="text-xl font-bold text-green-600">
                    ${totalPay.toFixed(2)}
                  </p>
                </div>
              </div>


            </div>


          </form>
        )}

        <AnimatePresence>
          {isPayment && (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
              <Payment
                onClose={onClose}
                data={data}
                paymentData={paymentData}
              />
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Checkout;
