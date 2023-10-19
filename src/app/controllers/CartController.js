const { mode } = require('crypto-js');
const Cart = require('../models/cart');

class CartController {
    getCart(req, res) {
        Cart.findCart([req.params.phone], (data) => {
            if(data) {
                res.send(data);
                console.log(data);
            }
            else {
                res.send("Không tìm thấy cart này");
            }
        })
    }

   async addCartDetails(req, res) {
        const cartDetail = [req.body.idcart, req.body.idproduct, req.body.size];
        await Cart.findCartDetails(cartDetail,(data)=>{
            if(data[0] != undefined){
                const number = data[0].number + req.body.number;
                const price = data[0].totalprice + req.body.totalprice;
                const productUpdate = [number , req.body.note,price,req.body.idcart, req.body.idproduct, req.body.size]
                Cart.updateCartDetails(productUpdate,result =>{
                    if(result)  res.status(200).send('Them vao gio hang thanh cong')
                })
            }
            else{
                const cartdetails = [[req.body.idcart, req.body.idproduct, req.body.size, req.body.number, req.body.note, req.body.totalprice]];
                Cart.addCartDetails([cartdetails],(result)=>{
                    res.status(200).send('Them vao gio hang thanh cong')
                })
            }
        })
   }
   async getAllCartDetails(req, res){
        const idcart = req.params.idcart;
        Cart.getAllCartDetails([idcart],(data)=>{
            res.status(200).send(data);
        });
   } 
   async deleteCartDetail(req, res){
        console.log(req.query);
    const cartDetail = [req.query.idcart, req.query.idproduct, req.query.size];
    Cart.deleteCartDetail(cartDetail,(result)=>{
        res.status(200).send(result);
    })
   }

}



module.exports = new CartController;