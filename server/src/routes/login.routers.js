const express = require('express');
const router = express.Router();

const loginController = require('../controllers/login.controllers')
router.post("/", loginController.checkUser)
module.exports = router