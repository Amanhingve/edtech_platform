import { useState } from "react";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5001/api/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            window.location.href = "/dashboard";
            alert("Login successful!");
        } catch (err) {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleLogin} className="p-6 shadow-lg rounded-lg bg-white">
                <h2 className="text-2xl mb-4">Login</h2>
                <input className="p-2 border w-full mb-2" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br />
                <input className="p-2 border w-full mb-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br />
                <button className="p-2 bg-blue-500 text-white w-full">Login</button>
            </form><br />
            <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
    );
}

export default Login;
