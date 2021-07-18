
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/express-starter', {useNewUrlParser: true, useUnifiedTopology: true});


module.exports = mongoose;
