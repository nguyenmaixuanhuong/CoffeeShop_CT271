var mysql = require('mysql');
// tạo kết nối database
var connectBD =  mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "coffee_shop"
});
// kết nối vào database
connectBD.connect(function (err){
    if(err){
        console.log("Error connecting")
    }
    else{
        console.log("Success connecting")
    }
})

module.exports = connectBD;