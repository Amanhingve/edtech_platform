// Dashboard.js
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function Dashboard() {
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token"); // Ensure token is saved during login
            const { data } = await axios.get("http://localhost:5001/api/auth/user", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(data);
        } catch (err) {
            console.error("Error fetching user", err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            {user ? <p>Welcome, {user.name} ({user.role})</p> : <p>Loading...</p>}
            <button onClick={() => localStorage.removeItem("token")}>Logout</button><br />
            <Link to="/Login">Login</Link><br />
            <Link to="/register">Register</Link><br />
            <Link to="/Home">home</Link><br />
            <Link to="/profile">Profile</Link><br />
            <Link to="/scholarships">Scholarships</Link><br />
            <Link to="/adminDashboard">AdminDashboard</Link><br />
            <Link to="/StudentDashboard">StudentDashboard</Link><br />
            <Link to="/applicationForm">ApplicationForm</Link><br />
            <Link to="/applicationList">ApplicationList</Link><br />
        </div>
    );
}

export default Dashboard;
