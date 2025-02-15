// Register.js
import { useState } from "react";
import axios from "axios";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5001/api/auth/register", { name, email, password, role });
            alert("Registration successful! Please login.");
        } catch (err) {
            alert("Error registering user.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleRegister} className="p-6 shadow-lg rounded-lg bg-white">
                <h2 className="text-2xl mb-4">Register</h2>
                <input className="p-2 border w-full mb-2" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                <input className="p-2 border w-full mb-2" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input className="p-2 border w-full mb-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <select className="p-2 border w-full mb-2" onChange={(e) => setRole(e.target.value)}>
                    <option value="student">Student</option>
                    <option value="agent">Agent</option>
                    <option value="admin">Admin</option>
                </select>
                <button className="p-2 bg-blue-500 text-white w-full">Register</button>
            </form><br />
            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    );
}

export default Register;
