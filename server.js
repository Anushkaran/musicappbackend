require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const songRoutes = require('./routes/songs');
const playlistRoutes = require('./routes/playlists');

const app = express();

// Middleware
// backend/server.js
const corsOptions = {
  origin: [
    'https://musicappfrontend.netlify.app',  // your Netlify URL
    'http://localhost:3000'                  // keep localhost for local dev
  ],
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));   // <-- enable preflight for every route
app.use(express.json());


// Root health check endpoint
app.get('/', (req, res) => {
  res.send('🎵 Music Streaming API is running');
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/playlists', playlistRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
