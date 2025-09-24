import { createCookieOptions } from "../utils/cookie.js";
import authService from "../services/AuthService.js";
import userService from "../services/UserService.js";
import { AppError } from "../utils/AppError.js";
import friendService from "../services/FriendService.js";

class UserController {
  constructor() {
    this.authService = authService;
    this.userService = userService;
  }

  async register(req, res) {
    const { username, email, password } = req?.body;
    if (!username || !email || !password) {
      throw new AppError({
        originalErrorMessage: "InvalidInput",
        errorDescription:
          "Controller received invalid username or email or password",
        statusCode: 400,
        clientResponse: {
          errors: [
            {
              field: "customError",
              msg: "Invalid username, email, or password",
            },
          ],
        },
      });
    }

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
    if (!username || !password) {
      throw new AppError({
        originalErrorMessage: "InvalidInput",
        errorDescription: "Controller received invalid username and password",
        statusCode: 400,
        clientResponse: {
          errors: [
            {
              field: "customError",
              msg: "Invalid username or password",
            },
          ],
        },
      });
    }
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
    const decodedJwtTokenUserId = req?.user?.id;

    if (!targetUsername || !decodedJwtTokenUserId) {
      throw new AppError({
        originalErrorMessage: "InvalidInput",
        errorDescription:
          "Controller received invalid username and decoded jwt token",
        statusCode: 400,
        clientResponse: {
          errors: [
            {
              field: "customError",
              msg: "Invalid username or authentication",
            },
          ],
        },
      });
    }
    const { username, avatarImage, friendshipData } =
      await userService.searchUser({
        currentUserId: decodedJwtTokenUserId,
        targetUsername,
      });
    return res.status(200).json({
      searchResults: [
        {
          username,
          avatarImage,
          friendshipData,
        },
      ],
      success: true,
    });
  }

  // Sends a friend request to target user
  async addUser(req, res) {
    const { username } = req?.body;
    const decodedJwtTokenUserId = req?.user?.id;

    if (!username || !decodedJwtTokenUserId) {
      throw new AppError({
        originalErrorMessage: "InvalidInput",
        errorDescription:
          "Controller received invalid username and decoded jwt token",
        statusCode: 400,
        clientResponse: {
          errors: [
            {
              field: "customError",
              msg: "Invalid username or authentication",
            },
          ],
        },
      });
    }
    await friendService.addUser({
      currentUserId: decodedJwtTokenUserId,
      targetUsername: username,
    });
    console.log("Friend request entry made");
    return res.status(200).json({
      username: username,
      success: true,
    });
  }

  // Accepts a friend request
  async acceptFriendRequest(req, res) {
    const { username } = req?.body;
    const decodedJwtTokenUserId = req?.user?.id;

    console.log("received request to accept friend request");
    if (!username || !decodedJwtTokenUserId) {
      throw new AppError({
        originalErrorMessage: "InvalidInput",
        errorDescription:
          "Controller received invalid username and decoded jwt token",
        statusCode: 400,
        clientResponse: {
          errors: [
            {
              field: "customError",
              msg: "Invalid username or authentication",
            },
          ],
        },
      });
    }
    await friendService.acceptFriendRequest({
      recipientToken: decodedJwtTokenUserId,
      requestorUsername: username,
    });
    console.log("Friend request accepted");
    return res.status(200).json({
      success: true,
    });
  }
}

const userController = new UserController();
export default userController;
