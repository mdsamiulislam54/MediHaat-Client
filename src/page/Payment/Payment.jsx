import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { FaWindowClose } from "react-icons/fa";
import CheckoutFrom from "../CheckoutFrom/CheckoutFrom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Payment = ({ onClose, paymentData }) => {


  return (
    <div className="bg-white p-6 w-[400px] rounded-2xl relative shadow-lg">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-600 hover:text-red-600 transition"
      >
        <FaWindowClose className="text-2xl" />
      </button>

    

      {/* Stripe Checkout Form */}
      <Elements stripe={stripePromise}>
        <CheckoutFrom paymentData={paymentData} />
      </Elements>
    </div>
  );
};

export default Payment;
