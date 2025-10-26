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
import { useNavigate } from "react-router";

const CheckoutForm = ({ paymentData }) => {
  const { totalPay, data, formData
  } = paymentData;
  console.log(paymentData)
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [cardError, setCardError] = useState("");

  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    if (!card) return;

    try {
      setLoading(true);


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
          customerName: formData.name,
          email: formData.email,
          address: formData.address,
          zip: formData.zip,
          city: formData.city,
          totalAmount:
            data.price - (data.price * data.discount) / 100,
          orderStatus: "pending",
          paymentMethod: "card",
          payStatus: "paid",
          paymentIntentId: `${formData.name}${new Date().toLocaleDateString()}`,
          totalQuantity: 1,
          products: {
            id: data._id,
            image: data.image,
            name: data.name,
            price: data.price,
            discount: data.discount,
            category: data.category,
          },
        };

        console.log("formData", orderDetails)

        await axiosSecure.post("/order-history", orderDetails);

        Swal.close();
        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: `Transaction ID: ${paymentIntent.id}`,
          confirmButtonText: "OK",
        });

        navigate("/order-success", { state: orderDetails });
      }
    } catch (err) {
      setError(err.message);
      Swal.close();
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <div className="flex datas-center gap-3 my-3 justify-center">
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
              onChange={(event) => {
                if (event.error) {
                  setCardError(event.error.message);
                } else {
                  setCardError("");
                }
              }}
            />
          </div>
        </div>
        {cardError && (
          <p className="text-red-500 text-sm text-center">{cardError}</p>
        )}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={!stripe}
          className="btn btn-primary w-full"
        >
          {loading ? `Processing Pay $ ${totalPay}...` : `Pay ৳ ${totalPay}`}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
