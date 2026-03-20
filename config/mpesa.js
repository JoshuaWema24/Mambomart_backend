// config/mpesa.js

const axios = require("axios");

// Load environment variables
require("dotenv").config();

// Base URL (sandbox)
const baseURL = "https://sandbox.safaricom.co.ke";

// Credentials (store these in .env)
const consumerKey = process.env.MPESA_CONSUMER_KEY;
const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
const shortcode = process.env.MPESA_SHORTCODE;
const passkey = process.env.MPESA_PASSKEY;

// 🔐 Generate Access Token
const getAccessToken = async () => {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

  try {
    const response = await axios.get(
      `${baseURL}/oauth/v1/generate?grant_type=client_credentials`,
      {
        headers: {
          Authorization: `Basic ${auth}`
        }
      }
    );

    return response.data.access_token;

  } catch (error) {
    console.error("❌ Error getting access token:",
      error.response?.data || error.message
    );
    throw new Error("Failed to generate access token");
  }
};

// ⏱ Generate Timestamp (YYYYMMDDHHMMSS)
const getTimestamp = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

// 🔑 Generate Password (Base64 encoded)
const getPassword = (timestamp) => {
  return Buffer.from(shortcode + passkey + timestamp).toString("base64");
};

// 💳 STK Push Function (Reusable)
const stkPush = async ({ phone, amount, callbackUrl, accountReference, transactionDesc }) => {
  try {
    const token = await getAccessToken();
    const timestamp = getTimestamp();
    const password = getPassword(timestamp);

    const response = await axios.post(
      `${baseURL}/mpesa/stkpush/v1/processrequest`,
      {
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: shortcode,
        PhoneNumber: phone,
        CallBackURL: callbackUrl,
        AccountReference: accountReference || "Techlink",
        TransactionDesc: transactionDesc || "Payment"
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error("❌ STK Push Error:",
      error.response?.data || error.message
    );
    throw new Error("STK Push failed");
  }
};

module.exports = {
  getAccessToken,
  stkPush
};