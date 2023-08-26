const { celebrate, Joi } = require('celebrate');
// const urlRegex = require('../regex/url-regex');
const idRegex = require('../regex/id-regex');

const validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
    name: Joi.string().min(2).max(30),
  }),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required(),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    description: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    movieId: Joi.number().required(),
    image: Joi.string().required().uri(),
    nameEN: Joi.string().required(),
    nameRU: Joi.string().required(),
    trailerLink: Joi.string().required().uri(),
    year: Joi.string().required(),
  }),
});

const validateDeleteMovies = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().regex(idRegex).required(),
  }),
});

module.exports = {
  validateSignup,
  validateSignin,
  validateUpdateUser,
  validateCreateMovie,
  validateDeleteMovies,
};
