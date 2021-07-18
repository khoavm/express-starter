const mongoose = require('../db/mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name:  String, // String is shorthand for {type: String}
  age: Number,
  
}, { timestamps: true });

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;