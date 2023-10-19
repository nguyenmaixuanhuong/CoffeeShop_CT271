const db = require("../common/connect");

class Cart{
    addCart = async (phoneUser)=>{
        db.query("INSERT INTO `coffee_shop`.`cart` (`sdt`) VALUES (?);",phoneUser,function(err,data){
            if(err) console.log(err);
            return data;
        })
    }
    findCart = async (phoneUser,result)=>{
        db.query("SELECT idcart FROM `coffee_shop`.`cart` WHERE `sdt` = ? ",phoneUser,function(err,data){
            if(err) console.log(err);
            return result(data);
        })
    }
    addCartDetails = async(cartDetail,result) =>{
        db.query("INSERT INTO `coffee_shop`.`cartdetails` (`idcart`, `idproduct`, `size`, `number`, `note`, `totalprice`) VALUES ? ",cartDetail,
        function(err,data){
            if(err){
                result("error")
            }
            result(data);
        })
    }
    findCartDetails = async(product,result) =>{
        db.query("SELECT * FROM `coffee_shop`.`cartdetails` WHERE `idcart` = ? and  `idproduct` = ? and `size` = ?",product,function(err,data){       
            result(data);
            // console.log(data);
        })
    }
    updateCartDetails = async(product,result) =>{
        db.query("UPDATE `coffee_shop`.`cartdetails` SET `number` = ?, `note` = ?, `totalprice` = ? WHERE (`idcart` = ?) and (`idproduct` = ?) and (`size` = ?);",product,function(err,data){
            if(err){ console.log(err);}
            result(data);
        })
    }
    getAllCartDetails = async(idcart,result) =>{
        db.query("SELECT * FROM cartdetails c ,  products p WHERE `idcart` = ? and c.idproduct = p.idproduct ;",idcart,function(err,data){
            if(err){ console.log(err);}
            result(data);
        })
    }
    deleteCartDetail = async(product,result) =>{
        db.query("DELETE FROM `coffee_shop`.`cartdetails` WHERE (`idcart` = ?) and (`idproduct` = ?) and (`size` = ?);",product,function(err,data){
            if(err){ result(err); }
            result(data);
        })
    }
}

module.exports = new Cart;