const createCookieOptions = (expirationMs) => {
  const cookie = {
    httpOnly: true, // Prevents client-side JS from accessing cookie
    secure: true,
    sameSite: "None", // Protects against CSRF attacks
    maxAge: expirationMs,
  };
  return cookie;
};

// Parses a raw cookie string
const parseCookies = (cookieString) => {
  if (!cookieString) {
    throw new Error("Invalid cookie received in parser");
  }
  const cookies = {};
  cookieString.split(";").forEach((cookie) => {
    const parts = cookie.split("=");
    if (parts.length != 2) {
      throw new Error("Failed to split cookie into name/value pair");
    }
    const cookieName = parts[0].trim();
    const cookieValue = parts[1];
    cookies[cookieName] = cookieValue;
  });

  return cookies;
};

export { createCookieOptions, parseCookies };
