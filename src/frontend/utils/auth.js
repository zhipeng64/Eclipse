// Authorization and Authentication requests to backend for access
// to particular routes

// Requests backend to check validity of JWT Token
async function isJWTValid() {
  const url = `${import.meta.env.VITE_BACKEND_URL}/authentication`;
  const options = {
    method: "GET",
    credentials: "include",
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
  }
}

export { isJWTValid };
