const User = require("../models/user")
var validator = require('validator');
var crypto = require('crypto-js');
const Cart = require('../models/cart');
class RegisterControler {


  add_user(req, res) {
    var password = req.body.password;
    var passwordHash = crypto.AES.encrypt(password, 'thisissecret').toString();
    var user = [[req.body.phone, req.body.name, passwordHash,0]]

    var message = '';
    User.findUser(req.body.phone, async (data)=>{
      if(data.length > 0){
        message = 'Số điện thoại đã tồn tại'
        return res.status(401).send(message)
      }
      if(!validator.isMobilePhone(req.body.phone,'vi-VN')){
        message = 'Số điện thoại không hợp lệ'
         return res.status(401).send(message)
      }
      if(password.length > 20 || password.length < 6)  {
        message = 'Mật khẩu phải từ 6 - 20 kí tự'
         return res.status(401).send(message)
      }   
      await User.addUser([user]);
      const phone = req.body.phone;
      await Cart.addCart(phone);
      message = 'Bạn đã đăng kí tài khoản thành công'
      return res.status(200).send(message)
  
   });
    
  }
}

module.exports = new RegisterControler;