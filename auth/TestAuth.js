const {JWT_SECRET} = require('../config/dev');
module.exports ={
  name: 'test',
  secretOrKey: JWT_SECRET.TEST,
  handler: (jwtPayload, done) =>{
    console.log('in jwt verify>>', jwtPayload);
  //   if (err) {
  //     //SYSTEM ERROR
  //      return done(err, false);
  //  }
   if (true) {
      // AUTHORIZE SUCCESSFULLY
       return done(null, {test: 'ok'});
   } else {
      // AUTHORIZE FAIL
       return done(null, false);
       
   }
  }
}