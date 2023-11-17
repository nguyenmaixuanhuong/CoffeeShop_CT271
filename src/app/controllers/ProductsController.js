const Product = require('../models/product')
const bodyParser = require('body-parser');
const path = require('path');
const root = require('app-root-path')
const Cart = require('../models/cart')
var fs = require('fs');

class ProductsController {
    index(req, res) {
        res.render('admin', { title: 'AdminPage', layout: './layouts/admin_main' });
    }
    // hàm lấy danh sách tất cả sản phẩm
    list_products(req, res) {
        let page = req.query.page;
        page = page > 0 ? Math.floor(page) : 1;
        Product.get_all_products(page, (data, totalPage) => {
            try {
                res.render('listProducts', { layout: './layouts/admin_main', data: data, totalPage: totalPage, page: page });
            }
            catch (err) {
                res.sendError(err);
            }
        })
    }
    // hàm hiển thị ra giao diện thêm sản phẩm
    page_add_product(req, res) {
        try {
            var message = '';
            Product.get_all_type((types) => {
                res.render('addProduct', { title: 'Add Product', layout: './layouts/admin_main', message, types });
            })
        }
        catch (err) {
            res.sendError(err);
        }
    }
    // hàm thêm sản phẩm mới
    async add_product(req, res) {
        const image = req.files;
        var message = '';
        if (!image) {
            await Product.get_all_type((types) => {
                message= "Bạn phải thêm hình ảnh"
                res.render('addProduct', { title: 'Add Product', layout: './layouts/admin_main', message, types });
            })
        }
        else {
            await Product.get_all_type((types) => {
                var product = [[req.body.nameProduct, image.imageProduct.name, req.body.descriptionProduct, req.body.type, req.body.priceProductM, req.body.priceProductL]]
                const filepath = path.join(root.path, 'src/public/img/products' + '/' + image.imageProduct.name);
                const filepathFE = path.join('/PROJECT-CT271_FE/project-ct271_fe/public/img/products' + '/' + image.imageProduct.name)
                image.imageProduct.mv(filepath)
                image.imageProduct.mv(filepathFE)
                Product.add_product([product])
                message = "Thêm sản phẩm thành công";
                res.render('addProduct', { title: 'Add Product', layout: './layouts/admin_main', message, types });
            })
        }
    }
    // hàm xóa sản phẩm
    async delete_product(req, res) {
        const id = req.params.id;
        var message = '';
        let page = req.query.page;
        page = page > 0 ? Math.floor(page) : 1;
        try { 
                Product.delete_product(id);
                res.redirect("/admin/products/listproducts");
        }
        catch (err) {
            message = 'Đã có lỗi xảy ra  vui lòng thử lại'
            res.redirect("/admin/products/listproducts");
        }

    }
    // hàm hiển thị giao diện chỉnh sửa sản phẩm
    page_update_product(req, res) {
        var message = ''
        const id = req.params.id;
        Product.get_product(id, (data) => {
            try {
                res.render('updateProduct', { title: 'AdminPage', layout: './layouts/admin_main', message, data: data[0] });
            }
            catch (err) {
                console.log(err);
            }
        })
    }
    // hàm update sản phẩm
    async update_product(req, res) {
        const image = req.files;
        const id = req.params.id;
        const productName = req.body.nameProduct;
        const description = req.body.descriptionProduct
        const productPricesizeM = req.body.priceProductsizeM;
        const productPricesizeL = req.body.priceProductsizeL;
        const idType = req.body.type;
        let page = req.query.page;
        page = page > 0 ? Math.floor(page) : 1;
        // khi không update hình ảnh
        if (!image) {
             Product.update_product_noImg(productName, description, idType, productPricesizeM, productPricesizeL, id);
           var message = "Cập nhật sản phẩm thành công";
        }
        // khi update cả hình ảnh 
        else {
             Product.get_product(id, (data) => {
                var imgName = data[0].productImage;
                const filepath = path.join(root.path, 'src/public/img/products' + '/' + imgName)
                const filepathFE = path.join('D:/PROJECT-CT271_FE/project-ct271_fe/public/img/products' + '/' + imgName)
                fs.unlink(filepath, function (err) {
                    if (err) throw err;
                });
                fs.unlink(filepathFE, function (err) {
                    if (err) throw err
                });
            })
            await Product.update_product(productName, image.imageProduct.name, description, idType, productPricesizeM, productPricesizeL, id);
            const filepath = path.join(root.path, 'src/public/img/products' + '/' + image.imageProduct.name)
            const filepathFE = path.join('D:/PROJECT-CT271_FE/project-ct271_fe/public/img/products' + '/' + image.imageProduct.name)
            image.imageProduct.mv(filepath)
            image.imageProduct.mv(filepathFE)
            message = "Cập nhật sản phẩm thành công";
        }
        // hàm update lại giá của sản phẩm trong cart
        await Cart.getProductInCart(id,data=>{
            data.forEach(item => {
                if(item.size == 'L'){
                    item.totalprice = item.number * productPricesizeL
                }
                else{
                    item.totalprice = item.number * productPricesizeM
                }
                const productUpdate = [item.number ,item.note,item.totalprice,item.idcart,item.idproduct,item.size]
                Cart.updateCartDetails(productUpdate,result =>{
                    return;
                })
            });
        })
        res.redirect("/admin/products/listproducts");
    }


}

module.exports = new ProductsController;