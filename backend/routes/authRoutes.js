// authRuotes.js
const express = require("express");
const router = express.Router(); // ✅ Define the router
const bcrypt = require("bcryptjs");
const pool = require("../config/db");
const jwt = require("jsonwebtoken");



// ✅ Allow CORS headers inside routes (if needed)
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// Sample authentication route
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // console.log("Received Data:", { name, email, password, role }); // Debug Log

        if (!name || !email || !password || !role) {
            console.log("Missing Fields");
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the user already exists
        const [existingUser] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            console.log("User already exists");
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("🔐 Hashed Password:", hashedPassword);

        // Insert user into the database
        await pool.query(
            "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
            [name, email, hashedPassword, role]
        );

        console.log("✅ User registered successfully");
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("❌ Registration error:", error); // Log error details
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Sample authentication route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log("📥 Received Login Request:", { email, password });

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Fetch user from database
        const [user] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        if (user.length === 0) {
            console.log("❌ User Not Found");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare password
        const validPassword = await bcrypt.compare(password, user[0].password);
        console.log("🔑 Password Match:", validPassword);

        if (!validPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user[0].id, role: user[0].role }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        console.log("✅ Login Successful - Token Generated");
        res.status(200).json({ token, user: { id: user[0].id, email: user[0].email, role: user[0].role } });

    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.get("/user", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Extract token from headers
        if (!token) return res.status(401).json({ error: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        const [users] = await pool.query("SELECT id, name, email, role FROM users WHERE id = ?", [decoded.id]);

        if (users.length === 0) return res.status(404).json({ error: "User not found" });

        res.json(users[0]); // Return user data
    } catch (error) {
        console.error("User Fetch Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router; // ✅ Export the router
