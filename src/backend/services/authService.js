import { hashPassword } from "../utils/auth.js";
import { createJWT, createRefreshToken } from "../utils/auth.js";
import { userRepository } from "../database/UserDb.js";
import { refreshTokenRepository } from "../database/RefreshTokenDb.js";
import {
  JWT_TOKEN_LIFESPAN_MINUTES,
  REFRESH_TOKEN_LIFESPAN_DAYS,
} from "../schemas/auth.js";

class AuthService {
  async registerUser({ username, email, password }) {
    // Check if user already exists
    const exists = await userRepository.isUserDuplicate({ username, email });
    if (exists) {
      throw new Error("UserAlreadyExists");
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Insert user and get ID
    const result = await userRepository.insertUser(
      username,
      email,
      hashedPassword
    );
    const userId = result.insertedId.toHexString();

    // Generate tokens
    const jwtExpiresAt = new Date(
      Date.now() + JWT_TOKEN_LIFESPAN_MINUTES * 60 * 1000
    );
    const refreshTokenExpiresAt = new Date(
      Date.now() + REFRESH_TOKEN_LIFESPAN_DAYS * 24 * 60 * 60 * 1000
    );

    const jwt = createJWT({
      id: userId,
      expiresIn: JWT_TOKEN_LIFESPAN_MINUTES * 60 * 1000,
    });

    const refreshToken = createRefreshToken();

    // Insert refresh token to database
    await refreshTokenRepository.insertRefreshToken(userId, refreshToken);
    return {
      userId,
      jwt,
      refreshToken,
      jwtExpiresAt,
      refreshTokenExpiresAt,
    };
  }
}

const authService = new AuthService();
export { authService };
