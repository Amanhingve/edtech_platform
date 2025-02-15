const mysql = require("mysql2");
const dotenv = require('dotenv');

dotenv.config();



const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME || 'edtech_platform',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database ✅");
        connection.release(); // Release the connection
    }
});

module.exports = pool.promise();

