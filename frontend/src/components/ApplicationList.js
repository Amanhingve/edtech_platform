import { useEffect, useState } from "react";
import axios from "axios";

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const role = localStorage.getItem("role"); // Get user role
        const endpoint =
          role === "admin" || role === "agent"
            ? "http://localhost:5001/api/applications/all"
            : "http://localhost:5001/api/applications/student";

        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error.response?.data || error.message);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div>
      <h2>My Applications</h2>
      <ul>
        {applications.map((app) => (
          <li key={app.id}>
            {app.university} - {app.program} ({app.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicationList;

