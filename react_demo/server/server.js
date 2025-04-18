const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// ✅ Apply CORS middleware early
// ✅ Set CORS before any routes
app.use(cors({
  origin: ['http://localhost:3000', 'http://10.11.67.232:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

// Middleware to parse JSON bodies
app.use(express.json());




// Your existing MongoDB connection string
const mongo_uri = "mongodb+srv://murcline:Colbert2025@cluster0.phqqrr3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Replace 'yourdbname' with your actual database name
mongoose.connect(mongo_uri, {
  dbName: 'sample',
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas.');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Schema and Model
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
});
const User = mongoose.model('User', userSchema);


// Routes
app.post('/api/users', async (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  try {
    const newUser = new User({ username, email });
    await newUser.save();
    res.status(201).json({ message: 'User saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


PORT = 5000
// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
