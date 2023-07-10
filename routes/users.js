const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { updateUser, getUser } = require('../controllers/users');

router.get('/me', getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required(),
  }),
}), updateUser);

module.exports = router;
