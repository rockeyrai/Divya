const express = require('express');
const { changeHome, getHomeChange } = require('../controllers/home');
const router = express.Router();
const { uploadController } = require('../controllers/image');
const upload = require('../middleware/imageHandler.js');
const removehomeimage = require('../middleware/homeimage');

router.patch("/homeui/:id",changeHome)
router.get('/homeui',getHomeChange)
router.post('/uploadhome',  upload.array('homeImage', 5), uploadController);
router.delete("/homeui/:id", removehomeimage);

module.exports = router