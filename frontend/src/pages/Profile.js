import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function Profile() {
    const [profile, setProfile] = useState({ gpa: "", skills: "", interests: "", preferred_location: "" });
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        fetchRecommendations();
    }, []);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const updateProfile = async () => {
        try {
            const token = localStorage.getItem("token");
    
            const response = await axios.post(
                "http://localhost:5001/api/profile/update",
                {
                    gpa: 3.5, // Replace with actual state variables
                    skills: "AI, software development",
                    interests: "machine learning",
                    preferred_location: "USA"
                },
                {
                    headers: { 
                        "Content-Type": "application/json", 
                        Authorization: `Bearer ${token}`
                    }
                }
            );
    
            console.log("✅ Profile Updated:", response.data);
        } catch (error) {
            console.error("❌ Profile Update Error:", error.response?.data || error.message);
        }
    };

    const fetchRecommendations = async () => {
        try {
          const response = await axios.get("http://localhost:5001/api/profile/match", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          console.log("🔍 API Response:", response.data); // ✅ Debugging Log
          setRecommendations(response.data);
        } catch (error) {
          console.error("❌ Error fetching recommendations:", error.response ? error.response.data : error.message);
        }
      };
    

    return (
        <div className="p-6">
            <h2 className="text-2xl mb-4">Update Profile</h2>
            <form onSubmit={updateProfile} className="mb-6">
                <input className="p-2 border w-full mb-2" type="text" name="gpa" placeholder="GPA" onChange={handleChange} />
                <input className="p-2 border w-full mb-2" type="text" name="skills" placeholder="Skills (comma separated)" onChange={handleChange} />
                <input className="p-2 border w-full mb-2" type="text" name="interests" placeholder="Interests" onChange={handleChange} />
                <input className="p-2 border w-full mb-2" type="text" name="preferred_location" placeholder="Preferred Location" onChange={handleChange} />
                <button className="p-2 bg-blue-500 text-white w-full">Update</button>
            </form>

            <h2 className="text-2xl mb-4">Recommended Universities</h2>
            <ul>
                {recommendations.length > 0 ? (
                    recommendations.map((uni, index) => (
                        <li key={index} className="p-2 border mb-2">
                            {uni.name} ({uni.location})
                        </li>
                    ))
                ) : (
                    <p>No matches found</p>
                )}
            </ul><br />
            <button onClick={fetchRecommendations}>Refresh</button><br />
            <button onClick={() => localStorage.removeItem("token")}>Logout</button><br />
            <Link to="/dashboard">Dashboard</Link><br />
            <Link to="/scholarships">Scholarships</Link><br />
        </div>
    );
}

export default Profile;
