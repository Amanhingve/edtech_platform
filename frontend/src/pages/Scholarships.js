import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Scholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchScholarships = async () => {
        try {
          const token = localStorage.getItem("token"); // Get token from local storage
          if (!token) {
            console.error("No token found, user not authenticated");
            return;
          }
      
          const response = await axios.get("http://localhost:5001/api/scholarships/match", {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token
            },
          });
      
          setScholarships(response.data);
        } catch (err) {
          console.error("Error fetching scholarships:", err);
        }
      };

    fetchScholarships();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-6">Matching Scholarships</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <ul className="space-y-4">
        {scholarships.length > 0 ? (
          scholarships.map((scholarship) => (
            <li key={scholarship.id} className="p-4 shadow-md rounded-lg bg-white">
              <h3 className="text-xl font-semibold">{scholarship.name}</h3>
              <p className="text-gray-600">{scholarship.description}</p>
              <p className="text-gray-600">Eligibility: {scholarship.eligible_major || "Any Major"}, {scholarship.eligible_country || "All Countries"}</p>
              <p className="text-gray-600">Minimum GPA: {scholarship.min_gpa || "None"}</p>
              <p className="text-gray-600">Deadline: {new Date(scholarship.application_deadline).toLocaleDateString()}</p>
              <a href={scholarship.application_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Apply Now
              </a>

            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No matching scholarships found.</p>
        )}
      </ul>
      <button onClick={() => localStorage.removeItem("token")}>Logout</button><br />
      <Link to="/dashboard">Dashboard</Link><br />
      <Link to="/profile">Profile</Link><br />
    </div>
  );
};

export default Scholarships;

