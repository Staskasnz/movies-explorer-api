const mongoose = require('mongoose');

const moviechema = new mongoose.Schema({
  ccountry: String, // использую сокращенную запись, required по умолчанию true
  director: String,
  duration: Number,
  year: String,
  description: String,
  image: String,
  thumbnail: String,
  trailerLink: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: Number,
  nameRU: String,
  nameEN: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('movie', moviechema);
