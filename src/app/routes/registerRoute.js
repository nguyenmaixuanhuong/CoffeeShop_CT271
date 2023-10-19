const express = require('express');
const router = express.Router();
const registerController = require('../controllers/RegisterController');

router.post('/addUser', registerController.add_user)



module.exports = router;