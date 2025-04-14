import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Payment = () => {
  const payment = useSelector((store) => store.cartData.payment);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    const res = await fetch("http://localhost:5000/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: payment }), 
    });

    const data = await res.json();

    const options = {
      key: process.env.REACT_APP_RAZOR_ID, // make sure this is in .env
      amount: payment,
      currency: "INR",
      name: `Etosa Food's`,
      description: "Payment for food",
      image: "https://i.ibb.co/gFmhw6F/delicious-burgers-removebg-preview.png",
      order_id: data.orderId,
      handler: function (response) {
        alert(`Payment ID: ${response.razorpay_payment_id}`);
        alert(`Order ID: ${response.razorpay_order_id}`);
        alert(`Signature: ${response.razorpay_signature}`);
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

//  add payment gateway new window every time...
    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
    });
    rzp1.open();
  };

//

  return (
    <div className="flex justify-center mt-10">
      <button
        onClick={handlePayment}
        className="px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-200"
      >
        Pay ₹{payment}
      </button>
    </div>
  );
};

export default Payment;
