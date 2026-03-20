// routes/mpesaRoutes.js

const express = require("express");
const router = express.Router();

const { stkPush } = require("../config/mpesa");

// 📲 STK Push Route
router.post("/pay", async (req, res) => {
  try {
    const { phone, amount } = req.body;

    // 🔍 Basic validation
    if (!phone || !amount) {
      return res.status(400).json({
        error: "Phone and amount are required"
      });
    }

    // Format phone (ensure starts with 254)
    let formattedPhone = phone;
    if (phone.startsWith("0")) {
      formattedPhone = "254" + phone.substring(1);
    }

    const response = await stkPush({
      phone: formattedPhone,
      amount: amount,
      callbackUrl: "https://mambomart-backend.onrender.com/callback", // 🔁 change this
      accountReference: "Techlink",
      transactionDesc: "Service Payment"
    });

    res.json({
      message: "STK Push sent",
      data: response
    });

  } catch (error) {
    console.error("❌ Payment Error:", error.message);

    res.status(500).json({
      error: "Payment failed"
    });
  }
});


// 🔁 M-Pesa Callback URL
router.post("/callback", (req, res) => {
  try {
    console.log("📩 M-Pesa Callback Received:");
    console.log(JSON.stringify(req.body, null, 2));

    const callbackData = req.body.Body.stkCallback;

    if (callbackData.ResultCode === 0) {
      console.log("✅ Payment Successful");

      // Extract useful data
      const metadata = callbackData.CallbackMetadata?.Item || [];

      const amount = metadata.find(item => item.Name === "Amount")?.Value;
      const mpesaCode = metadata.find(item => item.Name === "MpesaReceiptNumber")?.Value;
      const phone = metadata.find(item => item.Name === "PhoneNumber")?.Value;

      console.log({
        amount,
        mpesaCode,
        phone
      });

      // 👉 TODO: Save to DB here

    } else {
      console.log("❌ Payment Failed:", callbackData.ResultDesc);
    }

    // IMPORTANT: Always respond with 200
    res.sendStatus(200);

  } catch (error) {
    console.error("❌ Callback Error:", error.message);
    res.sendStatus(200);
  }
});

module.exports = router;