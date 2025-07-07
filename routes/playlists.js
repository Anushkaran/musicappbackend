// backend/routes/playlists.js

const express = require('express');
const Playlist = require('../models/Playlist');
const auth = require('../middleware/auth');
const router = express.Router();

// GET all playlists for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const playlists = await Playlist.find({ user: userId }).populate('songs');
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new playlist
router.post('/', auth, async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const { name } = req.body;
    const playlist = new Playlist({ name, user: userId });
    await playlist.save();
    res.status(201).json(playlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a song to a playlist
router.post('/:id/add', auth, async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
    if (playlist.user.toString() !== userId) return res.status(403).json({ message: 'Forbidden' });

    playlist.songs.push(req.body.songId);
    await playlist.save();
    const updated = await playlist.populate('songs');
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove a song from a playlist
router.post('/:id/remove', auth, async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
    if (playlist.user.toString() !== userId) return res.status(403).json({ message: 'Forbidden' });

    playlist.songs = playlist.songs.filter(id => id.toString() !== req.body.songId);
    await playlist.save();
    const updated = await playlist.populate('songs');
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete an entire playlist
router.delete('/:id', auth, async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
    if (playlist.user.toString() !== userId) return res.status(403).json({ message: 'Forbidden' });

    await playlist.remove();
    res.json({ message: 'Playlist deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
