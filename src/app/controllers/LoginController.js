const User = require("../models/user")
var validator = require('validator');
var crypto = require('crypto-js');
const Cart = require('../models/cart');
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
            invalidPhone:'',
            notAllowed: '',
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
            if(data[0].rule =='1'){
                return res.render('admin',{layout: './layouts/admin_main'})
            }
            else{
                message.notAllowed = "Bạn không có quyền truy cập vào đây"
                return res.render('login', { message });
            }
        })
    }
    checkUserAPI(req, res) {
        const phone = req.body.phone;
        const password = req.body.password;    
        var message ="Số điện thoại hoặc mật khẩu không chính xác";   
        User.findUser(phone, (data) => {
            if(!validator.isMobilePhone(req.body.phone,'vi-VN')){
                return res.status(403).send(message)
              }    
            if (data.length <= 0) {
                return res.status(403).send(message);
            }
            var bytes = crypto.AES.decrypt(data[0].password, 'thisissecret');
            var password_decode = bytes.toString(crypto.enc.Utf8);
            if(password_decode !== password){
                return res.status(403).send(message)
            }      
            return res.send({username: data[0].username, phone: data[0].sdt});
        })
    }
   

}

module.exports = new LoginController;