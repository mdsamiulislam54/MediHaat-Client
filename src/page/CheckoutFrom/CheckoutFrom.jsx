import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../hooks/axisonsecure/axiosSecure";
import Swal from "sweetalert2";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmex,
  FaMoneyCheckAlt,
} from "react-icons/fa";

const CheckoutForm = ({ data, selectedItems, totalPay, totalQuantity }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    if (!card) return;

    try {
      setLoading(true);

      Swal.fire({
        title: "Processing Payment...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      // PaymentIntent create
      const res = await axiosSecure.post("/create-payment-intent", {
        amount: totalPay,
      });
      const clientSecret = res.data.clientSecret;

      // Confirm payment
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: data.name,
              email: data.email,
              address: {
                line1: data.address,
                city: data.city,
                postal_code: data.zip,
              },
            },
          },
        });

      if (confirmError) {
        Swal.close();
        return Swal.fire({
          icon: "error",
          title: "Payment Failed!",
          text: confirmError.message,
        });
      }

      if (paymentIntent.status === "succeeded") {
        // order details create
        const orderDetails = {
          customerName: data.name,
          email: data.email,
          totalAmount: totalPay,
          orderStatus: "pending",
          payStatus: "paid",
          paymentIntentId: paymentIntent.id,
          totalQuantity: totalQuantity,
          products: selectedItems.map((item) => ({
            id: item._id,
            images: item.imageURL,

            company: item.manufacturer,
            name: item.name,
            price: item.price,
            discount: item.discount,
            sellerEmail: item.sellerEmail,
            sellerName: item.sellerName,
            quantity: item.quantity,
            medicineType: item.medicineType,
            expiryDate: item.expiryDate,
            category: item.category,
            afterDiscount: item.price - (item.price * item.discount) / 100,
          })),
        };

        console.log(orderDetails);
        await axiosSecure.post("/order-history", orderDetails);

        Swal.close();
        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: `Transaction ID: ${paymentIntent.id}`,
          confirmButtonText: "OK",
        });

        // Optional: navigate('/order-success')
      }
    } catch (err) {
      console.error(err);
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: err.message || "Payment attempt failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  console.log(totalQuantity);

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <div className="flex items-center gap-3 my-3 justify-center">

            <FaCcVisa className="text-3xl text-blue-600" />
            <FaCcMastercard className="text-3xl text-red-600" />
            <FaCcPaypal className="text-3xl text-blue-800" />
            <FaCcAmex className="text-3xl text-indigo-600" />
            <FaMoneyCheckAlt className="text-3xl text-green-600" />
          </div>
          <div className="border border-primary p-3 rounded-md bg-gray-50">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#333",
                    "::placeholder": {
                      color: "#888",
                    },
                  },
                  invalid: {
                    color: "red",
                  },
                },
              }}
            />
          </div>
        </div>
        {error && <p className="text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={!stripe}
          className="btn btn-primary w-full"
        >
          {loading ? `Processing Pay $ ${totalPay}...` : `Pay $${totalPay}`}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
