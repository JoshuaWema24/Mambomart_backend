const express = require('express');
const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
        noOfItemsPurchased: { type: Number, required: true },
        totalAmount: { type: Number, required: true },
        dateOfPurchase: { type: Date, default: Date.now },
        paymentMethod: { type: String, required: true },
        VAT: { type: Number, required: true },
})
module.exports = mongoose.model('Sales', salesSchema);

