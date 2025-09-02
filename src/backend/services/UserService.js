import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import { hashPassword } from "../utils/auth.js";
import { userRepository } from "../database/UserDb.js";
import { refreshTokenRepository } from "../database/RefreshTokenDb.js";
import { AuthService } from "./authService.js";

class UserService {
  // Registers user if no duplicate user is found
  async registerUser({ username, email, password }) {
    // Check if user already exists
    const user = await userRepository.getUser(username, email);
    if (user) {
      throw new Error("UserAlreadyExists");
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

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
    const passwordHash = user.hashedPassword;
    if (!passwordHash) {
      throw new Error("Login for user failed (password hash is a falsy value)");
    }
    const isPasswordHashMatch = await bcrypt.compare(
      plaintextPassword,
      passwordHash
    );
    if (!isPasswordHashMatch) {
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
}

const userService = new UserService();
export default userService;
