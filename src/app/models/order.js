const db = require("../common/connect");

class Order{
    // ham tạo 1 order mới vào database
    createOrder = async function(ordernew, result){
        db.query("INSERT INTO `coffee_shop`.`order` (`sdt`,`username`, `address`, `date`, `totalorder`, `statusorder`) VALUES (?,?, ?, ?, ?, ?);",ordernew,
        function(err, data){
            if(err) console.log(err);
             result(data);
        })
    }
    // hàm lấy idorder trong database
    getIdOrder = async function(order,result){
        db.query("select idorder from `coffee_shop`.`order` where sdt = ? and username = ? and address = ? and date = ? and totalorder = ? and statusorder = ?",order,
        function(err, data){
            if(err) console.log(err);
            result(data);
        })
    }
    // hàm thêm chi tiết đơn hàng vào database
    addOrderDetails = async function(product){
        db.query("INSERT INTO `coffee_shop`.`orderdetail` (`ìdorder`, `idproduct`, `size`, `number`, `price`) VALUES (?, ?, ?, ?, ?);",product,
        function(err){
            if(err) console.log(err);  
        })
    }
    // hàm lấy tất cả đơn hàng của user theo số điện thoại trong database
    getOrderUser= async function (phone, result){
        db.query("SELECT * FROM `order`  where sdt = ? ORDER BY idorder DESC",
        phone,function(err,data){
            if(err) console.log(err);
            result(data);
        })
    }
    // hàm lấy tất cả đơn hàng trong database
    getAllOrders = async function(result){
        db.query("SELECT * FROM `order` ORDER BY idorder DESC",function(err,data){
            if(err) console.log(err);
            result(data);
        });
    }
    // hàm lấy tất cả chi tiết đơn hàng của 1 đơn hàng theo id đơn hàng trong database
    getOrderDetails = async function(id,result){
        db.query("SELECT * FROM `orderdetail` , `order` o, `products` p where`orderdetail`.ìdorder = o.idorder and `orderdetail`.idproduct = p.idproduct and o.idorder = ?;"
        ,id,function(err, data){
            if(err) console.log(err);
            result(data);
        })
    }
    // hàm thay đổi trạng thái đơn hàng trong database
    confirmOrder = async function (id) {
        db.query("UPDATE `coffee_shop`.`order` SET `statusorder` = '1' WHERE (`idorder` = ?);",id,function(err, data){
            if(err) console.log(err);
            return;
        })
    }
}

module.exports = new Order