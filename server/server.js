const express = require('express')
const app = express()
const port = 8000
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const saltRounds = 10;
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


app.post('/register',async (req, res) => {
  //1. email exists or not?
        const emailExist = await User.exists({email: req.body.email})
        if(emailExist) return res.status(409).send({msg: "Email already exist!"})
        // yes exists: 
            //-------> return msg email taken
        // no exists:
            //2. password hash
            req.body.password = await bcrypt.hash(req.body.password, saltRounds);
            //3. save to db
            User.create(req.body)
            res.send({msg: req.body.fullName + " created successfully"})

})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})