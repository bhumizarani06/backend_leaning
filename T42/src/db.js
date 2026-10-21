const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Bhumi@1102",
    database:"t42_orders",
    waitForConnections:true,
    connectionLimit:5,
    queueLimit:0,
});

module.exports=pool;