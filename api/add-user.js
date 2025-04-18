const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb) return { client: cachedClient, db: cachedDb };

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('test_db');  // or process.env.DB_NAME
    cachedClient = client;
    cachedDb = db;
    return { client, db };
}

module.exports = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { username, password } = req.body;
    if (!username || !password) return res.status(400).send('Missing username or password');

    try {
        const { db } = await connectToDatabase();
        const usersCollection = db.collection('test_collection');
        await usersCollection.insertOne({ username, password });
        res.status(200).send('User added successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding user');
    }
};
