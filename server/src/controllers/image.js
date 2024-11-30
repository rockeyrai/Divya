

const uploadController = (req, res) => {
  // Check if files are uploaded (single or multiple)
  const files = req.files || (req.file ? [req.file] : []);

  if (files.length === 0) {
    return res.status(400).json({ success: 0, message: 'No files uploaded!' });
  }

  // Map through the uploaded files to get their URLs
  const imageUrls = files.map(file => `${req.protocol}://${req.get('host')}/images/${file.filename}`);

  res.json({
    success: 1,
    image_urls: imageUrls,  // Return an array of image URLs
  });
};

module.exports = { uploadController };

