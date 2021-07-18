const fs = require('fs');
const path = require('path');
const DEFAULT_BASE_PATH = path.join(__dirname, '../api');
const {ALLOWED_ROUTE_METHOD} = require('../constants/GeneralConstant')
let routeList = [];
const fetchAllRoutes = (basePath = DEFAULT_BASE_PATH) => {
  const allFiles = fs.readdirSync(basePath);
  allFiles.forEach(fileName => {
    const filePath = path.join(basePath, fileName);
    if(fs.lstatSync(filePath).isDirectory()){
        fetchAllRoutes(filePath);
    }
    if(/(ROUTE)S*/i.test(fileName) === false){
      return;
    }
    const routeFile = require(filePath);
    if(Array.isArray(routeFile) === false){
      throw new Error(`${filePath} must export array`);
    }
    routeFile.forEach(route => {
      if(!route.method){
        throw new Error(`method is required in ${filePath}`)
      }
      if(typeof route.method !== 'string'){
        throw new Error(`method in ${filePath} is required`)
      }
      const method = ALLOWED_ROUTE_METHOD[route.method.toUpperCase()];
      if(!method){
        throw new Error(`method in ${filePath} not valid: ${route.method}`)
      }

      route.method = method;
      route.filePath = filePath
    })
    
    routeList = [...routeList, ...routeFile];
  })
}
fetchAllRoutes();
console.log('done fetching route....')
const getAllRoutes = () => {
  return routeList
} 
module.exports ={
  getAllRoutes
}