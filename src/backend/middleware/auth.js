// Middleware to validate JWT Tokens and Refresh Tokens
import { createCookieOptions } from "../utils/cookie.js";
import authService from "../services/authService.js";
import { AppError } from "../utils/AppError.js";

// Authentication middleware
const authHandler = async (req, res, next) => {
  const jwtToken = req?.cookies?.jwt;
  const refreshToken = req?.cookies?.refreshToken;

  if (!jwtToken && !refreshToken) {
    throw new AppError({
      originalErrorMessage: "MissingTokens",
      errorDescription: "Missing jwt and refresh tokens",
      statusCode: 401,
      clientResponse: {
        errors: [
          {
            field: "customError",
            msg: "Authentication required",
          },
        ],
      },
    });
  }
  const user = await authService.validateTokens(
    jwtToken,
    refreshToken,
    (newJwtToken, duration) => {
      res.cookie("jwt", newJwtToken, createCookieOptions(duration));
    }
  );
  req.user = user;
  next();
};

export { authHandler };
