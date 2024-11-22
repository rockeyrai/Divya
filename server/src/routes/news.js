const express = require('express');
const { addNews, getNews } = require('../controllers/news');
const { uploadController } = require('../controllers/image');
const upload = require('../middleware/imageHandler');
const router = express.Router();

router.get('/newslist',getNews)
router.post('/addnews',addNews)
router.post('/upload', upload.single('product'), uploadController);

module.exports = router