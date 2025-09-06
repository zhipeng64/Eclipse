// Middleware to validate JWT Tokens and Refresh Tokens
import authService from "../services/authService.js";

// Checks validity of both jwt token and refresh token
const authHandler = async (req, res, next) => {
  const jwtToken = req?.cookies?.jwt;
  const refreshToken = req?.cookies?.refreshToken;

  try {
    const isJwtTokenValid = await authService.isJwtTokenValid(jwtToken);
    const isRefreshTokenValid =
      await authService.isRefreshTokenValid(refreshToken);
    // If jwt or refresh token is invalid, then user is unauthorized to access protected routes
    if (!isJwtTokenValid || !isRefreshTokenValid) {
      throw new Error("Unauthorized");
    }
    next();
  } catch (error) {
    throw error;
  }
};

export { authHandler };
