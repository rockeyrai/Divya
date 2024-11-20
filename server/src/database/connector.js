const mongoose = require('mongoose');

const dbConnect = async()=>{
  try{
    const isConnected =  await mongoose.connect('mongodb://127.0.0.1:27017/divya');
    if(isConnected) console.log("connected to mongodb")
  }catch(err){
  console.log(err)
  }
}
dbConnect()

module.exports = dbConnect