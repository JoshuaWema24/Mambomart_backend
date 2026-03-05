//products controller
const express = require('express');
const Product = require('../models/products.model');

// create new product
exports.createProduct = async(req, res) => {
    try {
    const {
      name,
      sku,
      price,
      stock,
      storeType,
      unit,
      storage,
    } = req.body;

    if (!name || !sku || !price || !stock || !storeType) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existing = await Product.findOne({ sku });
    if (existing) {
      return res.status(409).json({ message: "SKU already exists" });
    }

    const product = new Product({
      name,
      sku,
      price,
      stock,
      storeType,
      unit: storeType === "MINIMART" ? unit : null,
      storage: storeType === "PHONE_STORE" ? storage : null,
    });

    await product.save();

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}


exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

//get product by id
exports.getProductById = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//update product
exports.updateProduct = async(req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//delete product
exports.deleteProduct = async(req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }   
}
