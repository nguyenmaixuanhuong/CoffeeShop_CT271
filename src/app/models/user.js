const db = require("../common/connect");
const util = require('node:util');
const query = util.promisify(db.query).bind(db);

class User {
    // hàm lấy danh sách tất cả user trong database
     get_all = async function (page, results) {
        if(page){
            let limit = 10;
            let start = (page - 1) * limit;
            var totalRow = 0;
            let rowData = await query("SELECT count(*) as total FROM user");
            totalRow = rowData[0].total;
            let totalPage = Math.ceil(totalRow / limit);
            await db.query(`SELECT * FROM user LIMIT ${start},${limit}`, function (err, data) {
                if (err) {
                    console.log(err);
                }
                results(data, totalPage);
            });
        }
        else{
            await db.query(`SELECT * FROM user `, function (err, data) {
                if (err) {
                    console.log(err);
                }
                results(data);
            });
        }

    }
    // hàm thêm 1 user mới vào database
    addUser = function (new_user) {
        db.query("INSERT INTO `coffee_shop`.`user` ( `sdt`, `username`, `password`,`rule`) VALUES ?", new_user, function (err) {
            if (err) {
                console.log(err);
            }
            
        })
    }
    // hàm lấy tất cả thông tin của user
    findUser = function (phone, result) {
        db.query("SELECT * FROM user WHERE sdt = ?", phone, function (err, data) {
            if (err) {
                console.log(err);
                return 0;
            }
            result(data);
        })
    }
}



module.exports = new User;