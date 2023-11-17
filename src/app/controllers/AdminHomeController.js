const Product = require('../models/product')
const User = require("../models/user")
const Order = require('../models/order');
class AdminHomeController{
    // hàm lấy số lượng thống kê sản phẩm, 
    // khách hàng trong cửa hàng
    //  và đơn hàng chưa duyệt
   async statistical(req, res, next){
    var totalUser = 0;
    var ordernew = 0;
    var totalProduct = 0;
        Product.get_all_productsAPI(products =>{
            totalProduct = products.length
            User.get_all('',users=>{
                totalUser = users.length
                Order.getAllOrders(orders =>{
                    orders.forEach(order => {
                        if(order.statusorder == 0){
                            ordernew++;
                        }                
                    });
                    res.render('admin',{ title: 'AdminHome', layout: './layouts/admin_main',  totalUser, totalProduct,ordernew})
                })
            })
        })
    }
}
module.exports = new AdminHomeController;