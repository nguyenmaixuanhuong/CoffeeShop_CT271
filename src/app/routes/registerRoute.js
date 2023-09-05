const express = require('express');
const router = express.Router();
const registerController = require('../controllers/RegisterController');

router.post('/add', registerController.add_user)
router.use('/', registerController.index)


module.exports = router;