const express = require('express');
const proApp = express.Router();
require('dotenv').config();
const expressAsyncHandler = require('express-async-handler');
const verifyToken = require('../middleware/tokenVerify');

// Get all products
proApp.get('/products', expressAsyncHandler(async (req, res) => {
    const proCollec = req.app.get('proCollec');
    let products = await proCollec.find().toArray();
    res.send({ message: "Product list fetched successfully", payload: products });
}));

// Add a new product
proApp.post('/products', verifyToken, expressAsyncHandler(async (req, res) => {
    const proCollec = req.app.get("proCollec");
    let { name, count, cost } = req.body;

    // Validate input
    if (!name || count === undefined || !cost) {
        return res.status(400).send({ message: "All fields are required (name, count, cost)" });
    }

    // Determine status based on count
    let status = count > 0 ? "In Stock" : "Out of Stock";

    let newProduct = { name, count, cost, status };

    let user = await usersCollec.findOne({ username: req.user.username });

    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }

    // Add product to the user's inventory
    await usersCollec.updateOne(
        { username: req.user.username },
        { $push: { products: newProduct } }
    );

    res.send({ message: "Product added successfully", payload: newProduct });
}));

// Update product details
proApp.put('/products/:name', verifyToken, expressAsyncHandler(async (req, res) => {
    const proCollec = req.app.get("proCollec");
    let { name } = req.params;
    let { count, cost } = req.body;

    let status = count > 0 ? "In Stock" : "Out of Stock";

    let updatedProduct = await proCollec.findOneAndUpdate(
        { name },
        { $set: { count, cost, status } },
        { returnDocument: "after", returnOriginal: false }
    );
    

    if (!updatedProduct) {
        return res.status(404).send({ message: "Product not found" });
    }

    res.send({ message: "Product updated successfully", payload: updatedProduct });
}));

// Delete a product
proApp.delete('/products/:name', verifyToken, expressAsyncHandler(async (req, res) => {
    const proCollec = req.app.get("proCollec");
    let { name } = req.params;

    let deletedProduct = await proCollec.findOneAndDelete({ name });

    if (!deletedProduct) {
        return res.status(404).send({ message: "Product not found" });
    }

    res.send({ message: "Product deleted successfully" });
}));

module.exports = proApp;
