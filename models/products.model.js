const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
    trim: true
  },

  sku: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  barcode: {
    type: String,
    unique: true,
    sparse: true   
  },

  price: {
    type: Number,
    required: true,
    default: 0
  },

  stock: {
    type: Number,
    required: true,
    default: 0
  },

  storeType: {
    type: String,
    enum: ["MINIMART", "PHONE_STORE"],
    required: true
  },

  // Used only for minimart products
  unit: {
    type: String,
    default: null
  },

  // Used only for phone store products
  storage: {
    type: String,
    default: null
  },

  // Optional inventory alerts
  lowStockAlert: {
    type: Number,
    default: 5
  },

  // Track if product is active in the POS
  isActive: {
    type: Boolean,
    default: true
  }

},
{
  timestamps: true
});

module.exports = mongoose.model("Product", productSchema);