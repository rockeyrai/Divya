const HomeStructure = require("../models/homeModels");

const changeHome = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { homeImage, navbarColor, bodyColor, cardColor, contact, contactEmail, location } = req.body;

    if (!homeImage) {
      return res.status(400).json({ message: "homeImage is required." });
    }

    // Create a new document in the database
    const home = new HomeStructure({
      homeImage: Array.isArray(homeImage) ? homeImage : [homeImage], // Ensure it's stored as an array
      navbarColor,
      bodyColor,
      cardColor,
      contact,
      contactEmail,
      location,
    });

    // Save to database
    await home.save();

    res.status(201).json({
      message: "Home Page Change Successfully!",
      home,
    });
  } catch (error) {
    console.error("Error changing Home page:", error);
    res.status(500).json({
      message: "Error changing Home page",
      error: error.message,
    });
  }
};


const getHomeChange = async (req,res)=>{
  try {
    // Retrieve all news articles from the database
    const Change = await HomeStructure.find();

    // Send the retrieved news articles as a response
    res.status(200).json(Change);
  } catch (error) {
    console.error('Error fetching Change:', error);
    res.status(500).json({
      message: 'Error fetching Change',
      error: error.message,
    });
  }
}

module.exports = {changeHome,getHomeChange};