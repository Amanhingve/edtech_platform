import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ApplicationForm = () => {
  // const [form, setForm] = useState({ university: "", program: "" });
  const [program, setProgram] = useState("");
  const [university, setUniversity] = useState("");

  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!program || !university) {
      console.error("Program or University is missing");
      return;
    }
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("❌ No token found");
            return;
        }

        const response = await axios.post(
            "http://localhost:5001/api/applications/submit",  // ✅ Corrected route
            { program, university },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("✅ Application submitted:", response.data);
    } catch (error) {
        console.error("❌ Error submitting application:", error.response?.data || error.message);
    }
};


  return (
    <div>
    <h1>Application Form</h1>
    <form onSubmit={handleSubmit}>
      <input type="text" value={program} onChange={(e) => setProgram(e.target.value)} placeholder="Enter Program" />
      <input type="text" value={university} onChange={(e) => setUniversity(e.target.value)} placeholder="Enter University" />
      <button type="submit">Submit</button>
    </form>
    <Link to="/dashboard">Dashboard</Link><br />
    <Link to="/profile">Profile</Link><br />
    <Link to="/scholarships">Scholarships</Link><br />
    <Link to="/applicationList">ApplicationList</Link><br />
    </div>
  );
};

export default ApplicationForm;
