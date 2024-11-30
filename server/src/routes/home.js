const express = require('express');
const { changeHome, getHomeChange } = require('../controllers/home');
const router = express.Router();
const { uploadController } = require('../controllers/image');
const upload = require('../middleware/imageHandler');

router.post("/homeui",changeHome)
router.get('/homeui',getHomeChange)
router.post('/uploadhome',  upload.array('homeImage', 5), uploadController);

module.exports = router