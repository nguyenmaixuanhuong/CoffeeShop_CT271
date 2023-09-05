const db = require("../common/connect");

class User{
    constructor(sdt, username, password) {
        this.sdt = sdt;
        this.username = username;
        this.password = password;
    }

    get_all = function (results) {
        db.query("SELECT * FROM user", function (err, data) {
            if (err) {
                results(null)
                return;
            }
            results(data);
        });
    
    }
    addUser = function (new_user) {
        db.query("INSERT INTO `coffee_shop`.`user` ( `sdt`, `username`, `password`) VALUES ?",new_user,function (err) {
            if (err) {
                console.log(err);
            }
        return;
        })
    }
    findUser = function(phone,result) {
        db.query("SELECT * FROM user WHERE sdt = ?",phone,function(err,data){
            if (err) {
                console.log(err);
                return 0;
            }
           result(data);
        })
    }
}



module.exports = new User;