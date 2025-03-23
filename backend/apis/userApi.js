const express = require('express');
const userApp = express.Router();
const bcryptjs = require('bcryptjs');
require('dotenv').config();
let jwt = require('jsonwebtoken');
let verifyToken = require('../middleware/tokenVerify');
let expressAsyncHandler = require('express-async-handler');

// Route to get all users
userApp.get('/users', expressAsyncHandler(async (req, res) => {
    const usersCollec = req.app.get('usersCollec');
    let users = await usersCollec.find().toArray();
    res.send({ message: "from users", payload: users });
}));

// Route to get a specific user by username
userApp.get('/users/:username', async (req, res) => {
    const usersCollec = req.app.get('usersCollec');
    let userCred = req.params.username;
    let user = await usersCollec.findOne({ username: userCred });

    if (user === null)
        res.send({ message: "no user found" });
    else
        res.send({ message: "user found", payload: user });
});

// ✅ New Route: Fetch a user's inventory
userApp.get('/users/:username/products', expressAsyncHandler(async (req, res) => {
    const usersCollec = req.app.get('usersCollec');
    let userCred = req.params.username;
    
    let user = await usersCollec.findOne({ username: userCred });

            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }

            // Ensure the products array exists
            let products = user.products || [];
            res.send({ message: "User products fetched", payload: products });

}));

// Route for user registration
userApp.post('/users', async (req, res) => { 
    const usersCollec = req.app.get("usersCollec");
    let newUser = req.body;

    let userExist = await usersCollec.findOne({ username: newUser.username });

    if (userExist !== null) {
        res.send({ message: "User already exists" });
    } else {
        let hashedPassword = await bcryptjs.hash(newUser.password, 7);
        newUser.password = hashedPassword;
        newUser.products = []; // ✅ Initialize an empty products array for inventory
        await usersCollec.insertOne(newUser);
        res.send({ message: "User created" });
    }
});

// ✅ New Route: Add a product to a user's inventory
userApp.post('/users/:username/products', verifyToken, expressAsyncHandler(async (req, res) => {
    const usersCollec = req.app.get("usersCollec");
    let username = req.params.username;
    let { name, count, cost } = req.body;

    if (!name || count === undefined || !cost) {
        return res.status(400).send({ message: "All fields are required (name, count, cost)" });
    }

    let status = count > 0 ? "In Stock" : "Out of Stock";

    let updatedUser = await usersCollec.findOneAndUpdate(
        { username },
        { $push: { products: { name, count, cost, status } } },
        { returnDocument: "after" }
    );

    if (!updatedUser) {
        return res.status(404).send({ message: "User not found" });
    }

    res.send({ message: "Product added to inventory", payload: updatedUser.products });
}));

// ✅ New Route: Remove a product from a user's inventory
userApp.delete('/users/:username/products/:productName', verifyToken, expressAsyncHandler(async (req, res) => {
    const usersCollec = req.app.get("usersCollec");
    let username = req.params.username;
    let productName = req.params.productName;

    let updatedUser = await usersCollec.findOneAndUpdate(
        { username },
        { $pull: { products: { name: productName } } },
        { returnDocument: "after" }
    );

    if (!updatedUser) {
        return res.status(404).send({ message: "User or product not found" });
    }

    res.send({ message: "Product removed from inventory", payload: updatedUser.products });
}));

// ✅ Fix: Update the user update route
userApp.put('/user', async (req, res) => {
    console.log('PUT request in user');
    const usersCollec = req.app.get('usersCollec');
    let modifiedUser = req.body;
    
    await usersCollec.updateOne(
        { username: modifiedUser.username }, 
        { $set: modifiedUser }
    );
    
    res.send({ message: "User modified" });
});

// User login authentication
userApp.post('/login', async (req, res) => {
    const usersCollec = req.app.get('usersCollec');
    const userCred = req.body;

    let findInDbUser = await usersCollec.findOne({ username: userCred.username });
    
    if (!findInDbUser) {
        return res.send({ message: "Username is invalid" });
    }

    let passcheck = await bcryptjs.compare(userCred.password, findInDbUser.password);

    if (!passcheck) {
        return res.send({ message: "Password is invalid" });
    }

    let signedToken = jwt.sign({ username: userCred.username }, process.env.SECRET_KEY, { expiresIn: '1d' });

    res.send({ message: "Login success", token: signedToken, users: findInDbUser });
});

module.exports = userApp;
