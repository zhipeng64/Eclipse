const createCookieOptions = (expirationMs) => {
  const cookie = {
    httpOnly: true, // Prevents client-side JS from accessing cookie
    secure: true,
    sameSite: "None", // Protects against CSRF attacks
    maxAge: expirationMs,
  };
  return cookie;
};

export { createCookieOptions };
