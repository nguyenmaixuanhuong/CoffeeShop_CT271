const db = require("../common/connect");

class Cart{
    // hàm tạo cart của user vào database
    addCart = async (phoneUser)=>{
        db.query("INSERT INTO `coffee_shop`.`cart` (`sdt`) VALUES (?);",phoneUser,function(err,data){
            if(err) console.log(err);
            return data;
        })
    }
    // hàm tìm id cart của user trong database
    findCart = async (phoneUser,result)=>{
        db.query("SELECT idcart FROM `coffee_shop`.`cart` WHERE `sdt` = ? ",phoneUser,function(err,data){
            if(err) console.log(err);
             result(data);
        })
    }
    // hàm thêm cartdeteils vào database
    addCartDetails = async(cartDetail) =>{
        db.query("INSERT INTO `coffee_shop`.`cartdetails` (`idcart`, `idproduct`, `size`, `number`, `note`, `totalprice`) VALUES ? ",cartDetail,
        function(err,data){
            if(err){
               console.log(err);
            }
        })
    }
    // hàm thêm cartdetails trong database
    findCartDetails = async(product,result) =>{
        db.query("SELECT * FROM `coffee_shop`.`cartdetails` WHERE `idcart` = ? and  `idproduct` = ? and `size` = ?",product,function(err,data){       
            result(data);
            // console.log(data);
        })
    }
    // hàm cập nhật cartdetails trong database
    updateCartDetails = async(product,result) =>{
        db.query("UPDATE `coffee_shop`.`cartdetails` SET `number` = ?, `note` = ?, `totalprice` = ? WHERE (`idcart` = ?) and (`idproduct` = ?) and (`size` = ?);",product,function(err,data){
            if(err){ console.log(err);}
            result(data);
        })
    }
    // hàm lấy tất cả cartdetails theo idcart trong database
    getAllCartDetailsAPI = async(idcart,result) =>{
        db.query("SELECT * FROM cartdetails c ,  products p WHERE `idcart` = ? and c.idproduct = p.idproduct ;",idcart,function(err,data){
            if(err){ console.log(err);}
            result(data);
        })
    }
    // hàm lấy thông tin chi tiết của các sản phẩm trong cartdetails trong database
    getProductInCart = async(id,result) =>{
        db.query("SELECT * FROM cartdetails c ,  products p WHERE c.idproduct = p.idproduct and c.idproduct = ?;",id,function(err,data){
            if(err){ console.log(err);}
            result(data);
        })
    }
    // hàm xóa cartdetails trong database
    deleteCartDetail = async(product) =>{
        db.query("DELETE FROM `coffee_shop`.`cartdetails` WHERE (`idcart` = ?) and (`idproduct` = ?) and (`size` = ?);",product,function(err,data){
            if(err){ console.log(err); }
        })
    }
    
}

module.exports = new Cart;