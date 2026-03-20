const express = require('express');
const mongoose = require('mongoose');
const Supplier = require('../models/suppliers.model');

// create a new supplier
exports.createSupplier = async (req, res) => {
    try {
        const { CompanyName, ContactName, ContactTitle, phone, email } = req.body;

        // Validate required fields
        if (!CompanyName || !ContactName || !phone || !email) {
            return res.status(400).json({ message: 'CompanyName, ContactName, phone, and email are required' });
        }
        const newSupplier = new Supplier({
            CompanyName,
            ContactName,
            ContactTitle,
            phone,
            email
        });
        await newSupplier.save();
        res.status(201).json({ message: 'Supplier created successfully', supplier: newSupplier });
    } catch (error) {
     res.status(500).json({ message: 'Server error', error: error.message});   
    }
}
 exports.getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

exports.getSupplierById = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.status(200).json(supplier);
    }
    catch (error) {      
         res.status(500).json({ message: 'Server error', error: error.message });
    } 
}

exports.updateSupplier = async (req, res) => {
    try {
        const { CompanyName, ContactName, ContactTitle, phone, email } = req.body;
        const updatedSupplier = await Supplier.findByIdAndUpdate(
            req.params.id,
            { CompanyName, ContactName, ContactTitle, phone, email },
            { new: true }
        );
        if (!updatedSupplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.status(200).json({ message: 'Supplier updated successfully', supplier: updatedSupplier });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

exports.deleteSupplier = async (req, res) => {
    try {
        const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
        if (!deletedSupplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.status(200).json({ message: 'Supplier deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
