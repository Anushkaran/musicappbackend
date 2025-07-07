const express = require('express');
const Song = require('../models/Song');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  const songs = await Song.find();
  res.json(songs);
});

router.post('/', auth, async (req, res) => {
  const { title, artist, album, url } = req.body;
  const song = new Song({ title, artist, album, url });
  await song.save();
  res.json(song);
});

router.post('/:id/like', auth, async (req, res) => {
  const song = await Song.findById(req.params.id);
  if (!song) return res.status(404).json({ message: 'Song not found' });
  song.likes++;
  await song.save();
  res.json(song);
});

module.exports = router;
