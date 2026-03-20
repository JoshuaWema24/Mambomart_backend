const express = require('express');
const mongoose = require('mongoose');

const suppliersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    companyName: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    productType:{
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Supplier", suppliersSchema);