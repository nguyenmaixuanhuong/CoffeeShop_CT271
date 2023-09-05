const User = require("../models/user")
var validator = require('validator');
var crypto = require('crypto-js');

class RegisterControler {

  // GET /form
  index(req, res) {
    var message = {
      message: '',
      passwordError: ''
    }
    res.render('register', { message });
  }

  add_user(req, res) {
    var password = req.body.password;
    var passwordHash = crypto.AES.encrypt(password, 'thisissecret').toString();
    var user = [[req.body.phone, req.body.name, passwordHash]]

    const message = {
      message: '',
      passwordError: '',
      phoneError: '',
      invalidPhone: '',
    }
    User.findUser(req.body.phone,(data)=>{
      if(data.length > 0){
        message.phoneError = 'Số điện thoại đã tồn tại'
        return res.render('register', { message });
      }
      if(!validator.isMobilePhone(req.body.phone,'vi-VN')){
        message.invalidPhone = 'Số điện thoại không hợp lệ'
        return res.render('register', { message });
      }
      if(password.length > 20 || password.length < 6)  {
        message.passwordError = 'Mật khẩu phải từ 6 - 20 kí tự'
        return res.render('register', { message });
      }   
      User.addUser([user]);
      message.message = 'Bạn đã đăng kí tài khoản thành công'
      return res.render('register', { message });
  
   });
    
  }




}

module.exports = new RegisterControler;