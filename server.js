const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Proxy API requests to OMDb
app.get('/api/search', async (req, res) => {
  try {
    const { query, page = 1 } = req.query;
    const response = await axios.get('https://www.omdbapi.com/', {
      params: {
        apikey: process.env.REACT_APP_OMDB_API_KEY,
        s: query,
        page,
        type: 'movie'
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error proxying search request:', error);
    res.status(500).json({ error: 'Failed to fetch data from OMDb API' });
  }
});

app.get('/api/movie/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get('https://www.omdbapi.com/', {
      params: {
        apikey: process.env.REACT_APP_OMDB_API_KEY,
        i: id,
        plot: 'full'
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error proxying movie details request:', error);
    res.status(500).json({ error: 'Failed to fetch data from OMDb API' });
  }
});

// All other GET requests not handled before will return the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});