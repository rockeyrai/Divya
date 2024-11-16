const express = require('express')
const app = express()
const port = 8000
const mongoose = require('mongoose');
const cors = require('cors');
const { Schema } = mongoose;


const dbConnect = async()=>{
  try{
    const isConnected =  await mongoose.connect('mongodb://127.0.0.1:27017/divya');
    if(isConnected) console.log("connected to mongodb")
  }catch(err){
  console.log(err)
  }
}
dbConnect()


// email, phoneNumber, password, role, fullName, fatherName, motherName)
const userSchema = new Schema({
  email: {type:String, unique:true}, 
  phoneNumber: Number,
  password: String,
  // level: {
  //   type: String,
  //   enum : ['student','teacher', 'admin'],
  //   default: 'student'
 // },
  isVerified: Boolean,
  fullName:String,
});
const User = mongoose.model('User', userSchema);
app.use(express.json())
app.use(cors())


app.get('/',async (req, res) => {
  User.create(req.body)
  res.send({msg: req.body.fullName + " created successfully"})
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})