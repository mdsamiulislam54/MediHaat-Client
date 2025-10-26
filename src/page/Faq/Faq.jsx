import React from "react";

const faqData = [
  {
    question: "How do I create and verify my account?",
    answer: (
      <>
        <p>
          Click <strong>Sign Up</strong> (top-right) and provide your name, email/phone, and a strong password.
          We recommend at least 8 characters with a mix of letters and numbers.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>We’ll send a one-time code (OTP) to your email/phone for verification.</li>
          <li>After verification, you can save addresses, view order history, and reorder fast.</li>
          <li>Forgot password? Use <strong>Forgot Password</strong> to reset via email/OTP.</li>
        </ul>
      </>
    ),
  },
  {
    question: "How do I order prescription medicines online?",
    answer: (
      <>
        <p>
          Add the medicine to cart and upload a clear photo or PDF of your valid doctor’s prescription at checkout.
          Our licensed pharmacist will review before dispatch.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Accepted files: <strong>JPG/PNG/PDF</strong> (clear, readable, full page).</li>
          <li>Review usually completes within a few hours during working hours.</li>
          <li>If your prescription doesn’t match the item or quantity, we’ll contact you to adjust the order.</li>
          <li>Some controlled medicines may not be sold online due to regulations.</li>
        </ul>
      </>
    ),
  },
  {
    question: "What are your delivery timelines, areas, and packaging standards?",
    answer: (
      <>
        <p>
          We aim for fast, reliable delivery with safe packaging—especially for temperature-sensitive items.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Inside city:</strong> typically same-day or next-day based on order time and stock.</li>
          <li><strong>Outside city:</strong> typically 2–3 business days.</li>
          <li><strong>Tracking:</strong> You’ll receive a tracking link/SMS after dispatch.</li>
          <li><strong>Cold-chain items:</strong> Packed with insulation/gel packs where required.</li>
          <li><strong>Shipping fees:</strong> Shown at checkout; free delivery may apply over a certain order amount.</li>
        </ul>
      </>
    ),
  },
  {
    question: "Which payment methods do you support and how secure are they?",
    answer: (
      <>
        <p>
          We support popular methods and keep transactions secure with industry-standard protection.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Methods:</strong> Cash on Delivery, cards (Visa/Mastercard), and mobile wallets (bKash, Nagad).</li>
          <li><strong>Security:</strong> SSL encryption; card payments use bank-grade gateways and 3-D Secure where available.</li>
          <li><strong>Refunds:</strong> Mobile wallet refunds usually 1–3 business days; card refunds depend on your bank (often 5–10 business days).</li>
          <li>Every order includes a downloadable invoice from your account or email.</li>
        </ul>
      </>
    ),
  },
  {
    question: "What is your return, replacement, and cancellation policy?",
    answer: (
      <>
        <p>
          For safety and compliance, returns are limited, but we’ll make it right for damaged or wrong items.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Prescription medicines:</strong> Generally non-returnable except if delivered damaged/incorrect (report within 24 hours with photos).</li>
          <li><strong>Non-medicine items:</strong> Eligible for return/exchange if unopened and in original condition (usually within 3 days of delivery).</li>
          <li><strong>Cancellations:</strong> Allowed before dispatch; after dispatch, please contact support for assistance.</li>
          <li>To initiate: Go to <strong>Orders → Help</strong>, or contact live chat/helpline with your order ID.</li>
        </ul>
      </>
    ),
  },
 
];

const Faq = () => {
  return (
    <div className=" my-10 px-4 font-rubik">

      <div className="custom-container ">
        <h2 className="text-3xl font-syne font-bold  max-md:text-center  lg:mb-8 mb-16">Frequently Asked Questions</h2>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-3  max-lg:order-2">
            {faqData.map((item, index) => (
              <div key={index} className="collapse collapse-plus bg-base-100 border border-base-300">
                {/* Single-open accordion; change to checkbox for multi-open */}
                <input type="radio" name="faq-accordion" defaultChecked={index === 0} />
                <div className="collapse-title font-syne font-semibold">{item.question}</div>
                <div className="collapse-content text-sm space-y-3">{item.answer}</div>
              </div>
            ))}
          </div>
          <div className="relative max-lg:order-1">
            <img src="https://i.postimg.cc/bJFNBxf1/faq.png" alt="faq question images" 
            className="w-full h-full relative z-100"
            />

            <div className="absolute top-0 left-[50%] translate-x-[-50%] w-[70%]  h-full bg-gradient-to-br to-primary from-accent rounded-full blur-2xl">

            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
