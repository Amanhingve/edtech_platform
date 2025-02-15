const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');
const applicationRoutes = require("./routes/applicationRoutes");
const profileRoutes = require("./routes/profileRoutes");
const scholarshipRoutes = require("./routes/scholarshipRoutes");
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:3000", // ✅ Allow frontend requests
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

app.get("/", (req, res) => {
    res.send("API is running...");
});

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.use("/api/applications", applicationRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/scholarships", scholarshipRoutes);
// app.use("/api/scholarships", require("./routes/scholarshipRoutes"));



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// const startServer = (port) => {
//     const server = app.listen(port)
//         .on('error', (err) => {
//             if (err.code === 'EADDRINUSE') {
//                 console.log(`Port ${port} is busy, trying ${port + 1}`);
//                 startServer(port + 1);
//             }
//         })
//         .on('listening', () => {
//             console.log(`Server is running on port ${port}`);
//         });
// };

// startServer(PORT);
