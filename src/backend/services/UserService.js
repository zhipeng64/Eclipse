import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import { hashPassword } from "../utils/auth.js";
import { refreshTokenRepository } from "../database/RefreshTokenDb.js";
import { AuthService } from "./authService.js";
import { AppError } from "../utils/AppError.js";
import { ObjectId } from "mongodb";
import userRepository from "../database/UserDb.js";
import friendRepository from "../database/FriendDb.js";
import { encodeBase64 } from "../utils/encodings.js";

class UserService {
  // Registers user if no duplicate user is found
  async registerUser({ username, email, password }) {
    if (!username || !email || !password) {
      throw new AppError({
        originalErrorMessage: "InvalidInput",
        errorDescription:
          "Invalid username, email, or password supplied when registering users",
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

    // Check if user already exists
    const user = await userRepository.getUser(username, email);
    if (user) {
      throw new AppError({
        originalErrorMessage: "UserAlreadyExists",
        errorDescription: "User registration failed",
        statusCode: 400,
        clientResponse: {
          errors: [
            {
              field: "customError",
              msg: "Username or email already exists",
            },
          ],
        },
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);
    if (!hashedPassword) {
      throw new Error("Invalid password hash");
    }

    // Default profile picture
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const imageData = fs.readFileSync(`${__dirname}/../assets/sunrise2.jpg`);

    // Insert user and get ID
    const accountEntry = {
      account: {
        username,
        email,
        hashedPassword,
      },
      profile: {
        avatarImage: encodeBase64(imageData),
      },
    };

    const result = await userRepository.insertUser(accountEntry);
    if (!result) {
      throw new Error(
        "Failed to retrieve truthy return value after inserting user"
      );
    }
    const userId = result.insertedId;

    // JWT Payload
    const jwt = AuthService.createJwtToken(userId);
    const refreshToken = AuthService.createRefreshToken();

    // Insert refresh token to database
    await refreshTokenRepository.insertRefreshToken(userId, refreshToken);

    return {
      jwt,
      refreshToken,
      jwtExpiresAt: AuthService.getJwtTokenDuration(),
      refreshTokenExpiresAt: AuthService.getRefreshTokenDuration(),
    };
  }

  // Logs in the user and assigns the user jwt and refresh tokens
  async signInUser({ username, plaintextPassword }) {
    if (!username || !plaintextPassword) {
      throw new AppError({
        originalErrorMessage: "InvalidInput",
        errorDescription: "Invalid username or password supplied during signup",
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

    // Fetch user
    const user = await userRepository.getUser(username, null);
    if (!user) {
      throw new AppError({
        originalErrorMessage: "UserNotFound",
        errorDescription: "Login for user failed (user not found in database)",
        statusCode: 400,
        clientResponse: {
          errors: [
            {
              field: "customError",
              msg: "User not found",
            },
          ],
        },
      });
    }
    const userId = user._id;

    // Compare passwords
    const passwordHash = user.account.hashedPassword;
    if (!passwordHash) {
      throw new Error("Login for user failed (password hash is a falsy value)");
    }
    const isPasswordHashMatch = await bcrypt.compare(
      plaintextPassword,
      passwordHash
    );
    if (!isPasswordHashMatch) {
      throw new AppError({
        originalErrorMessage: "IncorrectPassword",
        originalErrorStackTrace: new Error().stack,
        errorDescription: "Login for user failed (incorrect password supplied)",
        statusCode: 400,
        clientResponse: {
          errors: [
            {
              field: "customError",
              msg: "Incorrect password",
            },
          ],
        },
      });
    }

    // Update user's refresh token
    const newRefreshToken = AuthService.createRefreshToken();
    const result = await refreshTokenRepository.updateRefreshToken(
      userId,
      newRefreshToken
    );
    if (!result || result.matchedCount == 0) {
      throw new Error("Updating refresh token failed");
    }

    // Create new JWT token
    const newJwtToken = AuthService.createJwtToken(userId);

    return {
      jwt: newJwtToken,
      refreshToken: newRefreshToken,
      jwtExpiresAt: AuthService.getJwtTokenDuration(),
      refreshTokenExpiresAt: AuthService.getRefreshTokenDuration(),
    };
  }

  async getUserAvatar({ username }) {
    if (!username) {
      throw new AppError({
        originalErrorMessage: "InvalidInput",
        errorDescription: "Invalid userId supplied",
        statusCode: 400,
        clientResponse: {
          errors: [
            {
              field: "customError",
              msg: "Invalid username",
            },
          ],
        },
      });
    }

    const avatarImage = (await userRepository.getUser(username))?.profile
      ?.avatarImage;
    if (!avatarImage) {
      throw new Error("Failed to retrieve user avatar");
    }
    return avatarImage;
  }

  async searchUser({ currentUserId, targetUsername }) {
    if (!targetUsername || !currentUserId) {
      throw new AppError({
        originalErrorMessage: "InvalidUserLookup",
        errorDescription: "username is invalid",
        statusCode: 400,
        clientResponse: {
          errors: [
            {
              field: "searchError",
              msg: "Please try a different username",
            },
          ],
        },
      });
    }

    const currentUser = await userRepository.getUserById(
      new ObjectId(currentUserId)
    );
    if (!currentUser) {
      throw new Error("No user matched lookup criteria (current user)");
    }

    const user = await userRepository.getUser(targetUsername, null);
    if (!user) {
      throw new Error("No user matched lookup criteria (target user)");
    }

    if (currentUser._id.toHexString() === user._id.toHexString()) {
      throw new AppError({
        originalErrorMessage: "SelfLookup",
        originalErrorStackTrace: new Error().stack,
        errorDescription:
          "Cannot search user where target is the same as current user",
        statusCode: 400,
        clientResponse: {
          errors: [
            {
              field: "searchError",
              msg: "You cannot search for yourself",
            },
          ],
        },
      });
    }

    const username = user?.account?.username;
    const avatarImage = user?.profile?.avatarImage;
    if (!username || !avatarImage) {
      throw new Error("Invalid user field fetched from database");
    }

    // Check friendship (friendRepository still here, it's not friend-logic extraction)
    const friendship = await friendRepository.getFriendEntry({
      userOne: currentUser._id,
      userTwo: user._id,
    });

    const friendshipData = friendship
      ? {
          status: friendship.status || null,
          role: currentUser._id.equals(friendship.recipientId)
            ? "recipient"
            : "requestor",
        }
      : null;

    return {
      username,
      avatarImage,
      friendshipData,
    };
  }
}

const userService = new UserService();
export default userService;
