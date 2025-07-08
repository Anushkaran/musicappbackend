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
// PUT /api/songs/:id
router.put('/:id', auth, async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ message: 'Song not found' });

    // Merge only the fields you pass in (partial update)
    const { title, artist, album, url } = req.body;
    if (title)  song.title  = title;
    if (artist) song.artist = artist;
    if (album)  song.album  = album;
    if (url)    song.url    = url;

    await song.save();
    return res.json(song);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});
// DELETE /api/songs/:id — delete a song by its ID (auth required)
router.delete('/:id', auth, async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    await song.remove();
    res.json({ message: 'Song deleted successfully' });
  } catch (err) {
    console.error('Error deleting song:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
