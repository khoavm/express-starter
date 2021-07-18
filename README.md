"# express-starter"

Documentation

* Quick start

Run following commands

- npm i
- npm run dev
- go to http:localhost:5000/documentation
- go api/test folder to explore how it works

1/ Router

- Create file in "api" folder that have "Route.js" suffix
- The file must export an array
- element in array must be like this:

{

path: '/test',

method: 'POST',

auth: false,

handler: postTest,

summary: "Test Post method",

tags: ['test'],

validate: {

body: {

test: Joi.string().required().min(3).description('test 1').example('hihi').valid('hoho'),

}

},

response:{

[RESPONSE\_CODE.SUCCESS]:Joi.array().example('haha').description('pro pro')

}

}

- You only need 'path','method', 'handler' element to create a route. Anything else is optional

2/ Validate(Using Joi)

- I set up join for validate
- just add validate key in route properties
- validate key have three availabel options: body, query, params
- Then use can go to https://joi.dev/ to reference how to validate attributes

3/ Swagger

- go to path /documentation to explore swagger
- everything describe in route attributes wil be use in swagger : path, method, auth, handler, summary, tags, validate, response...

4/ I18n(Internationalization)

- Go to constants/GeneralConstant.js file then find 'ALLOWED\_LANGUAGE' object
- add more language option

for example: If you want to add English just add in 'ALLOWED\_LANGUAGE' object {'EN': 'en'};

- Then find locales folder and create 'en.json' file.
- I18n detect language from client header: "Accept-Language"

for example: if value in "Accept-Language" header is 'en' then I18n will use 'en.json' file

- translate when response by use req.t("STRING THAT IS A KEY IN en.json file")

5/ CronJob

- Find 'task' folder then create file that have 'Task.js' suffix in name
- The file must export an object
- The attribute in object must be like this:

{

isActive: true,

expression: '\*/5 \* \* \* \* \*',

options: {

timeZone: 'Asia/Ho\_Chi\_Minh',

runOnInit: false,

waitingFinish: false,

},

onTick:  () => {

return new Promise((resolve, reject) =>{

setTimeout(() => resolve('ok'), 10000);

})

}

}

\+ isActive: do you want to run this cron

\+ expresssion: go to https://crontab.guru/ for more detail

\+ options: {

timeZone: default is 'Asia/Ho\_Chi\_Minh'

runOnInit: do you want to run onTick function immediately when cron is start

waitingFinish: do you want wait the previous onTick function for finishing when task is repeat

}

\+ onTick: task job function

6/ Verify JWT token(passportjs)

- Find 'auth' folder
- Create file that have 'Auth.js' suffix
- The file must export an object
- Attributes in object must like this

{

name: 'test',

secretOrKey: JWT\_SECRET.TEST,

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

\+ name: name of strategies

\+ secretOrKey: key to verify jwt token

\+ handler: handler after verifying jwt token successfully

- Then when you want to apply jwt verify on a specific route. Just add 'auth' key with strategies name

For example: Route Object {auth :'test'}

7/ Upload file(multer)

- if you want to upload a file
- add "upload" key to Route Object
- the value of upload must be array. The element of array must be an object with following key 'name', 'maxCount'

For example: Route Object {upload: [{name: 'test',maxCount:1}]}

\+ name: param name from client

\+ maxCount: number of file

- if array have only one element, get the file by (req,res,next) => req.file
- if array have more than one element  get the files by (req,res,next) => req.files


