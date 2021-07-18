const express = require('express');
const middlewares = require('./middlewares');
const CONFIG = require(`./config/${process.env.NODE_ENV}`)
const app = express()
const runAllCronJobs = require('./task/cron');
const configureSwagger = require('./joi-swagger');
const configureAuth = require('./auth/PassportConfig')

//Apply Passport Auth
configureAuth();
//Apply all middlewares;
middlewares(app);
//Apply cron job
runAllCronJobs();
//Apply Swagger
configureSwagger(app);



app.listen(CONFIG.PORT || 3000, () => {
  console.log(`Example app listening at ${CONFIG.DOMAIN}:${CONFIG.PORT || 3000}`)
})