const News = require('../models/newsModels'); // Assuming the News model is in the 'models/news.js' file
const fs = require('fs');
const path = require('path');
const removeLocalImage = require('../middleware/removelocal');

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
  const { id } = req.body;

  try {
    const newsItem = await News.findById(id);

    if (!newsItem) {
      return res.status(404).json({ error: "News not found" });
    }

    const imageFilename = newsItem.image.split('/').pop();

    removeLocalImage(imageFilename)

    // Delete the news entry from the database
    await News.findByIdAndDelete(id);

    // Send the success response
    return res.status(200).json({ message: "News item and image deleted successfully" });
  } catch (error) {
    console.error("Error removing news:", error);

    // Ensure only one response is sent
    if (!res.headersSent) {
      return res.status(500).json({ error: "Failed to remove news" });
    }
  }
};




module.exports = { addNews, getNews,removeNews };
