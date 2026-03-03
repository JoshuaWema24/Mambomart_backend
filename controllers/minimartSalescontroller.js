const express = require('express');
const Sales = require('../models/minimartSales.model');

// create new sales record
exports.createSalesRecord = async(req, res) => {
    try {
        const { noOfItemsPurchased, totalAmount, paymentMethod, VAT } = req.body;
        const newSalesRecord = new Sales({
            noOfItemsPurchased,
            totalAmount,
            paymentMethod,
            VAT
        });
        const savedSalesRecord = await newSalesRecord.save();
        res.status(201).json(savedSalesRecord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//get all sales records
exports.getAllSalesRecords = async(req, res) => {
    try {
        const salesRecords = await Sales.find();
        res.status(200).json(salesRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//get sales record by id
exports.getSalesRecordById = async(req, res) => {
    try {
        const salesRecord = await Sales.findById(req.params.id);
        if (!salesRecord) {
            return res.status(404).json({ message: 'Sales record not found' });
        }
        res.status(200).json(salesRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//update sales record
exports.updateSalesRecord = async(req, res) => {
    try {
        const updatedSalesRecord = await Sales.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSalesRecord) {
            return res.status(404).json({ message: 'Sales record not found' });
        }
        res.status(200).json(updatedSalesRecord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//delete sales record
exports.deleteSalesRecord = async(req, res) => {
    try {
        const deletedSalesRecord = await Sales.findByIdAndDelete(req.params.id);
        if (!deletedSalesRecord) {
            return res.status(404).json({ message: 'Sales record not found' });
        }
        res.status(200).json({ message: 'Sales record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}