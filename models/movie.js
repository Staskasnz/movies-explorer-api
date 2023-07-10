const mongoose = require('mongoose');
const validator = require('validator');

const urlValidator = { // обьект повторяющейса валидации
  validator: validator.isURL,
  message: 'Invalid link URL',
};

const moviechema = new mongoose.Schema({
  ccountry: String, // использую сокращенную запись, required по умолчанию true
  director: String,
  duration: Number,
  year: String,
  description: String,
  image: {
    type: String,
    required: true,
    validate: urlValidator,
  },
  thumbnail: {
    type: String,
    required: true,
    validate: urlValidator,
  },
  trailerLink: {
    type: String,
    required: true,
    validate: urlValidator,
  },
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
