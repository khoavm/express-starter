const fs = require('fs').promises;
const {SERVER_ERROR} = require('../../constants/ResponseCode')
module.exports = {
  postTest: (req,res) => {
    return res.send([req.t('OK')]);
  },
  getQueryTest: (req, res) => {
    return res.send({ok: req.t('OK')})
  },
  getParamsTest: (req,res) => {
    return res.send({ok: req.t('OK')});
  },
  securityTest: (req,res) => {
    console.log('pass security');
    console.log(req.user);
    return res.status(200).send({ok: req.t('OK')});
  }, 
  getParamsQueryTest: (req, res) => {
    console.log('params>>', req.params);
    console.log('queries>>', req.query);
    return res.status(200).send({ok: req.t('OK')})
  },
  postWithParamsTest: (req, res) => {
    console.log('body>>', req.body);
    console.log('params>>', req.params);
    return res.send([req.t('OK')]);
  },
  uploadTest: async (req, res) => {
    try {
      const {originalname, buffer, encoding} = req.file;
      await fs.writeFile(originalname, buffer);
    return res.send([req.t('OK')])
    } catch (error) {
      console.log(error);
      res.status(SERVER_ERROR).send({message: req.t('SERVER_ERROR')});
    }
    
  }


}