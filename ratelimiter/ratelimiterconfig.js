const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: {
    error: 'Слишком много запросов с вашего IP, пожалуйста, подождите некоторое время.',
    retryAfter: 10,
  },
});

module.exports = limiter;
