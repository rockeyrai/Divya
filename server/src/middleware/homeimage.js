const fs = require("fs");
const path = require("path");

const removehomeimage = async (req, res) => {
  const { id } = req.params; // The ID is the image name, e.g., "homeImage_1732964449628.jpg"

  try {
    if (id.startsWith("homeImage_")) {
      // Construct the file path
      const filePath = path.join(__dirname, "..", "..", "upload", "home");

      // Check if the file exists
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "File not found" });
      }

      // If file exists, delete it
      await fs.promises.rm(filePath, { recursive: true, force: true });

      console.log(`File deleted successfully: ${filePath}`);
      return res.status(200).json({ message: "File deleted successfully" });
    } else {
      return res.status(400).json({ error: "Invalid file ID" });
    }
  } catch (error) {
    console.error("Error handling delete request:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = removehomeimage;
