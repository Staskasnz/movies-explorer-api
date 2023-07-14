const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validateCreateMovie, validateDeleteMovies } = require('../validation/validation');

router.get('/', getMovies);
router.post('/', validateCreateMovie, createMovie);
router.delete('/:movieId', validateDeleteMovies, deleteMovie);

module.exports = router;
