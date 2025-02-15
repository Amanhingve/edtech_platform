// profileRoutes.js
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

// Student: Update Profile
router.post("/update", authenticateUser, async (req, res) => {
    if (req.user.role !== "student") return res.status(403).json({ error: "Access denied" });

    const { gpa, skills, interests, preferred_location } = req.body;

    // Ensure all fields are present
    if (!gpa || !skills || !interests || !preferred_location) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        await pool.query(
            "INSERT INTO profiles (student_id, gpa, skills, interests, preferred_location) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE gpa = VALUES(gpa), skills = VALUES(skills), interests = VALUES(interests), preferred_location = VALUES(preferred_location)",
            [req.user.id, gpa, skills, interests, preferred_location]
        );
        res.json({ message: "Profile updated successfully" });
    } catch (err) {
        console.error("Database Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// AI Matching: Recommend Programs Based on Profile
router.get("/match", authenticateUser, async (req, res) => {
    if (req.user.role !== "student") return res.status(403).json({ error: "Access denied" });

    try {
        const [profile] = await pool.query("SELECT * FROM profiles WHERE student_id = ?", [req.user.id]);
        if (!profile.length) return res.status(404).json({ error: "Profile not found" });

        const student = profile[0];

        // ✅ Declare `universities` inside the route
        const universities = [
            { name: "Harvard University", gpa: 3.8, location: "USA", skills: ["research", "data science"] },
            { name: "University of Toronto", gpa: 3.5, location: "Canada", skills: ["AI", "software development"] },
            { name: "Oxford University", gpa: 3.7, location: "UK", skills: ["mathematics", "statistics"] }
        ];

        // ✅ Match universities based on GPA and skills
        const matchedUniversities = universities.filter((uni) => 
            student.gpa >= uni.gpa &&
            student.skills.split(",").some((skill) => uni.skills.includes(skill.trim()))
        );

        res.json(matchedUniversities);
    } catch (err) {
        console.error("❌ Match API Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});



module.exports = router;
