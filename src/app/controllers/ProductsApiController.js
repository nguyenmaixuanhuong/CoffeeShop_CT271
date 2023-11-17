const Product = require('../models/product')

class ProductsAPIController{
    // hàm gửi API tất cả sản phẩm
    list_products_api(req, res) {
        Product.get_all_productsAPI((data) => {
            try {
                res.send(data);
            }catch (err) {
                res.sendError(err);
            }
        })
    }
    // hàm gửi API chi tiết sản phẩm theo id sản phẩm
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