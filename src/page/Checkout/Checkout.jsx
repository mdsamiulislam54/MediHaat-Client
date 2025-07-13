import { Link, useLocation } from "react-router";
import Button from "../../components/Button/Button";
import { IoIosArrowRoundBack } from "react-icons/io";
const Checkout = () => {
  const location = useLocation();
  const {
    selectedItems = [],
    totalPrice = 0,
    totalDiscount,
    quantities,
  } = location.state || {};
console.log(selectedItems)
  return (
    <div className="w-11/12 mx-auto py-10">
      <div>
      
        <h2 className="text-3xl font-semibold  mb-8">Checkout</h2>
      </div>

      {selectedItems.length === 0 ? (
        <p className="text-center text-gray-500">
          No items selected for checkout.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Order Summary */}
          <div className="bg-white  rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

            {/* Items List */}
            <div className="space-y-2">
              {selectedItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center py-1 "
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
                  <div className="text-center">
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

            {/* Order Summary */}
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

          {/* Right Column - Billing & Payment Details */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Billing Information</h3>

            {/* Shipping Details Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="input input-bordered w-full mt-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="input input-bordered w-full mt-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Address</label>
                <input
                  type="text"
                  placeholder="Enter your shipping address"
                  className="input input-bordered w-full mt-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">City</label>
                <input
                  type="text"
                  placeholder="Enter your city"
                  className="input input-bordered w-full mt-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Zip Code</label>
                <input
                  type="text"
                  placeholder="Enter your zip code"
                  className="input input-bordered w-full mt-2"
                />
              </div>
            </div>

            {/* Payment Options */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Payment Method</h3>
              <div className="space-y-4 mt-3">
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    name="payment"
                    id="credit-card"
                    className="radio radio-primary"
                  />
                  <label htmlFor="credit-card">Credit Card</label>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    name="payment"
                    id="paypal"
                    className="radio radio-primary"
                  />
                  <label htmlFor="paypal">PayPal</label>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    name="payment"
                    id="bank-transfer"
                    className="radio radio-primary"
                  />
                  <label htmlFor="bank-transfer">Bank Transfer</label>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <Button
              onClick={() => alert("Checkout successful!")}
              className="w-full py-3 mt-6 bg-green-600 text-white hover:bg-green-700 rounded-lg"
            >
              Complete Purchase
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
