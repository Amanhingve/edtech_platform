const express = require("express");
const pool = require("../config/db");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Middleware for authentication
const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Access denied" });

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ error: "Invalid token" });
    }
};

// Admin: Add Scholarship
router.post("/add", authenticateUser, async (req, res) => {
    if (req.user.role !== "admin") return res.status(403).json({ error: "Access denied" });

    const { name, description, gpa_requirement, country, skills_required } = req.body;

    try {
        await pool.query(
            "INSERT INTO scholarships (name, description, gpa_requirement, country, skills_required) VALUES (?, ?, ?, ?, ?)",
            [name, description, gpa_requirement, country, skills_required]
        );
        res.json({ message: "Scholarship added successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 📌 Match Scholarships API
router.get("/match", authenticateUser, async (req, res) => {
    if (req.user.role !== "student") return res.status(403).json({ error: "Access denied" });

    try {
        const [profile] = await pool.query("SELECT * FROM profiles WHERE student_id = ?", [req.user.id]);
        if (!profile.length) return res.status(404).json({ error: "Profile not found" });

        const student = profile[0];

        // Fetch all scholarships
        const [scholarships] = await pool.query("SELECT * FROM scholarships");

        // Match based on criteria
        const matchedScholarships = scholarships.filter((scholarship) =>
            student.gpa >= scholarship.gpa_requirement &&
            (scholarship.country === "Any" || scholarship.country === student.preferred_location) &&
            student.skills.split(",").some((skill) => scholarship.skills_required.includes(skill))
        );

        res.json(matchedScholarships);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;