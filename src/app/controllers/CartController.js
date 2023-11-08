const { mode } = require('crypto-js');
const Cart = require('../models/cart');
const cart = require('../models/cart');

class CartController {
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

    async addCartDetails(req, res) {
        const cartDetail = [req.body.idcart, req.body.idproduct, req.body.size];
        await Cart.findCartDetails(cartDetail, (data) => {
            if (data[0] != undefined) {
                const number = data[0].number + req.body.number;
                const price = data[0].totalprice + req.body.totalprice;
                const productUpdate = [number, req.body.note, price, req.body.idcart, req.body.idproduct, req.body.size]
                Cart.updateCartDetails(productUpdate, result => {
                    return res.status(200).send("Them vao gio hang thanh cong")
                })
            }
            else {
                const cartdetails = [[req.body.idcart, req.body.idproduct, req.body.size, req.body.number, req.body.note, req.body.totalprice]];
                Cart.addCartDetails([cartdetails]);
                return res.status(200).send("Them vao gio hang thanh cong")
            }
        })
    }
    async updateCartDetails(req, res) {
        try {
            Cart.updateCartDetails(req.body, result => {
                return res.status(200).send("Them vao gio hang thanh cong")
            })
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    }
    async getAllCartDetailsAPI(req, res) {
        const idcart = req.params.idcart;
        Cart.getAllCartDetailsAPI([idcart], (data) => {
            res.status(200).send(data);
        });
    }

    async deleteCartDetail(req, res) {
        console.log(req.query);
        const cartDetail = [req.query.idcart, req.query.idproduct, req.query.size];
        await Cart.deleteCartDetail(cartDetail);
        res.status(200).send("Xoa san pham trong gio hang")
    }

}



module.exports = new CartController;