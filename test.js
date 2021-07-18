const j2s = require('joi-to-swagger');
const Joi = require('joi');


// const validate = {
//   body: Joi.object({
//     test: Joi.string().required().min(3).description('test 1'),
//     test2: Joi.string().required().min(3)
//   }).description('hehe'),
//   query: {
//     test: Joi.string().required().min(3).description('test 1'),
//     test2: Joi.string().required().min(3).description('test 1')
//   }
// }



// Array.from(validate.body._ids._byKey.entries()).map(([key,value]) => console.log(j2s(value).swagger));

const text = '/test/:id/:rr'
const newText = text.replace(/([:].+?\/)|([:].+?$)/g, (text) => {
  if(text[text.length -1] === '/'){
    return '${' + text.substring(1, text.length -1) + '}' + '/';
  }
  return '${' + text.substr(1) + '}';
  
})


console.log(newText)