import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserFromToken } from "../lib/users.js";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser"); // ✅ Clear stored user info
    setIsLoggedIn(false);
    navigate("/");
  }

  const linkButtonClasses =
    "px-4 py-2 rounded-xl font-semibold bg-[#bfa77a] text-[#f5f1e6] hover:bg-[#a78f5f] hover:text-white transition-colors flex items-center space-x-1";

  const iconButtonClasses =
    "p-2 rounded-xl bg-[#bfa77a] text-[#f5f1e6] hover:bg-[#a78f5f] hover:text-white transition-colors flex items-center justify-center";

  const user = isLoggedIn ? getUserFromToken() : null;

  // Check if we should show the home icon
  const showHomeIcon =
    user?.role === "admin" &&
    (location.pathname === "/dashboard" || location.pathname === "/profile");

  return (
    <nav
      className="flex justify-between items-center px-6 py-3 shadow-md"
      style={{
        background: "linear-gradient(135deg, #d9c7a1, #c9b48f)",
        backgroundSize: "200% 200%",
        animation: "shine 10s ease-in-out infinite",
      }}
    >
      <Link
        to="/"
        className="flex items-center space-x-2 text-3xl font-bold text-[#f5f1e6]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6M9 16h6M7 4h7l5 5v11a1 1 0 01-1 1H7a1 1 0 01-1-1V5a1 1 0 011-1z"
          />
        </svg>
        <span>ResuMeUp</span>
      </Link>

      <div className="flex space-x-2 items-center">
        {/* Home Icon for Admin on Dashboard or Profile */}
        {showHomeIcon && (
          <Link to="/" className={iconButtonClasses} title="Home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z"
              />
            </svg>
          </Link>
        )}

        {location.pathname === "/profile" ? (
          <>
            {user?.role === "admin" && (
              <Link to="/dashboard" className={linkButtonClasses}>
                Dashboard
              </Link>
            )}
            <button onClick={handleLogout} className={linkButtonClasses}>
              Logout
            </button>
          </>
        ) : (
          <>
            {isLoggedIn ? (
              <>
                <Link to="/profile" className={iconButtonClasses} title="Profile">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A11.955 11.955 0 0112 15c2.485 0 4.78.744 6.879 2.004M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </Link>

                {user?.role === "admin" && (
                  <Link to="/dashboard" className={linkButtonClasses}>
                    Dashboard
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link to="/login" className={linkButtonClasses}>
                  Login
                </Link>
                <Link to="/signup" className={linkButtonClasses}>
                  Signup
                </Link>
              </>
            )}
          </>
        )}
      </div>

      <style>
        {`
          @keyframes shine {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </nav>
  );
}
