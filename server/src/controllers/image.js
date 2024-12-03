const path = require("path");

const uploadController = (req, res) => {
  // Get the upload type dynamically (e.g., 'news' or 'home')
  const uploadType = req.route.path.includes('news') ? 'news' : 'home';

  // Check if files are uploaded
  const files = req.files || (req.file ? [req.file] : []);

  if (files.length === 0) {
    return res.status(400).json({ success: 0, message: "No files uploaded!" });
  }

  // Map through the uploaded files to get their URLs
  const imageUrls = files.map((file) => {
    // Create a dynamic URL path based on the upload type
    const folder = uploadType === 'news' ? 'news' : 'home';
    return `${req.protocol}://${req.get("host")}/uploads/${folder}/${file.filename}`;
  });

  res.json({
    success: 1,
    image_urls: imageUrls, // Return an array of image URLs
  });
};

module.exports = { uploadController };
