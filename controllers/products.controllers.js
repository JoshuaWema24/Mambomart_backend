
const express = require('express');
const Product = require('../models/products.model');

// create new product
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      sku,
      barcode,
      price,
      stock,
      storeType,
      unit,
      storage,
      lowStockAlert
    } = req.body;

    // Validate required fields
    if (!name || !sku || !price || !stock || !storeType) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Check if SKU exists
    const existingSKU = await Product.findOne({ sku });
    if (existingSKU) {
      return res.status(409).json({
        success: false,
        message: "SKU already exists",
      });
    }

    // Check barcode if provided
    if (barcode) {
      const existingBarcode = await Product.findOne({ barcode });
      if (existingBarcode) {
        return res.status(409).json({
          success: false,
          message: "Barcode already exists",
        });
      }
    }

    const product = new Product({
      name,
      sku,
      barcode,
      price: Number(price),
      stock: Number(stock),
      storeType,
      unit: storeType === "MINIMART" ? unit : null,
      storage: storeType === "PHONE_STORE" ? storage : null,
      lowStockAlert: lowStockAlert ? Number(lowStockAlert) : 5,
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });

  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server error while creating product",
    });
  }
};



// GET ALL PRODUCTS

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true })
      .sort({ createdAt: -1 });

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



// ===============================
// GET PRODUCT BY ID
// ===============================
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};




// UPDATE PRODUCT

exports.updateProduct = async (req, res) => {
  try {
    const {
      name,
      sku,
      barcode,
      price,
      stock,
      storeType,
      unit,
      storage,
      lowStockAlert,
      isActive
    } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        sku,
        barcode,
        price: Number(price),
        stock: Number(stock),
        storeType,
        unit: storeType === "MINIMART" ? unit : null,
        storage: storeType === "PHONE_STORE" ? storage : null,
        lowStockAlert,
        isActive
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });

  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
};




// DELETE PRODUCT 

exports.deleteProduct = async (req, res) => {
  try {

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};
