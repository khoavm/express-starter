const express = require('express');
const Validate = require('../middlewares/validate');
const router = require('express').Router();
const {getAllRoutes} = require('../utils/ReadHelper')
const routeList = getAllRoutes();
const passport = require('passport');
const uploadHanler = require('./upload')
routeList.forEach(({path,method, handler, auth = false,validate, upload}) =>{
 
  authHandler = auth ? passport.authenticate(auth, {session: false,}) : (req, res, next) => next();
  //authHandler,
  upload = upload ? uploadHanler(upload) : (req,res,next) => next();
  router[method](path, authHandler, Validate(validate), upload,handler);

})

module.exports = (app) => {
  app.use(router);
};