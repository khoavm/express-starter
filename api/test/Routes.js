
const Joi = require('joi');
const RESPONSE_CODE = require('../../constants/ResponseCode')
const {getParamsTest, getQueryTest, postTest, securityTest, getParamsQueryTest, postWithParamsTest, uploadTest} = require('./Controllers')
module.exports = [
  // test jwt verify
  {
    path: '/test/security',
    method: 'GET',
    auth: "test",
    handler: securityTest,
    tags: ['test', "security"],
    summary: 'Test Security JWT',
    // validate: {
    //   params: {
    //     id: Joi.number().required().min(3).description('test id').example(4)
    //   }
    // },
    response:{
      [RESPONSE_CODE.SUCCESS]:Joi.object({
          ok: Joi.string().example('huhu').description('pro pro')
        }).description('test huhu')
      
    }

  },
  // test upload file
  {
    path: '/upload/test',
    method: 'POST',
    auth: false,
    handler: uploadTest,
    summary: "Test Post method",
    tag: ['test'],
    validate: {
      body: {
        bannerImage: Joi.any().meta({swaggerType: 'file'}).optional().allow('').description('image file'),
      }
    },
    upload: [{name: 'bannerImage', maxCount: 1}],
    response:{
      [RESPONSE_CODE.SUCCESS]:Joi.array().example('haha').description('pro pro')
    }
  },
  //test post method
  {
    path: '/test',
    method: 'POST',
    auth: false,
    handler: postTest,
    summary: "Test Post method",
    tag: ['test'],
    validate: {
      body: {
        test: Joi.string().required().min(3).description('test 1').example('hihi').valid('hoho'),
      }
    },
    response:{
      [RESPONSE_CODE.SUCCESS]:Joi.array().example('haha').description('pro pro')
    }
  },
 
  //test get method with query params
  {
    path: '/test',
    method: 'GET',
    auth: false,
    handler: getQueryTest,
    tags: ['test'],
    summary: 'Test GET method with query params',
    validate: {
      query: {
        test: Joi.string().required().min(3).description('test 1').example('tada').valid('hix','haha'),
        test2: Joi.string().required().min(3).description('test 2').example('oho yeah')
      }
    },
    response:{
      [RESPONSE_CODE.SUCCESS]:Joi.object({
          ok: Joi.string().example('huhu').description('pro pro')
        }).description('test huhu')
      
    }

  },
  
  // test get mothd with params
  {
    path: '/test/:id',
    method: 'GET',
    auth: false,
    handler: getParamsTest,
    tags: ['test'],
    summary: 'Test GET method with query params',
    validate: {
      params: {
        id: Joi.number().required().min(3).description('test id').example(4)
      }
    },
    response:{
      [RESPONSE_CODE.SUCCESS]:Joi.object({
          ok: Joi.string().example('huhu').description('pro pro')
        }).description('test huhu')
      
    }

  },
  //test get method with params and querys
   {
    path: '/test2/:id',
    method: 'GET',
    auth: false,
    handler: getParamsQueryTest,
    tags: ['test'],
    summary: 'Test GET method with query params',
    validate: {
      params: {
        id: Joi.number().required().min(3).description('test id').example(4)
      },
      query: {
        name: Joi.string().required().min(3).description('test name').example('khoa')
      }
    },
    response:{
      [RESPONSE_CODE.SUCCESS]:Joi.object({
          ok: Joi.string().example('huhu').description('pro pro')
        }).description('test huhu')
      
    }

  },
   //test post params method
   {
    path: '/test/:id',
    method: 'POST',
    auth: false,
    handler: postWithParamsTest,
    summary: "Test Post method with params",
    tag: ['test'],
    validate: {
      body: {
        test: Joi.string().required().min(3).description('test 1').example('hihi'),
      },
      params: {
        id: Joi.number().required().min(3).description('test id').example(4)
      },
    },
    response:{
      [RESPONSE_CODE.SUCCESS]:Joi.array().example('haha').description('pro pro')
    }
  },
  
  
]