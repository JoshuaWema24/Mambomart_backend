const express = require('express');
const mongoose = require ('mongoose');
const PhoneStoreItem = require('../models/phonestore.model');

exports.createPhoneStoreItem = async (req, res) => {
    try {
        const { name, category, price, sku, stock, storage } = req.body;
        const newPhoneStoreItem = new PhoneStoreItem({
            name,
            category,
            price,
            sku,
            stock,
            storage
        });
        const savedItem = await newPhoneStoreItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllPhoneStoreItems = async (req, res) => {
    try {
        const items = await PhoneStoreItem.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getPhoneStoreItemBySku = async (req, res) => {
    try {
        const { sku } = req.params;
        const item = await PhoneStoreItem.findOne({ sku });
        if (!item) {
            return res.status(404).json({ message: 'Phone Store item not found' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updatePhoneStoreItemBySku = async (req, res) => {
    try {
        const { sku } = req.params;
        const { name, category, price, stock, storage } = req.body;
        const updatedItem = await PhoneStoreItem.findOneAndUpdate
        (
            { sku },
            { name, category, price, stock, storage },
            { new: true }
        );
        if (!updatedItem) {
            return res.status(404).json({ message: 'Phone Store item not found' });
        }
        res.status(200).json(updatedItem);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deletePhoneStoreItemBySku = async (req, res) => {
    try {
        const { sku } = req.params;
        const deletedItem = await PhoneStoreItem.findOneAndDelete({ sku });
        if (!deletedItem) {
            return res.status(404).json({ message: 'Phone Store item not found' });
        }
        res.status(200).json({ message: 'Phone Store item deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.createPhoneStoreItem = async (req, res) => {
    try {
        const { name, category, price, sku, stock, storage } = req.body;
        const newPhoneStoreItem = new PhoneStoreItem({
            name,
            category,
            price,  
            sku,
            stock,
            storage
        });
        const savedPhoneStoreItem = await newPhoneStoreItem.save();
        res.status(201).json(savedPhoneStoreItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.createPhoneStoreItem = async (req, res) => {
    try {
        const { name, category, price, sku, stock, storage } = req.body;
        const newPhoneStoreItem = new PhoneStoreItem({
            name,
            category,
            price,
            sku,
            stock,
            storage,
        });
        const savedPhoneStoreItem = await newPhoneStoreItem.save();
        res.status(201).json(savedPhoneStoreItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


