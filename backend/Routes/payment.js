const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
require('dotenv').config();
const crypto = require("crypto");

router.post('/create/order', async (req, res) => {
    try {
        const razorpayInstance = new Razorpay({
            key_id: process.env.SECRET_ID,
            key_secret: process.env.KEY_SECRET
        });

        const { amount } = req.body;

        // Create Razorpay order
        const order = await razorpayInstance.orders.create({
            amount: amount * 100, // amount in the smallest currency unit
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex")
        });

        // Return the created order
        res.status(200).json({ order });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error creating Razorpay order:", error);

        // Return a meaningful error response to the client
        res.status(500).json({status:500, message: "Internal Server Error", error: error.message });
    }
});

router.post("/verify", async (req, res) => {
    try {
        const { razorpay_orderID, razorpay_paymentID, razorpay_signature } = req.body;

        const sign = razorpay_orderID + "|" + razorpay_paymentID;
        const resultSign = crypto
            .createHmac("sha256", process.env.KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === resultSign) {
            return res.status(200).json({ message: "Payment verified successfully", status: 200 });
        } else {
            // Return an error response if signature verification fails
            res.status(400).json({ message: "Invalid Signature" });
        }
    } catch (error) {
        console.error("Error verifying Razorpay payment:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

router.get("/getkey", async (req, res) => {
    // Return Razorpay key
    res.json({ key: process.env.SECRET_ID });
});


module.exports = router;
