const Product = require('../models/product')

class ProductsAPIController{
    list_products_api(req, res) {
        Product.get_all_productsAPI((data) => {
            try {
                res.send(data);
            }catch (err) {
                res.sendError(err);
            }
        })
    }
    get_product_api(req, res) {
        const id = req.params.id
        Product.get_product(id,(data) => {
            try{
                res.send(data);
            }catch(err) {
                res.sendError(err);
            }
        })
    }

}
module.exports = new ProductsAPIController;