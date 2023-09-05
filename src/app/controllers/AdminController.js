const Product = require('../models/product')
const User = require("../models/user")
const bodyParser = require('body-parser');
const path = require('path');
const root = require('app-root-path')
class AdminController {
    index(req, res) {
        res.render('admin', { title: 'AdminPage', layout: './layouts/admin_main' });
    }
    // [GET list users]
    list_users(req, res) {
        User.get_all((data) => {
            try{
                res.render('listUsers', { layout: './layouts/admin_main', data: data });
            }
            catch(err) {
                res.sendError(err);
            }
        })
    }
    // [GET list products]
    list_products(req, res) {
        Product.get_all_products((data) => {
            try{
                res.render('listProducts', { layout: './layouts/admin_main', data: data });
            }
            catch(err) {
                res.sendError(err);
            }
        })
    }
    page_product(req, res) {
        try{
            var message = ''
            res.render('addProduct', { title: 'Add Product', layout: './layouts/admin_main', message });
        }
        catch(err) {
            res.sendError(err);
        }
    }
    add_product(req, res) {
        const image = req.files;
        var message = '';
        if (!image) {

            res.render('addProduct', { title: 'Add Product', layout: './layouts/admin_main' })
        }
        else {
            const image_url = path.join('/img/products/' + image.imageProduct.name)
            var product = [[req.body.nameProduct, req.body.priceProduct, image_url, req.body.type]]
            message = "Thêm sản phẩm thành công";
            const filepath = path.join(root.path, 'src/public/img/products' + '/' + image.imageProduct.name)
            image.imageProduct.mv(filepath)
            Product.add_product([product])
            res.render('addProduct', { title: 'Add Product', layout: './layouts/admin_main', message });
        }
    }
    delete_product(req, res) {
        const id = req.params.id;
        var message = '';
        try{
            Product.delete_product(id);
            Product.get_all_products((data)=>{
                res.render('listProducts', { layout: './layouts/admin_main',data:data, message: message});
            })
        } 
        catch(err) {
            message = 'Đã có lỗi xảy ra  vui lòng thử lại'
            Product.get_all_products((data)=>{
                res.render('listProducts', { layout: './layouts/admin_main',data:data, message: message});
            })
        }                

    }

    page_update_product(req, res){
        var message = ''
        const id = req.params.id;
        Product.get_product(id, (data)=>{
            try{
                res.render('updateProduct', { title: 'AdminPage', layout: './layouts/admin_main',message,data: data[0]});
            }
            catch(err) {
                console.log(err);
            }
        })
    }

    update_product(req, res){
        var message = ''
        const image = req.files;
        const id = req.params.id;
        const productName = req.body.nameProduct;
        const productPrice = req.body.priceProduct;
        const idType = req.body.type;
        console.log(id)
        var data = {
            productName: '',
            productPrice: '',
            productImage: '',
        };
        if (!image) {
            message = "Cập nhật sản phẩm thành công";
            Product.update_product_noImg(productName, productPrice, idType,id);
            Product.get_all_products((data)=>{
                res.render('listProducts', { title: 'Admin', layout: './layouts/admin_main',message,data: data });
            })
        }
        else {
            const image_url = path.join('/img/products/' + image.imageProduct.name)
            Product.update_product(productName, productPrice, image_url, idType,id);
            message = "Cập nhật sản phẩm thành công";
            const filepath = path.join(root.path, 'src/public/img/products' + '/' + image.imageProduct.name)
            image.imageProduct.mv(filepath)
            Product.get_all_products((data)=>{
                res.render('listProducts', { title: 'Admin', layout: './layouts/admin_main',message,data: data });
            })
        }
    }
}

module.exports = new AdminController;