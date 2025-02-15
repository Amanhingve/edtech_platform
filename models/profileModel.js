const pool = require("../config/db");

const createProfileTable = async () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS profiles (
            id INT AUTO_INCREMENT PRIMARY KEY,
            student_id INT UNIQUE,
            gpa FLOAT,
            skills TEXT,
            interests TEXT,
            preferred_location VARCHAR(255),
            FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
        )
    `;
    await pool.query(sql);
};

module.exports = { createProfileTable };
