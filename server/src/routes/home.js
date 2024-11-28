const express = require('express');
const { changeHome } = require('../controllers/home');
const router = express.Router();



router.post("/homeui",changeHome)

module.exports = router