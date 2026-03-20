const express = require('express');
const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    CompanyName: {
        type: String,
        required: true,
    },
    ContactName: {
        type: String,
        required: true,
    },
    ContactTitle: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Supplier', supplierSchema);