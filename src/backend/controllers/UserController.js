import { createCookieOptions } from "../utils/cookie.js";
import authService from "../services/authService.js";
import userService from "../services/UserService.js";
import { AppError } from "../utils/error.js";
class UserController {
  constructor() {
    this.authService = authService;
    this.userService = userService;
  }

  async register(req, res) {
    console.log("inside registration handler");
    const { username, email, password } = req?.body;

    // Register user if not already exists
    try {
      const { jwt, refreshToken, jwtExpiresAt, refreshTokenExpiresAt } =
        await this.userService.registerUser({
          username,
          email,
          password,
        });
      console.log("user registered successfully");
      return res
        .cookie("jwt", jwt, createCookieOptions(jwtExpiresAt))
        .cookie(
          "refreshToken",
          refreshToken,
          createCookieOptions(refreshTokenExpiresAt)
        )
        .status(200)
        .json({ success: true }); // Frontend fetch results in error without sending body
    } catch (error) {
      const clientResponse = {
        errors: [
          {
            field: "customError",
            msg: "Please pick a different username or email",
          },
        ],
      };
      throw new AppError({
        originalErrorMessage: error.message,
        originalErrorStackTrace: error.stack,
        errorDescription: "User registration failed",
        httpStatus: 400,
        clientResponse,
      });
    }
  }

  // Issues new jwt token and refresh token to user
  async loginHandler(req, res) {
    const { username, password } = req?.body;
    try {
      const { jwt, refreshToken, jwtExpiresAt, refreshTokenExpiresAt } =
        await userService.signInUser({ username, plaintextPassword: password });
      return res
        .cookie("jwt", jwt, createCookieOptions(jwtExpiresAt))
        .cookie(
          "refreshToken",
          refreshToken,
          createCookieOptions(refreshTokenExpiresAt)
        )
        .status(200)
        .json({ success: true });
    } catch (error) {
      throw error;
    }
  }

  // Checks validity of both jwt token and refresh token
  async authHandler(req, res) {
    const jwtToken = req?.cookies?.jwt;
    const refreshToken = req?.cookies?.refreshToken;

    try {
      const isJwtTokenValid = await this.authService.isJwtTokenValid(jwtToken);
      const isRefreshTokenValid =
        await this.authService.isRefreshTokenValid(refreshToken);
      // If jwt or refresh token is invalid, then user is unauthorized to access protected routes
      if (!isJwtTokenValid || !isRefreshTokenValid) {
        throw new Error("Unauthorized");
      }
      res.status(200).end();
    } catch (error) {}
  }
}

const userController = new UserController();
export default userController;
