const express = require('express');
const { addNews, getNews } = require('../controllers/news');
const router = express.Router();

router.get('/newslist',getNews)
router.post('/addnews',addNews)

module.exports = router