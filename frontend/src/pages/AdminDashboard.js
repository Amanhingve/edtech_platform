import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function AdminDashboard() {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5001/api/applications/all", {
            headers: { Authorization: `Bearer ${token}` }
        });
        setApplications(res.data);
    };

    const updateStatus = async (id, status) => {
        const token = localStorage.getItem("token");
        await axios.put(`http://localhost:5001/api/applications/update/${id}`, 
            { status }, 
            { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchApplications();
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl mb-4">Applications</h2>
            <ul>
                {applications.map((app) => (
                    <li key={app.id} className="p-2 border mb-2">
                        {app.program} - {app.university} ({app.status})
                        <select onChange={(e) => updateStatus(app.id, e.target.value)}>
                            <option value="submitted">Submitted</option>
                            <option value="under review">Under Review</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </li>
                ))}
            </ul>
            <button onClick={fetchApplications}>Refresh</button>
            <button onClick={() => localStorage.removeItem("token")}>Logout</button><br />
            <Link to="/Login">Login</Link><br />
            <Link to="/dashboard">Dashboard</Link><br />
            <Link to="/register">Register</Link><br />
            <Link to="/profile">Profile</Link><br />
            <Link to="/scholarships">Scholarships</Link><br />

        </div>
    );
}

export default AdminDashboard;
