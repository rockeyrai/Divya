const express = require('express');
const { addNews, getNews, removeNews } = require('../controllers/news');
const { uploadController } = require('../controllers/image');
const upload = require('../middleware/imageHandler');
const router = express.Router();

router.get('/newslist',getNews)
router.post('/addnews',addNews)
router.post('/uploadnews', upload.single('news'), uploadController);
router.post('/removenews',removeNews)

module.exports = router