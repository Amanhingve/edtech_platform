import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Scholarships from "./pages/Scholarships";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentDashboard from "./pages/StudentDashboard";
// import AdminDashboard from "./pages/AdminDashboard";
import ApplicationForm from "./components/ApplicationForm";
import ApplicationList from "./components/ApplicationList";
import AdminDashboard from "./components/AdminDashboard";




function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} /> {/* Ensure a default route exists */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/scholarships" element={<Scholarships />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> 
                <Route path="/studentDashboard" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
                <Route path="/adminDashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                <Route path="/applicationForm" element={<ProtectedRoute><ApplicationForm /></ProtectedRoute>} />
                <Route path="/applicationList" element={<ProtectedRoute><ApplicationList /></ProtectedRoute>} />
                
            </Routes>
        </Router>
    );
}

export default App;
