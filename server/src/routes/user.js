const express = require('express');
const { userRegister, userData, userLogin, senduserdata, removeUser } = require('../controllers/user');
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.post('/register',userRegister)
// router.get('/userdata', userData)
router.post('/login',userLogin)
router.get("/user/:phoneNumber", verifyToken, userData);
router.get("/user",senduserdata)
router.delete('/user/:id',removeUser)

module.exports = router