import { authService } from "../services/authService.js";
import { createCookieOptions } from "../utils/cookie.js";

class UserController {
  constructor() {
    this.authService = authService;
  }

  async register(req, res) {
    const { username, email, password } = req.body;
    try {
      // Register user if not already exists
      const { userId, jwt, refreshToken, jwtExpiresAt, refreshTokenExpiresAt } =
        await this.authService.registerUser({ username, email, password });

      // Set jwt and refresh tokens as cookies
      res
        .cookie("jwt", jwt, createCookieOptions(jwtExpiresAt))
        .cookie(
          "refreshToken",
          refreshToken,
          createCookieOptions(refreshTokenExpiresAt)
        )
        .status(201)
        .json({ id: userId });
    } catch (err) {
      if (err.message === "UserAlreadyExists") {
        return res.status(400).end();
      }
      console.error("Registration error:", err);
      res.status(400).end();
    }
  }

  loginHandler(req, res) {
    // At this point, cookies are present and body is sanitized
    console.log("Cookies:", req.cookies);
    console.log("Body:", req.body);
    res.status(200).json({ message: "OK" });
  }
}

const userController = new UserController();
export { userController };
