import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { FaCheckCircle } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import Logo from "../../components/Logo/Logo";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state;

  const contentRef = useRef();
  const handlePrint = useReactToPrint({ contentRef });

  if (!orderDetails) {
    return (
      <div className="w-11/12 mx-auto py-10 text-center text-gray-500">
        No order details found.
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto py-16 flex flex-col items-center text-gray-800">
      <FaCheckCircle className="text-green-600 text-7xl mb-4" />
      <h2 className="text-3xl font-semibold mb-2">Payment Successful!</h2>
      <p className="text-gray-600 mb-8">Thank you for your purchase.</p>

      {/* Invoice Section */}
      <div
        ref={contentRef}
        className="bg-white border-2 border-dotted p-8 w-full max-w-3xl rounded-lg"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-dotted border-primary pb-4 mb-4">
          <div className="flex items-center space-x-3">
            <div>
              <Logo color="text-primary" />
              <p className="text-sm text-gray-500">info@gmail.com</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Invoice</h3>
            <p className="text-sm">#{orderDetails.paymentIntentId}</p>
            <p> Date: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-lg font-semibold mb-2">Customer Info</h4>
            <h4 className="font-bold">Pay Status : <span className="text-primary">{orderDetails.payStatus}</span></h4>
          </div>
          <div className="grid grid-cols-2">
            <p>
              <strong>Name:</strong> {orderDetails.customerName}
            </p>
            <p>
              <strong>Email:</strong> {orderDetails.email}
            </p>
            <p>
              <strong>Total Paid:</strong> ${orderDetails.totalAmount}
            </p>
            <p>
              <strong>Total Products:</strong> {orderDetails.totalQuantity}
            </p>
          </div>
        </div>

        {/* Product List */}
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Medicine</h4>
          {orderDetails.products.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-t-2 border-dotted border-primary  py-2"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={item.images}
                  alt={item.name}
                  className="w-12 h-12 rounded object-contain"
                />
                <div className="grid grid-cols-2">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">#{item.id}</p>
                  <p className="text-sm">Category: {item.category}</p>
                  <p className="text-sm">Seller: {item.sellerName}</p>
                </div>
              </div>
              <div>
                <p className="font-semibold">
                  ${item.afterDiscount.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <div className="mt-6 text-right">
        <button
          onClick={handlePrint}
          className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Print Invoice
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
