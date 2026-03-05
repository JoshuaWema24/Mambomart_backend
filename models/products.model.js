const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },

    storeType: {
      type: String,
      enum: ["MINIMART", "PHONE_STORE"],
      required: true,
    },

    // Dynamic field
    unit: String,        
    storage: String,     
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);