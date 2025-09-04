import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import { hashPassword } from "../utils/auth.js";
import { userRepository } from "../database/UserDb.js";
import { refreshTokenRepository } from "../database/RefreshTokenDb.js";
import { AuthService } from "./authService.js";
import { AppError } from "../utils/error.js";

class UserService {
  // Registers user if no duplicate user is found
  async registerUser({ username, email, password }) {
    try {
      // Check if user already exists
      const user = await userRepository.getUser(username, email);
      if (user) {
        throw new Error("UserAlreadyExists");
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
          avatarImage: imageData,
        },
      };
      const result = await userRepository.insertUser(accountEntry);
      if (!result) {
        throw new Error(
          "Failed to retrieve truthy return value after inserting user"
        );
      }
      const userId = result.insertedId.toHexString();

      // JWT Payload
      const jwt = AuthService.createJwtToken(userId);
      const refreshToken = AuthService.createRefreshToken();

      // Insert refresh token to database
      await refreshTokenRepository.insertRefreshToken(userId, refreshToken);
      return {
        jwt,
        refreshToken,
        jwtExpiresAt: AuthService.getJwtTokenExpiration(),
        refreshTokenExpiresAt: AuthService.getRefreshTokenExpiration(),
      };
    } catch (error) {
      const message = error.message;
      switch (message) {
        case "UserAlreadyExists":
          throw new AppError({
            originalErrorMessage: message,
            originalErrorStackTrace: error.stack,
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
        default:
          throw new Error(message);
      }
    }
  }

  // Logs in the user and assigns the user jwt and refresh tokens
  async signInUser({ username, plaintextPassword }) {
    // Fetch user
    const user = await userRepository.getUser(username, null);
    if (!user) {
      throw new Error("Login for user failed (user not found in database)");
    }
    const userId = user._id.toHexString();

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
      console.log(plaintextPassword, passwordHash);
      throw new Error("Login for user failed (incorrect password supplied)");
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
    console.log("Updated user refresh token successfully");

    // Create new JWT token
    const newJwtToken = AuthService.createJwtToken(userId);
    return {
      jwt: newJwtToken,
      refreshToken: newRefreshToken,
      jwtExpiresAt: AuthService.getJwtTokenExpiration(),
      refreshTokenExpiresAt: AuthService.getRefreshTokenExpiration(),
    };
  }

  async getUserAvatar(username) {
    if (!username) {
      throw new Error("Invalid userId supplied");
    }
    const avatarImage = (await userRepository.getUser(username))?.profile
      ?.avatarImage;
    if (!avatarImage) {
      throw new Error("Failed to retrieve user avatar");
    }
    return avatarImage;
  }
}

const userService = new UserService();
export default userService;
