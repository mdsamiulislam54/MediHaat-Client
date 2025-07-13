import { loadStripe } from "@stripe/stripe-js";
import CheckoutFrom from "../CheckoutFrom/CheckoutFrom";
import { Elements } from "@stripe/react-stripe-js";
import { FaWindowClose } from "react-icons/fa";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Payment = ({ onClose, data,selectedItems,totalPay ,totalQuantity}) => {
  return (
    <div className="bg-white p-6 w-[400px] rounded-2xl">
      <div className="flex justify-end">
        <button onClick={onClose}><FaWindowClose className="text-xl hover:text-primary cursor-pointer"/></button>
      </div>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutFrom data={data} selectedItems={selectedItems} totalPay={totalPay} totalQuantity={totalQuantity}/>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
