const express = require('express');
const mongoose = require('mongoose');
const Supplier = require('../models/suppliers.model');


// create new supplier
exports.createSupplier = async (req, res) => {
  try {
    const { name, companyName, phone, email, productType } = req.body;

    // Validate required fields
    if (!name || !companyName || !phone || !email || !productType) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const supplier = new Supplier({
      name,
      companyName,
      phone,
      email,
      productType,
    });

    await supplier.save();

    // Send response first
    res.status(201).json({ message: "Supplier created successfully", supplier });

    // Emit socket event AFTER sending response
    if (io) {
      io.emit("supplierCreated", supplier);
    }

  } catch (error) {
    // Check if headers already sent to avoid double response
    if (!res.headersSent) {
      return res.status(500).json({
        message: "Error while creating supplier",
        error: error.message,
      });
    } else {
      console.error("Error after response sent:", error);
    }
  }
};

// get all suppliers
exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ message: "Error while fetching suppliers", error: error.message });
    }   
}

// get supplier by id
exports.getSupplierById = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        res.json(supplier);
    } catch (error) {
        res.status(500).json({ message: "Error while fetching supplier", error: error.message });
    }
}

// update supplier
exports.updateSupplier = async (req, res) => {
    try {
        const { name, companyName, phone, email, productType } = req.body;  
        const supplier = await Supplier.findByIdAndUpdate(
            req.params.id,
            { name, companyName, phone, email, productType },
            { new: true }
        );
        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        res.json({ message: "Supplier updated successfully", supplier });
        io.emit("supplierUpdated", supplier);
    } catch (error) {
        res.status(500).json({ message: "Error while updating supplier", error: error.message });
    }
}

// delete supplier
exports.deleteSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findByIdAndDelete(req.params.id);
        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        res.json({ message: "Supplier deleted successfully" });
        io.emit("supplierDeleted", supplier._id);
    } catch (error) {
        res.status(500).json({ message: "Error while deleting supplier", error: error.message });
    }
}