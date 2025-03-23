// Create HTTP server
const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const cors = require('cors');

app.use(express.json());
app.use(cors());
require('dotenv').config();

// Connecting to MongoDB server
let mCLient = new MongoClient(process.env.DB_URL);

mCLient.connect()
  .then((connectionObj) => {
    console.log("MongoDB connected");

    // Connect to database
    const invenproject = connectionObj.db('inventory');

    // Connect to products collection
    const proCollec = invenproject.collection('products');

    // Set collection to be accessible across the app
    app.set('proCollec', proCollec);

    // Start the server
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to MongoDB:", err);
  });

// ✅ PRODUCT MANAGEMENT APIs

// Get all products
app.get('/products', async (req, res) => {
  try {
    const proCollec = req.app.get('proCollec');
    let products = await proCollec.find().toArray();
    res.send({ message: "Product list fetched successfully", payload: products });
  } catch (error) {
    res.status(500).send({ message: "Error fetching products", error: error.message });
  }
});

// Add a new product
app.post('/products', async (req, res) => {
  try {
    const proCollec = req.app.get("proCollec");
    let { name, count, cost } = req.body;

    if (!name || count === undefined || !cost) {
      return res.status(400).send({ message: "All fields are required (name, count, cost)" });
    }

    let status = count > 0 ? "In Stock" : "Out of Stock";
    let newProduct = { name, count, cost, status };

    await proCollec.insertOne(newProduct);
    res.send({ message: "Product added successfully", payload: newProduct });
  } catch (error) {
    res.status(500).send({ message: "Error adding product", error: error.message });
  }
});

// Update a product
app.put('/products/:name', async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).send({ message: "Error updating product", error: error.message });
  }
});

// Delete a product
app.delete('/products/:name', async (req, res) => {
  try {
    const proCollec = req.app.get("proCollec");
    let { name } = req.params;

    let deletedProduct = await proCollec.findOneAndDelete({ name });

    if (!deletedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.send({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting product", error: error.message });
  }
});

// Handle invalid paths
app.use('*', (req, res) => {
  res.send({ message: "Invalid path" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.send({ message: "Error in code", errorMessage: `${err.message}` });
});
