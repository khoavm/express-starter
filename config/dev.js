module.exports = {
  DOMAIN: 'http://localhost',
  PORT: 5000,
  RATE_LIMIT:{
    MAX: 100,
    WINDOWS: 15 * 60 * 1000,
  },
  JWT_SECRET:{
    TEST: 'abc123!@#'
  }
}