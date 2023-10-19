const express = require('express');
const router = express.Router();
const productsAPIController = require("../controllers/ProductsApiController")

router.use('/listproductsAPI',  productsAPIController.list_products_api);
router.use('/getproductAPI/:id', productsAPIController.get_product_api);

module.exports = router;