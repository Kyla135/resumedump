import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { saveToken, getUserFromToken } from "../lib/auth";

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Save JWT token
      saveToken(data.token);
      setIsLoggedIn(true);

      const user = getUserFromToken();

      if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        className="max-w-md w-full p-6 bg-white rounded-xl shadow space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-[#bfa77a] text-[#F5F1E8] py-2 rounded-lg hover:bg-[#a78f5f] transition-colors">
          Login
        </button>

        <p className="text-sm text-center mt-2">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#bfa77a] underline hover:text-[#a78f5f]">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
