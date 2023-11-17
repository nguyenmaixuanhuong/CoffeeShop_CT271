const { mode } = require('crypto-js');
const Cart = require('../models/cart');
const cart = require('../models/cart');

class CartController {
    // Hàm tìm id cart của user
    getCart(req, res) {
        Cart.findCart([req.params.phone], (data) => {
            if (data) {
                res.status(200).send({ id: data[0].idcart });
            }
            else {
                res.send("Không tìm thấy cart này");
            }
        })
    }
    // Hàm thêm cartdetails
    async addCartDetails(req, res) {
        const cartDetail = [req.body.idcart, req.body.idproduct, req.body.size];
        // tìm xem đã có cartdetails chưa, nếu có sẽ cập nhật lại số lượng
        await Cart.findCartDetails(cartDetail, (data) => {
            if (data[0] != undefined) {
                const number = data[0].number + req.body.number;
                const price = data[0].totalprice + req.body.totalprice;
                const productUpdate = [number, req.body.note, price, req.body.idcart, req.body.idproduct, req.body.size]
                Cart.updateCartDetails(productUpdate, result => {
                    return res.status(200).send("Them vao gio hang thanh cong")
                })
            }
            // nếu chưa có trong cartdetails thì sẽ thêm vào
            else {
                const cartdetails = [[req.body.idcart, req.body.idproduct, req.body.size, req.body.number, req.body.note, req.body.totalprice]];
                Cart.addCartDetails([cartdetails]);
                return res.status(200).send("Them vao gio hang thanh cong")
            }
        })
    }
    // Hàm update cartdetails
    async updateCartDetails(req, res) {
        try {
            Cart.updateCartDetails(req.body, result => {
                return res.status(200).send("Cập nhật thành công")
            })
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    }
    // Hàm gửi API tất cả cartdetails của user 
    async getAllCartDetailsAPI(req, res) {
        const idcart = req.params.idcart;
        Cart.getAllCartDetailsAPI([idcart], (data) => {
            res.status(200).send(data);
        });
    }
    // Hàm xóa cartdetails 
    async deleteCartDetail(req, res) {
        console.log(req.query);
        const cartDetail = [req.query.idcart, req.query.idproduct, req.query.size];
        await Cart.deleteCartDetail(cartDetail);
        res.status(200).send("Xoa san pham trong gio hang")
    }

}



module.exports = new CartController;