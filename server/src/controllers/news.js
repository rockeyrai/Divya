const News = require('../models/newsModels'); // Assuming the News model is in the 'models/news.js' file

// Add a new news article
const addNews = async (req, res) => {
  try {
    // Extract the news data from the request body
    const { title, content, source, tags, image } = req.body;

    // Create a new news article using the News model
    const newNews = new News({
      title,
      content,
      source,
      tags,
      image,
    });

    // Save the new news article to the database
    await newNews.save();

    // Send a success response
    res.status(201).json({
      message: 'News article added successfully!',
      news: newNews,
    });
  } catch (error) {
    console.error('Error adding news:', error);
    res.status(500).json({
      message: 'Error adding news article',
      error: error.message,
    });
  }
};

// Get all news articles
const getNews = async (req, res) => {
  try {
    // Retrieve all news articles from the database
    const newsArticles = await News.find();

    // Send the retrieved news articles as a response
    res.status(200).json(newsArticles);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({
      message: 'Error fetching news articles',
      error: error.message,
    });
  }
};


const removeNews = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log the request to verify the received ID

    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "ID is required" });
    }

    // Use `_id` for deletion
    const result = await News.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ success: false, message: "News not found" });
    }

    console.log("Removed document:", result);
    res.json({
      success: true,
      message: "News removed successfully",
    });
  } catch (error) {
    console.error("Error removing news:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


module.exports = { addNews, getNews,removeNews };
