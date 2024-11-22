const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the news article
const newsSchema = new Schema({
  title: { type: String, required: true }, // Title of the news article
  content: { type: String, required: true }, // Main content of the article
  srource: { type: String, required: true }, // Author of the news article
  tags: { type: [String], default: [] }, // Tags related to the news article (array of strings)
  date: { type: Date, default: Date.now }, // Date of the news article creation, defaults to the current date
  image: { type: String, default: '' }, // URL or path to an image related to the news
  // You can add other fields as needed, such as source, category, etc.
});

// Create the model for the 'news' collection
const News = mongoose.model('News', newsSchema);

module.exports = News;
