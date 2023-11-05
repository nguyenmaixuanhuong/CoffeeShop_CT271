const Order = require('../models/order');
const Cart = require('../models/cart');
class OrderController {
    async createOrder(req, res) {
        try {
            const phone = req.query.phone;
            const username = req.query.username;
            const address = req.query.address;
            const date = req.query.date;
            const totalorder = req.query.totalorder;
            const statusorder = req.query.status;
            const products = req.query.products;
            const order = [phone, username, address, date, totalorder, statusorder];
            await Order.createOrder(order, result => {
                if (result) {
                    Order.getIdOrder(order, data => {
                        const orderId = data[0].idorder;
                        products.forEach(async product => {
                           await Order.addOrderDetails([orderId, product.idproduct, product.size,product.number, product.totalprice]);
                           await Cart.deleteCartDetail([product.idcart, product.idproduct,product.size])
                        });
                    })
                }
            });
           
            res.status(200).send('Bạn đã đặt hàng thành công');
        } catch (err) {
            console.log(err);
            res.status(500).send("Xin lỗi hệ thống Đã có lỗi xảy ra");
        }
    }
   async getAllOrders(req, res, next) {
    try {
        await Order.getAllOrders(data =>{
            res.render('listorders', { title: 'Orders', layout: './layouts/admin_main', data: data});
        })
    } catch (error) {
        console.log(error);
    }
   }

   async getOrderDetails(req, res, next) {
    try {
        const id = req.params.id;
        await Order.getOrderDetails(id,data =>{
            res.render('orderDetails', { title: 'Orders', layout: './layouts/admin_main', data: data});
        })
    } catch (error) {
        console.log(error);
    }
   }
  async confirmOrder(req, res, next)  {
    try {
        const id = req.params.id;
        await Order.confirmOrder(id);
        res.redirect('/admin/order/listorders')
    } catch (error) {
        console.log(error);
    }
  }
}

module.exports = new OrderController