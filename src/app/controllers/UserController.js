const User = require("../models/user")

class UserController{
     //hàm lấy danh sách tất cả tài khoản user
     list_users(req, res) {
        let page = req.query.page;
        page = page > 0 ? Math.floor(page) : 1;
        User.get_all(page, (data, totalPage) => {
            try {
                res.render('listUsers', { layout: './layouts/admin_main', data: data, totalPage: totalPage, page: page });
            }
            catch (err) {
                res.sendError(err);
            }
        })
    }
}
module.exports = new UserController;