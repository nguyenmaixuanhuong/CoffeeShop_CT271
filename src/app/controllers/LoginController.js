const User = require("../models/user")
var validator = require('validator');
var crypto = require('crypto-js');

class LoginController {
    index(req, res) {
        const message = {
            message: '',
            passwordError:'', 
            invalidPhone:''
        }
        res.render('login',{ message });
    }
    
  
    checkUser(req, res) {
        const phone = req.body.phone;
        const password = req.body.password;
       
        const message = {
            message: '',
            passwordError:'', 
            invalidPhone:''
        }
        User.findUser(phone, (data) => {
            if(!validator.isMobilePhone(req.body.phone,'vi-VN')){
                message.invalidPhone = 'Số điện thoại không hợp lệ'
                return res.render('login', { message });
              }    
            if (data.length <= 0) {
                message.message = "Số điện thoại chưa đăng kí tài khoản"
                return res.render('login', { message });
            }
            var bytes = crypto.AES.decrypt(data[0].password, 'thisissecret');
            var password_decode = bytes.toString(crypto.enc.Utf8);
    
            if(password_decode !== password){
                message.passwordError = "Số điện thoại hoặc mật khẩu không chính xác"
                return res.render('login', { message });
            }
            return res.render('home')
        })
    }
   

}

module.exports = new LoginController;