require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/error-handler');
const NotFoundError = require('./errors/notfound-error');
const { DB_ADDRESS } = require('./config');
const { validateSignup, validateSignin } = require('./validation/validation');
const limiter = require('./ratelimiter/ratelimiterconfig');

const { PORT = 3000 } = process.env;
const app = express();
console.log(DB_ADDRESS);
app.use(limiter);
app.use(helmet());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validateSignup, createUser);
app.post('/signin', validateSignin, login);

app.use(auth);

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/signout', (req, res) => {
  // Удаление JWT из куков пользователя
  res.clearCookie('jwt');
  res.send('Вы успешно вышли из системы.');
});

app.use(require('./routes'));

app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый путь не найден'));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
