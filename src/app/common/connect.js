var mysql = require('mysql');

var connectBD =  mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "coffee_shop"
});

connectBD.connect(function (err){
    if(err){
        console.log("Error connecting")
    }
    else{
        console.log("Success connecting")
    }
})

module.exports = connectBD;