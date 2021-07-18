const UserModel = require('../../model/User');
const RESPONSE_CODE = require('../../constants/ResponseCode')
module.exports = {
  createUser: async (req, res) => {
    try {
      const {name, age} = req.body;
      const user = await UserModel.create({name,age});
      if(!user){
        return res.status(RESPONSE_CODE.SERVER_ERROR).send({message: req.t("SERVER_ERROR")})
      }
      return res.send({
        id: user._id,
        name: user.name,
        age: user.age
      })
    } catch (error) {
      console.log(error);
      return es.status(RESPONSE_CODE.SERVER_ERROR).send({message: req.t("SERVER_ERROR")})
    }
    
   
  }

  
}