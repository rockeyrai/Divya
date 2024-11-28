const express = require('express');
const { changeHome, getHomeChange } = require('../controllers/home');
const router = express.Router();

router.post("/homeui",changeHome)
router.get('/homeui',getHomeChange)

module.exports = router