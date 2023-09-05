const express = require('express');
const router = express.Router();
const siteController = require('../controllers/SiteController')

router.use('/abouts', siteController.abouts);
router.use('/', siteController.home);
module.exports = router;