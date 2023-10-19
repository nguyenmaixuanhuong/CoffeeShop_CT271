const db = require("../common/connect");

class Order{
    createOrder = async function(ordernew, result){
        db.query("INSERT INTO `coffee_shop`.`order` (`sdt`, `address`, `date`, `totalprice`, `status`) VALUES (?, ?, ?, ?, ?);",ordernew,
        function(err, result){
            if(err) console.log(err);
            else result(result);
        })
    }
    // getIdOrder = async function(order, result){
    //     db.query("select idorder from `coffee_shop`.`order`")
    // }
}

module.exports = new Order