const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.use('/listusers', userController.list_users);

module.exports = router;