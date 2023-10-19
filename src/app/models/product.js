const db = require("../common/connect");
const util = require('node:util');
const query = util.promisify(db.query).bind(db);
class Product{
    constructor(id,name,price,image,id_type){
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.id_type = id_type;
    }

        // Ham lay tat ca san pham trong CSDL
    get_all_products = async function(page,result){
        let limit = 5;
        let start = (page - 1) * limit;
        var totalRow = 0;
        let rowData = await query("SELECT count(*) as total FROM products");
        totalRow = rowData[0].total;
        let totalPage = Math.ceil(totalRow / limit);
        await db.query(`SELECT * FROM products LIMIT ${start},${limit}`,function(err,data){
            if(err){
                console.log(err);
            }
            result(data,totalPage);
        });
    }
    // Ham gui API san pham len server
    get_all_productsAPI = async function(result){
        await db.query(`SELECT * FROM products`,function(err,data){
            if(err){
                console.log(err);
            }
            result(data);
        });
    }
    // Ham them san pham
    add_product = function(newProduct){
        db.query("INSERT INTO `coffee_shop`.`products` ( `productName`, `productImage`,`description`,`idtype`,`productPricesizeM`,`productPricesizeL`) VALUES ?;",newProduct,function(err){
            if(err){
                console.log(err);
            }
       return;
        })
    }
    // Ham xoa san pham
    delete_product = function(id){
        db.query("DELETE FROM `coffee_shop`.`products` WHERE idproduct = ?",id,function(err){
            if(err){
               console.log(err);
            }
            return;
        });
    }
    // Ham lay san pham dua tren id
    get_product = function(id,result){
        db.query('SELECT * FROM `coffee_shop`.`products` WHERE idproduct = ?',id,function(err,data){
            if(err){
                console.log(err);
            }
        result(data);
        })
    }
    // Ham cap nhat san pham
    update_product = function(productName,productImage,description,idType,productPricesizeM,priceProductL,id){
        db.query("UPDATE `coffee_shop`.`products` SET `productName` = ?,  `productImage` = ?,`description` = ?, `idtype` = ?,`productPricesizeM` = ?,`productPricesizeL` = ? WHERE (`idproduct` = ?);"
        ,[productName,productImage,description,idType,productPricesizeM,priceProductL,id],function(err,result){
            if(err){
                console.log(err);
            }
            console.log(result);
        })
    }
    // Ham cap nhat san pham khong thay hinh anh
    update_product_noImg = function(productName,description,idType,productPricesizeM,priceProductL,id){
        db.query("UPDATE `coffee_shop`.`products` SET `productName` = ?,  `description` = ?, `idtype` = ?,`productPricesizeM` = ?,`productPricesizeL` = ? WHERE (`idproduct` = ?);"
        ,[productName,description,idType,productPricesizeM,priceProductL,id],function(err,result){
            if(err){
                console.log(err);
            }
            console.log(result);
        })
    }

    // Ham lay danh sach san pham theo loai
    get_product_type = function(idType,result){
        db.query("SELECT * FROM `coffee_shop`.`products` WHERE idtype = ?;",idType,function(err,data){
            if(err){
                console.log(err);
            }
            result(data);
        });
    }
    get_all_type = async function(result){
       await db.query("SELECT * FROM product_types;",function(err,data){
            if(err){
                console.log(err);
            }
            result(data);
        });
    }
}

module.exports = new Product;