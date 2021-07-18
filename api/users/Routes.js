const Joi = require('joi');
const UserController = require('./Controllers');
const RESPONSE_CODE = require('../../constants/ResponseCode')
module.exports = [
  {
    path: '/users',
    method: 'POST',
    auth: false,
    handler: UserController.createUser,
    summary: "Create new user",
    tags: ['user'],
    validate: {
      body: {
        name: Joi.string().required().min(3).description('Name of user').example('khoa'),
        age: Joi.number().required().min(1).description('Age of user').example(23)
      }
    },
    response:{
      [RESPONSE_CODE.SUCCESS]:Joi.object({
        id: Joi.string().required().description('Id of user').example('123456acv'),
        name: Joi.string().required().min(3).description('Name of user').example('khoa'),
        age: Joi.number().required().min(1).description('Age of user').example(23)
      }).example('haha').description('pro pro')
    }
  }
]