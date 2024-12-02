const fs = require("fs");
const path = require("path");

/**
 * Deletes a specific image from the `upload/news` folder.
 *
 * @param {string} imageName - The name of the image to delete.
 * @returns {Promise<string>} - Resolves with a success message or rejects with an error message.
 */
const deleteNewsImage = (imageName) => {
  return new Promise((resolve, reject) => {
    // Define the full path to the image
    const newsFolderPath = path.join(__dirname, "..", "..", "upload", "news");
    const imagePath = path.join(newsFolderPath, imageName);

    // Check if the file exists
    fs.access(imagePath, fs.constants.F_OK, (err) => {
      if (err) {
        return reject(`File not found: ${imagePath}`);
      }

      // Delete the file
      fs.unlink(imagePath, (unlinkErr) => {
        if (unlinkErr) {
          return reject(`Error deleting file: ${unlinkErr.message}`);
        }

        resolve(`File deleted successfully: ${imagePath}`);
      });
    });
  });
};

module.exports = deleteNewsImage;
