const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// In-memory storage for strings (will persist during server runtime)
let stringList = [];

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Get all strings
app.get('/api/strings', (req, res) => {
  res.json({ strings: stringList });
});

// Add a new string
app.post('/api/strings', (req, res) => {
  const { text } = req.body;
  
  if (!text || typeof text !== 'string' || text.trim() === '') {
    return res.status(400).json({ error: 'Text is required and must be a non-empty string' });
  }
  
  const newString = {
    id: Date.now().toString(),
    text: text.trim(),
    createdAt: new Date().toISOString()
  };
  
  stringList.push(newString);
  res.status(201).json({ message: 'String added successfully', string: newString });
});

// Delete a string
app.delete('/api/strings/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = stringList.length;
  stringList = stringList.filter(item => item.id !== id);
  
  if (stringList.length === initialLength) {
    return res.status(404).json({ error: 'String not found' });
  }
  
  res.json({ message: 'String deleted successfully' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});