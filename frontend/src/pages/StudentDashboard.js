
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function StudentDashboard() {
    const [applications, setApplications] = useState([]);
    const [program, setProgram] = useState("");
    const [university, setUniversity] = useState("");

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5001/api/applications/student", {
            headers: { Authorization: `Bearer ${token}` }
        });
        setApplications(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        await axios.post("http://localhost:5001/api/applications/submit", 
            { program, university }, 
            { headers: { Authorization: `Bearer ${token}` } }
        );

        fetchApplications();
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl mb-4">Submit Application</h2>
            <form onSubmit={handleSubmit} className="mb-6">
                <input className="p-2 border w-full mb-2" type="text" placeholder="Program" onChange={(e) => setProgram(e.target.value)} />
                <input className="p-2 border w-full mb-2" type="text" placeholder="University" onChange={(e) => setUniversity(e.target.value)} />
                <button className="p-2 bg-blue-500 text-white w-full">Submit</button>
            </form>

            <h2 className="text-2xl mb-4">Your Applications</h2>
            <ul>
                {applications.map((app) => (
                    <li key={app.id} className="p-2 border mb-2">
                        {app.program} - {app.university} ({app.status})
                    </li>
                ))}
            </ul><br />
            <button onClick={fetchApplications}>Refresh</button><br />
            <button onClick={() => localStorage.removeItem("token")}>Logout</button><br />
            <Link to="/dashboard">Dashboard</Link><br />
            <Link to="/profile">Profile</Link><br />
            <Link to="/scholarships">Scholarships</Link><br />
            <Link to="/applicationList">ApplicationList</Link><br />
        </div>
    );
}

export default StudentDashboard;
