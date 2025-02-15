// Home.js
import { Link } from "react-router-dom";


function Home() {
    return (
        <div>
            <h1>Welcome to the EdTech Platform</h1>;<br />
            <Link to="/Login">Login</Link> {/* Link to the /Login page */}<br />
            <Link to="/register">Register</Link><br />
            <Link to="/profile">Profile</Link><br />
            <Link to="/scholarships">Scholarships</Link><br />
            <Link to="/dashboard">Dashboard</Link><br />
        </div>
    );
}


export default Home ;
