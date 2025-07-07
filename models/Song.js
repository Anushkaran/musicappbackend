const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  artist:   { type: String, required: true },
  album:    { type: String, required: true },
  url:      { type: String, required: true },
  likes:    { type: Number, default: 0 },
  likedBy:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('Song', songSchema);
