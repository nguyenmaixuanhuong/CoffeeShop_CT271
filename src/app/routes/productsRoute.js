const express = require('express');
const router = express.Router();
const productsController = require("../controllers/ProductsController")

router.use('/listproducts', productsController.list_products);
router.use('/pageAddproduct', productsController.page_add_product);
router.use('/addProduct', productsController.add_product);
router.use('/deleteProduct/:id', productsController.delete_product);
router.use('/pageUpdateproduct/:id', productsController.page_update_product);
router.use('/updateProduct/:id', productsController.update_product);
router.use('/', productsController.index);

module.exports = router;