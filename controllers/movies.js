const BadRequestError = require('../errors/badrequest-error');
const NotFoundError = require('../errors/notfound-error');
const ForbiddenError = require('../errors/forbidden-error');
const Movie = require('../models/movie');

module.exports.getMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({ owner: userId }).sort({ createdAt: -1 })
    .then((movies) => { res.send(movies); })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailerLink, nameRU, nameEN, movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    movieId,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const userId = req.user._id;
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Карточка не найдена');
      }

      // Проверяем, является ли текущий пользователь владельцем карточки
      if (movie.owner.toString() !== userId.toString()) {
        throw new ForbiddenError('У вас нет прав на удаление этой карточки');
      }

      // Пользователь является владельцем карточки, можно выполнить удаление
      return Movie.findByIdAndRemove(req.params.movieId)
        .then(() => res.send(movie))
        .catch(next);
    })
    .catch(next);
};
