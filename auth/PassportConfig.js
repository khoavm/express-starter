const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const fs = require('fs');
const path = require('path')
const AUTH_PATH = __dirname;
const files = fs.readdirSync(AUTH_PATH).filter( fileName => fileName !== 'PassportConfig.js');
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
module.exports = () =>{
  files.forEach(fileName => {
    const filePath = path.join(AUTH_PATH, fileName);
      if(/(Auth[.]js$)/i.test(fileName) === false ){
        throw new Error(`${filePath} have wrong file name(must have Auth.js in prefix)`);
      }
      const auth = require(filePath);
      if(!auth.name || !auth.secretOrKey || !auth.handler ){
        throw new Error(`${filePath} don't have enough attribute name, secretOrKey, handler`);
      } 
      opts.secretOrKey = auth.secretOrKey;
      passport.use(auth.name, new JwtStrategy(opts, auth.handler));
     
  })
  
}





