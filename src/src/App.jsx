import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import ResumeBuilderTemplate1 from "./pages/ResumeBuilderTemplate1";
import ResumeBuilderTemplate2 from "./pages/ResumeBuilderTemplate2";
import Dashboard from "./pages/Dashboard";



function AppWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const location = useLocation();

  // Hide navbar on login and signup pages
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  // Initialize sample users
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.length === 0) {
      localStorage.setItem("users", JSON.stringify(sampleUsers));
    }
  }, []);

  return (
    <>
      {!hideNavbar && <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
      <Routes>
      <Route path="/" element={<Landing isLoggedIn={isLoggedIn} />} />
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/resume-builder-template1" element={<ResumeBuilderTemplate1 />} />
      <Route path="/resume-builder-template2" element={<ResumeBuilderTemplate2 />} />
      <Route path="/dashboard" element={<Dashboard />} />


      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
