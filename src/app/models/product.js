const db = require("../common/connect");

class Product{
    constructor(id,name,price,image,id_type){
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.id_type = id_type;
    }

    get_all_products = function(result){
        db.query("SELECT * FROM products",function(err,data){
            if(err){
                console.log(err);
            }
            result(data);
        });
    }
    add_product = function(newProduct){
        db.query("INSERT INTO `coffee_shop`.`products` ( `productName`, `productPrice`, `productImage`, `idtype`) VALUES ?;",newProduct,function(err,data){
            if(err){
                console.log(err);
            }
        return;
        })
    }
    delete_product = function(id){
        db.query("DELETE FROM `coffee_shop`.`products` WHERE idproduct = ?",id,function(err){
            if(err){
               console.log(err);
            }
            return;
        });
    }
    get_product = function(id,result){
        db.query('SELECT * FROM `coffee_shop`.`products` WHERE idproduct = ?',id,function(err,data){
            if(err){
                console.log(err);
            }
        result(data);
        })
    }
    update_product = function(productName,productPrice,productImage,idType,id){
        db.query("UPDATE `coffee_shop`.`products` SET `productName` = ?, `productPrice` = ?, `productImage` = ?, `idtype` = ? WHERE (`idproduct` = ?);"
        ,[productName,productPrice,productImage,idType,id],function(err,result){
            if(err){
                console.log(err);
            }
            console.log(result);
        })
    }
    update_product_noImg = function(productName,productPrice,idType,id){
        db.query("UPDATE `coffee_shop`.`products` SET `productName` = ?, `productPrice` = ?, `idtype` = ? WHERE (`idproduct` = ?);"
        ,[productName,productPrice,idType,id],function(err,result){
            if(err){
                console.log(err);
            }
            console.log(result);
        })
    }
}

module.exports = new Product;