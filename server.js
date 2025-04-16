const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
// const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB URI
const uri = "mongodb+srv://murcline:Colbert2025@cluster0.phqqrr3.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);
let usersCollection;

// Connect to MongoDB
async function connectDB() {
    try {
        await client.connect();
        const db = client.db('test_db');  // replace with your db name
        usersCollection = db.collection('test_collection');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
}
connectDB();

// API endpoint to add user
app.post('/add-user', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).send('Missing username or password');

    try {
        await usersCollection.insertOne({ username, password });
        res.status(200).send('User added successfully');
    } catch (err) {
        console.error('Insert error:', err);
        res.status(500).send('Error adding user');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});