import { createCookieOptions } from "../utils/cookie.js";
import authService from "../services/authService.js";
import userService from "../services/UserService.js";
class UserController {
  constructor() {
    this.authService = authService;
    this.userService = userService;
  }

  async register(req, res) {
    console.log("inside registration handler");
    const { username, email, password } = req?.body;

    // Register user if not already exists
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
  }

  // Issues new jwt token and refresh token to user
  async loginHandler(req, res) {
    const { username, password } = req?.body;
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
  }

  // Looks up a user
  async lookupUser(req, res) {
    const targetUsername = req?.query?.targetUsername;
    const { username, avatarImage } = await userService.searchUser({
      targetUsername,
    });
    return res.status(200).json({
      searchResults: [
        {
          username,
          avatarImage,
        },
      ],
      success: true,
    });
  }
}

const userController = new UserController();
export default userController;
