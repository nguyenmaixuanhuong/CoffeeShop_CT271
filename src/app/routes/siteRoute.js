const express = require('express');
const router = express.Router();
const AdminHomeController = require('../controllers/AdminHomeController')
const loginController = require("../controllers/LoginController")

router.use('/logout',loginController.logout);
router.get('/', AdminHomeController.statistical)
module.exports = router;