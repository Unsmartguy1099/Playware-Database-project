const mysql = require("mysql2");

module.exports = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "hlwimov24580",
    database: "playware", 
});
