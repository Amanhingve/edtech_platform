const pool = require("../config/db");

const createApplicationTable = async () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS applications (
            id INT AUTO_INCREMENT PRIMARY KEY,
            student_id INT,
            program VARCHAR(255),
            university VARCHAR(255),
            status ENUM('submitted', 'under review', 'accepted', 'rejected') DEFAULT 'submitted',
            submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
        )
    `;
    await pool.query(sql);
};

module.exports = { createApplicationTable };
