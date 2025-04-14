require('dotenv').config();

const express = require("express");
const Razorpay = require("razorpay");
const app = express();
const cors = require("cors");


app.use(express.json());
app.use(cors());

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZOR_ID,
  key_secret: process.env.RAZOR_KEY,
});

// Create order route
app.post("/create-order", async (req, res) => {
  const { amount } = req.body; // Amount in paise (1 INR = 100 paise)

  try {
    const orderOptions = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Math.random() * 1000000}`,
    };

    const order = await razorpayInstance.orders.create(orderOptions);
    res.json({ orderId: order.id });
  } catch (error) {
    res.status(500).send("Error creating Razorpay order");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
