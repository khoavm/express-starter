const Joi = require('joi');
const {ALLOWED_PARAM_TYPE} = require('../constants/GeneralConstant')
module.exports = (schema) => async (req,res,next) => {
  try {
    if(!schema){
      return next();
    }
    const isSchemaValid = Object.keys(schema).every(item => !!ALLOWED_PARAM_TYPE[item.toUpperCase()]);
    if(isSchemaValid === false){
      throw new Error('key in schema must be body,params or query')
    }
    await Promise.all(Object.entries(schema).map(([key,schemaContent]) => Joi.object(schemaContent).validateAsync(req[key])));
    return next();
  } catch (error) {
    return res.status(400).send({message:error.message});
  }
  
}