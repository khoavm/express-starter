const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// {
//   fieldname: 'bannerImage',
//   originalname: 'cat.jpg',
//   encoding: '7bit',
//   mimetype: 'image/jpeg',
//   buffer: 'ff d8 ff db',
//   size: 21661 //Byte
// }
module.exports = (fields) => {
  if(fields.length > 1){
    return upload.fields(fields.map((({name,maxCount}) => ({name,maxCount}))));
  }
  const {name, maxCount} = fields[0];
  if(maxCount > 1){
    return upload.array(name, maxCount);
  }
  return upload.single(name);
  
};
