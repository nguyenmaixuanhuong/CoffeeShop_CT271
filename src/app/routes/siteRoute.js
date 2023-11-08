const express = require('express');
const router = express.Router();
const AdminHomeController = require('../controllers/AdminHomeController')
router.get('/', AdminHomeController.statistical)
module.exports = router;