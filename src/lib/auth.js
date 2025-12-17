// src/lib/auth.js

// Save JWT token to localStorage
export function saveToken(token) {
  localStorage.setItem("token", token);
}

// Get the raw JWT token
export function getToken() {
  return localStorage.getItem("token");
}

// Decode JWT payload to get user info
export function getUserFromToken() {
  const token = getToken();
  if (!token) return null;

  try {
    // JWT format: header.payload.signature
    const payload = token.split(".")[1];
    const decoded = atob(payload); // decode Base64
    return JSON.parse(decoded);
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}

// Logout helper
export function logout() {
  localStorage.removeItem("token");
}
