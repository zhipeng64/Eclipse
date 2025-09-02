import jwt from "jsonwebtoken";
import { refreshTokenRepository } from "../database/RefreshTokenDb.js";
import {
  isJwtFormatInvalid,
  isRefreshTokenFormatInvalid,
} from "../validators/auth.js";
import {
  JWT_TOKEN_LIFESPAN_MINUTES,
  REFRESH_TOKEN_LIFESPAN_DAYS,
} from "../schemas/auth.js";
import { createJWT, createRefreshToken } from "../utils/auth.js";
export class AuthService {
  // Gets JWT token expiration (ms)
  static getJwtTokenExpiration() {
    const jwtExpiresAt = new Date(
      Date.now() + JWT_TOKEN_LIFESPAN_MINUTES * 60 * 1000
    );
    return jwtExpiresAt;
  }

  // Gets Refresh token expiration (ms)
  static getRefreshTokenExpiration() {
    const refreshTokenExpiresAt = new Date(
      Date.now() + REFRESH_TOKEN_LIFESPAN_DAYS * 24 * 60 * 60 * 1000
    );
    return refreshTokenExpiresAt;
  }

  // Creates a signed JWT token
  static createJwtToken(userId) {
    const jwt = createJWT({
      id: userId,
      expiresIn: AuthService.getJwtTokenExpiration().toString(), // In ms
    });
    return jwt;
  }

  // Creates a full refresh token
  static createRefreshToken() {
    const refreshToken = createRefreshToken();
    return refreshToken;
  }

  // Verifies refresh token validity
  async isRefreshTokenValid(refreshToken) {
    if (!refreshToken) {
      throw new Error("Refresh token is a falsy value");
    }
    if (isRefreshTokenFormatInvalid(refreshToken)) {
      throw new Error("Refresh token format is invalid");
    }

    try {
      const dbRefreshToken =
        await refreshTokenRepository.getRefreshToken(refreshToken);

      if (!dbRefreshToken) {
        throw new Error("Database refresh token not found");
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // Verifies JWT token validity
  async isJwtTokenValid(jwtToken) {
    if (!jwtToken) {
      throw new Error("JWT is a falsy value");
    }
    try {
      // Verify JWT signature and expiration
      // If failed, the method throws an error
      const decodedJwt = jwt.verify(jwtToken, process.env.JWT_SECRET);

      // Verify the decoded JWT message format
      if (isJwtFormatInvalid(decodedJwt)) {
        throw new Error("JWT token format is invalid");
      }
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

const authService = new AuthService();
export default authService;
