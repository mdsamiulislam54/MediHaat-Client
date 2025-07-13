import { Link, useLocation } from "react-router";
import Button from "../../components/Button/Button";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Payment from "../Payment/Payment";
import { UserAuth } from "../../hooks/userAuth/userAuth";
import Swal from "sweetalert2";

const Checkout = () => {
  const location = useLocation();
  const [isPayment, setPayment] = useState(false);
  const [data, setData] = useState({});
  const { user, role } = UserAuth();
  const {
    selectedItems = [],
    totalPrice = 0,
    totalDiscount,
    totalQuantity,
  } = location.state || {};

  const totalPay = (totalPrice - totalDiscount).toFixed(2);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!role.includes("user")) {
      Swal.fire({
        icon: "error",
        title: "You do not have permission to complete the purchase!",
      });
      return;
    }
    setData(data);
    setPayment(!isPayment);
  };
  const onClose = () => {
    setPayment(!isPayment);
  };

  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-3xl font-semibold mb-8">Checkout</h2>

      {selectedItems.length === 0 ? (
        <p className="text-center text-gray-500">
          No items selected for checkout.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Order Summary */}
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

            <div className="space-y-2">
              {selectedItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center py-1"
                >
                  <div className="flex items-center">
                    <img
                      src={item.imageURL}
                      alt={item.name}
                      className="h-10 w-10 object-contain mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        {item.genericName}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${item.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">
                      {item.discount}% off
                    </p>
                    <p className="font-bold">
                      $
                      {(
                        item.price -
                        (item.price * item.discount) / 100
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-primary pt-4">
              <div className="flex justify-between">
                <p className="text-lg">Total Price:</p>
                <p className="text-lg font-semibold">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-lg">Total Discount:</p>
                <p className="text-lg font-semibold">${totalDiscount}</p>
              </div>
              <div className="flex justify-between mt-4 border-t border-primary pt-4">
                <p className="text-xl font-semibold">Total Payable:</p>
                <p className="text-xl font-bold text-green-600">
                  ${(totalPrice - totalDiscount).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Billing & Payment */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Billing Information</h3>

            {/* Form */}
            <div className="space-y-4">
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

            {/* Payment Method */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Payment Method</h3>
              <div className="space-y-4 mt-3">
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    {...register("payment", {
                      required: "Select a payment method",
                    })}
                    value="Credit Card"
                    className="radio radio-primary"
                  />
                  <label>Credit Card</label>
                </div>

                {errors.payment && (
                  <p className="text-red-500 text-sm">
                    {errors.payment.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={!role.includes('user')}
              className={`w-full py-3 mt-6 bg-green-600  hover:bg-green-700 rounded-lg cursor-pointer ${!role.includes('user') ? 'bg-primary/20 text-red-800 hover:bg-primary/30':"text-white"} `}
            >
                {!role.includes('user') ? "Restricted (Purchase to only Customer)":"Complete Purchase"}
              
            </button>
          </div>
        </form>
      )}

      <AnimatePresence>
        {isPayment && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <Payment
              onClose={onClose}
              data={data}
              selectedItems={selectedItems}
              totalPay={totalPay}
              totalQuantity={totalQuantity}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Checkout;
