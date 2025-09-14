const express = require('express');
const cors = require('cors');
const { createClient } = require('redis');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Redis client configuration
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

// Connect to Redis
redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

// Initialize Redis connection
(async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
  }
})();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Get all strings
app.get('/api/strings', async (req, res) => {
  try {
    const strings = await redisClient.lRange('strings', 0, -1);
    const parsedStrings = strings.map(str => JSON.parse(str));
    res.json({ strings: parsedStrings });
  } catch (error) {
    console.error('Error fetching strings:', error);
    res.status(500).json({ error: 'Failed to fetch strings' });
  }
});

// Add a new string
app.post('/api/strings', async (req, res) => {
  const { text } = req.body;
  
  if (!text || typeof text !== 'string' || text.trim() === '') {
    return res.status(400).json({ error: 'Text is required and must be a non-empty string' });
  }
  
  const newString = {
    id: Date.now().toString(),
    text: text.trim(),
    createdAt: new Date().toISOString()
  };
  
  try {
    await redisClient.lPush('strings', JSON.stringify(newString));
    res.status(201).json({ message: 'String added successfully', string: newString });
  } catch (error) {
    console.error('Error adding string:', error);
    res.status(500).json({ error: 'Failed to add string' });
  }
});

// Delete a string
app.delete('/api/strings/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const strings = await redisClient.lRange('strings', 0, -1);
    const parsedStrings = strings.map(str => JSON.parse(str));
    const stringToDelete = parsedStrings.find(item => item.id === id);
    
    if (!stringToDelete) {
      return res.status(404).json({ error: 'String not found' });
    }
    
    // Remove the string from Redis list
    await redisClient.lRem('strings', 1, JSON.stringify(stringToDelete));
    res.json({ message: 'String deleted successfully' });
  } catch (error) {
    console.error('Error deleting string:', error);
    res.status(500).json({ error: 'Failed to delete string' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});