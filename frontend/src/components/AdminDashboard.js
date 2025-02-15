import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/applications/all", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error.response?.data || error.message);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5001/api/applications/update/${id}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Application status updated successfully!");
      fetchApplications(); // Refresh the list
    } catch (error) {
      console.error("Error updating status:", error.response?.data || error.message);
    }
  };

  const deleteApplication = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/applications/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Application deleted successfully!");
      fetchApplications(); // Refresh the list
    } catch (error) {
      console.error("Error deleting application:", error.response?.data || error.message);
      alert("Failed to delete application");
    }
  };

  return (
    <div>
      <h2>All Applications</h2>
      <ul>
        {applications.map((app) => (
          <li key={app.id}>
            {app.university} - {app.program} ({app.status}) 
            <button onClick={() => updateStatus(app.id, "accepted")}>Accept</button>
            <button onClick={() => updateStatus(app.id, "rejected")}>Reject</button>
            <button onClick={() => deleteApplication(app.id)} style={{ color: "red" }}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={fetchApplications}>Refresh</button><br />
      <button onClick={() => localStorage.removeItem("token")}>Logout</button><br />
      <Link to="/dashboard">Dashboard</Link><br />
    </div>
  );
};

export default AdminDashboard;
