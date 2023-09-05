const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');

router.use('/listusers', adminController.list_users);
router.use('/listproducts', adminController.list_products);
router.use('/pageAddproduct', adminController.page_product);
router.use('/addProduct', adminController.add_product);
router.get('/deleteProduct/:id', adminController.delete_product);
router.use('/pageUpdateproduct/:id', adminController.page_update_product);
router.use('/updateProduct/:id', adminController.update_product);
router.use('/', adminController.index);


module.exports = router;