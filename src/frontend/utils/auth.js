// Authorization and Authentication requests to backend for access
// to particular routes
import env from "../config.js";

// Requests backend to check validity of JWT and Refresh tokens
async function isAuthenticated() {
  const url = `${env.VITE_BACKEND_URL}/api/authentication`;
  const options = {
    method: "GET",
    credentials: "include",
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Invalid status code");
    }
    return true;
  } catch (error) {
    return false;
  }
}

export { isAuthenticated };
