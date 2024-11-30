const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const homeSchema = new Schema({
  homeImage: { type: [String]},
  navbarColor:{type:String},
  bodyColor:{type:String},
  cardColor:{type:String},
  contact:{type:String},
  contactEmail:{type:String},
  location:{type:String}
})

const HomeStructure = mongoose.model("home",homeSchema)

module.exports = HomeStructure