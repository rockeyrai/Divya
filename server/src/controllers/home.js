const HomeStructure = require("../models/homeModels");

const changeHome = async (req,res)=>{
  try{
    const {homeImage,navbarColor,bodyColor,cardColor,contact,contactEmail,location } = req.body;

    // change home using the News model
    const home = new HomeStructure({
      homeImage,navbarColor,bodyColor,cardColor,contact,contactEmail,location 
    });

    // Save the new hom change to the database
    await home.save();

    res.status(201).json({
      message: 'Home Page Change Successfully!',
      news: home,
    });
  } catch (error) {
    console.error("Can't Change the Home page:", error);
    res.status(500).json({
      message: "Can't Change the Home page",
      error: error.message,
    });
  }
}

module.exports = {changeHome};