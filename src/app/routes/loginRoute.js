const express = require('express');
const router = express.Router();
const loginController = require("../controllers/LoginController")

router.post('/check',loginController.checkUser);
router.use('/', loginController.index);
module.exports = router;