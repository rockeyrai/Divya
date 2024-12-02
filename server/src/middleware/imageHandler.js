const multer = require('multer');
const path = require('path');

// Configure multer storage dynamically
const fs = require('fs');

// Ensure directory exists
const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true }); // Create directory if it doesn't exist
  }
};

// Modify the destination callback
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Check if the fieldname is 'homeImage' and set a fixed path for that
    if (file.fieldname === 'homeImage') {
      const uploadPath = './upload/home';
      ensureDirectoryExists(uploadPath); // Ensure directory exists before storing
      cb(null, uploadPath);
    } else {
      // Default path for other fields (optional)
      const uploadPath = './upload/news';
      ensureDirectoryExists(uploadPath); // Ensure directory exists before storing
      cb(null, uploadPath);
    }
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});



// Create the upload middleware
const upload = multer({ storage: storage });

module.exports = upload;