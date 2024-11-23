const fs = require('fs');
const path = require('path');


const removeLocalImage = (filename) => {
  // Adjust the path to correctly point to the `upload/images` directory
  const filePath = path.join(__dirname, '..', '..', 'upload', 'images', filename);

  // Log the constructed file path for debugging
  console.log("Attempting to delete file at path:", filePath);

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`File not found: ${filePath}`);
      return;
    }

    // Delete the file
    fs.unlink(filePath, (unlinkErr) => {
      if (unlinkErr) {
        console.error(`Error deleting file: ${unlinkErr.message}`);
      } else {
        console.log(`File deleted successfully: ${filePath}`);
      }
    });
  });
};


module.exports = removeLocalImage


