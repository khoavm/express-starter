const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const CONFIG = require(`../config/${process.env.NODE_ENV}`)
module.exports = (app) =>{
  // Allow Cross-Origin requests
  app.use(cors());

  // Set security HTTP headers
  app.use(helmet());

  // Limit request from the same API 
  const limiter = rateLimit({
    max: CONFIG?.RATE_LIMIT?.MAX || 1000,
    windowMs: CONFIG?.RATE_LIMIT?.WINDOWS || (15 * 60 * 1000),
    handler: (req, res) => res.status(200).send(req.t('RATE_LIMIT_EXCEEDED'))
    // message: 'Too Many Request from this IP, please try again later'
  });
  app.use('*', limiter);

  // Data sanitization against XSS(clean user input from malicious HTML code)
  app.use(xss());

  // Prevent parameter pollution
  app.use(hpp());
}