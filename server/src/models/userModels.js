const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {type:String, unique:true}, 
  phoneNumber: Number,
  password: String,
  // level: {
  //   type: String,
  //   enum : ['student','teacher', 'admin'],
  //   default: 'student'
 // },
  fullName:String,
});
const User = mongoose.model('User', userSchema);

module.exports = User