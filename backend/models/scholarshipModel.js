const pool = require("../config/db");

const createScholarshipTable = async () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS scholarships (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            description TEXT,
            gpa_requirement FLOAT,
            country VARCHAR(100),
            skills_required TEXT
        )
    `;
    await pool.query(sql);
};

module.exports = { createScholarshipTable };
