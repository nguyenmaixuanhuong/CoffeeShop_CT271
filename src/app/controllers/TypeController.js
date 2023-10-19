const Product = require('../models/product')

class TypeController {
    getAllType = function(req,res){
        Product.get_all_type((type) => {
            res.render('addProduct',type);
        })          
        }}
module.exports = TypeController;