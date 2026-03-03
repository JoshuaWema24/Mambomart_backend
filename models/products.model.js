const express = require('express');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    category: { type: String, required: true },
    sellingPrice: { type: Number, required: true },
    unit: { type: String,  default: 'pcs'},
    suppliersName: { type: String, required: true },
    barcode: { type: String, required: true },
    costPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    dateAdded: { type: Date, default: Date.now }
});
 module.exports = mongoose.model('Product', productSchema);
