const pool = require("../config/db");

const createUserTable = async () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(100) UNIQUE,
            password VARCHAR(255),
            role ENUM('student', 'agent', 'admin') DEFAULT 'student'
        )
    `;
    await pool.query(sql);
};

module.exports = { createUserTable };
