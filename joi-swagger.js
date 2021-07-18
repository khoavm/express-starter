const CONFIG = require(`./config/${process.env.NODE_ENV}`);
const swaggerUi = require('swagger-ui-express');
const j2s = require('joi-to-swagger');
const Joi = require('joi');
const {getAllRoutes} = require('./utils/ReadHelper');
const {ALOWED_LANGUAGE, ALLOWED_PARAM_TYPE} = require('./constants/GeneralConstant')


const swaggerDocument = {
  openapi: '3.0.3',
  info: {
    title: 'Express API',
    version: '1.0.0',
    description: 'The REST API test service',
    contact: {
      email: "mkhoa98z@gmail.com"
      },
  },
  servers: [
    {
      url: `${CONFIG.DOMAIN}:${CONFIG.PORT}`,
      description: 'Development server'
    }
  ],
  paths: {
  },
  tags: [],
  components: {
    securitySchemes:{
      bearerAuth: {
        type: 'http',
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
}

const existedTags = {};
const addTags = (tags) => {
  tags.forEach(tag => existedTags[tag] = true)
}
const addTagsToSwagger = () => {
  swaggerDocument.tags = Object.keys(existedTags).map( tag => ({name: tag}));
}

const routeList = getAllRoutes();

routeList.forEach(({path,method,validate = {},summary = "", tags = [], description="", response ={}, auth = false, upload = false, filePath}) => {
  path = path.replace(/([:].+?\/)|([:].+?$)/g, (text) => {
    if(text[text.length -1] === '/'){
      return '{' + text.substring(1, text.length -1) + '}' + '/';
    }
    return '{' + text.substr(1) + '}';
    
  })
  addTags(tags);
  if(!swaggerDocument.paths[path]){
    swaggerDocument.paths[path] = {};
  }
  const routeConfig = swaggerDocument.paths[path];
  
  response = Object.entries(response).reduce((response,[status, statusInfo]) => {
    statusInfo = j2s(statusInfo).swagger;
    response[status] = {
      description: statusInfo.description,
      content: {
        "application/json": {
          schema: statusInfo
        }
      }
    }
    return response;
  },{});
 

  routeConfig[method] = {
    tags,
    summary,
    description,
    parameters: [
     {
        "in": "header",
        "name": "Accept-Language",
        "description": "Languages",
        "schema": j2s(Joi.string().default("en").valid(...Object.values(ALOWED_LANGUAGE))).swagger
      }
    ],

    responses: {
      400: {
      "description": "Invalid input"
      },
      ...response
      }
  }
  if(auth){
    routeConfig[method].security = [
      {bearerAuth: []}
    ]
  }
  const methodTypes = Object.keys(validate);
  
  methodTypes.forEach(type => {
    switch(type){
      case ALLOWED_PARAM_TYPE.BODY:
        {
          let contentType = upload ? "multipart/form-data" : "application/json"
          return routeConfig[method].requestBody ={
            content:{
             [contentType]: {
               schema: j2s(validate.body).swagger
             } 
            }
        }
        }
        
      ;
      case ALLOWED_PARAM_TYPE.QUERY:
        return Object.entries(validate.query)
          .forEach(([key,value]) => {
            const schema = j2s(value).swagger
            return routeConfig[method].parameters.push({
              "in": "query",
              "name": key,
              "description": schema.description,
              "schema": schema
            })
          }
         
        );
      case ALLOWED_PARAM_TYPE.PARAMS:
        return Object.entries(validate.params)
        .forEach(([key,value]) => {
          const schema = j2s(value).swagger
          return routeConfig[method].parameters.push({
            "in": "path",
            "name": key,
            "description": schema.description,
            "schema": schema
          })
        }
       
      );     
      default:
        throw new Error(`Method type of path ${path} in file ${filePath} is not valid: ${type}`)
    }
  })
  
   
});
addTagsToSwagger();




const configureSwagger = (app) => {
  app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
module.exports = configureSwagger