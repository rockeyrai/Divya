const HomeStructure = require("../models/homeModels");

const changeHome =  async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Update the record in the database
    const result = await HomeStructure.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
    });

    if (!result) {
      return res.status(404).json({ message: "Record not found." });
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update record.", error });
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