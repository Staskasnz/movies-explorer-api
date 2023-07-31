const router = require('express').Router();
const { updateUser, getUser } = require('../controllers/users');
const { validateDeleteMovies } = require('../validation/validation');

router.get('/me', getUser);
router.patch('/me', validateDeleteMovies, updateUser);

module.exports = router;
