// Authorization and Authentication requests to backend for access
// to particular routes

// Requests backend to check validity of JWT and Refresh tokens
async function isAuthenticated() {
  const url = `${import.meta.env.VITE_BACKEND_URL}/authentication`;
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
    console.log(error);
    return false;
  }
}

export { isAuthenticated };
