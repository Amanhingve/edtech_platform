// applictionRoutes.js
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

// Student: Submit Application
router.post("/submit", authenticateUser, async (req, res) => {
    if (req.user.role !== "student") return res.status(403).json({ error: "Access denied" });

    const { university, program, status } = req.body;
    try {
        await pool.query(
            "INSERT INTO applications (student_id, university, program, status) VALUES (?, ?, ?, ?)",
            [req.user.id, university, program, status || "pending"]
        );
        res.json({ message: "Application submitted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Student: View Submitted Applications
router.get("/student", authenticateUser, async (req, res) => {
    if (req.user.role !== "student") return res.status(403).json({ error: "Access denied" });

    try {
        const [applications] = await pool.query("SELECT * FROM applications WHERE student_id = ?", [req.user.id]);
        res.json(applications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Agent/Admin: Get All Applications
router.get("/all", authenticateUser, async (req, res) => {
    if (req.user.role !== "admin" && req.user.role !== "agent") return res.status(403).json({ error: "Access denied" });

    try {
        const [applications] = await pool.query("SELECT * FROM applications");
        res.json(applications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Agent/Admin: Update Application Status
router.put("/update/:id", authenticateUser, async (req, res) => {
    if (req.user.role !== "admin" && req.user.role !== "agent") 
        return res.status(403).json({ error: "Access denied" });

    const { status } = req.body;
    const { id } = req.params;

    try {
        const [result] = await pool.query("SELECT * FROM applications WHERE id = ?", [id]);
        if (result.length === 0) {
            return res.status(404).json({ error: "Application not found" });
        }

        await pool.query("UPDATE applications SET status = ? WHERE id = ?", [status, id]);
        res.json({ message: "Application status updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 📌 **5. Student: Delete Their Application**
// router.delete("/:id", authenticateUser, async (req, res) => {
//     if (req.user.role !== "student") return res.status(403).json({ error: "Access denied" });

//     try {
//         await pool.query("DELETE FROM applications WHERE id = ? AND student_id = ?", [req.params.id, req.user.id]);
//         res.json({ message: "Application deleted successfully" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// 📌 Allow Admin to Delete Any Application
router.delete("/:id", authenticateUser, async (req, res) => {
    if (req.user.role !== "student" && req.user.role !== "admin") {
        return res.status(403).json({ error: "Access denied" });
    }

    try {
        await pool.query("DELETE FROM applications WHERE id = ?", [req.params.id]);
        res.json({ message: "Application deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
