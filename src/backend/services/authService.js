import jwt from "jsonwebtoken";
import { refreshTokenRepository } from "../database/RefreshTokenDb.js";
import authValidator from "../validators/AuthValidator.js";
import {
  JWT_TOKEN_LIFESPAN_MINUTES,
  REFRESH_TOKEN_LIFESPAN_DAYS,
} from "../schemas/auth.js";
import { createJWT, createRefreshToken } from "../utils/auth.js";
import { ref } from "process";
export class AuthService {
  // Gets JWT token duration in milliseconds
  static getJwtTokenDuration() {
    const jwtExpiresAt = JWT_TOKEN_LIFESPAN_MINUTES * 60 * 1000;
    return jwtExpiresAt;
  }

  // Gets Refresh token duration in milliseconds
  static getRefreshTokenDuration() {
    const refreshTokenExpiresAt =
      REFRESH_TOKEN_LIFESPAN_DAYS * 24 * 60 * 60 * 1000;
    return refreshTokenExpiresAt;
  }

  // Gets JWT token expiration date, calculated using the current time and its duration
  static getJwtTokenExpiration() {
    const jwtDuration = AuthService.getJwtTokenDuration();
    const jwtExpiration = Date.now() + jwtDuration;
    return jwtExpiration;
  }

  // Gets refresh token expiration date, calculated using the current time and its duration
  static getRefreshTokenExpiration() {
    const refreshTokenDuration = AuthService.getRefreshTokenDuration();
    const refreshTokenExpiration = Date.now() + refreshTokenDuration;
    return refreshTokenExpiration;
  }

  // Creates a signed JWT token
  static createJwtToken(userId) {
    console.log("Received user id: ");
    console.log(userId);
    // Options specified are implictly inserted into the jwt token payload by jsonwebtoken
    // Note: Payload data is serialized with JSON.stringify
    const jwt = createJWT(
      {
        id: userId,
      },
      { expiresIn: AuthService.getJwtTokenDuration().toString() }
    );
    return jwt;
  }

  // Creates a full refresh token
  static createRefreshToken() {
    const refreshToken = createRefreshToken();
    return refreshToken;
  }

  // Checks authentication status of user
  // To pass the check, a user must have only a jwt token, or a refresh token, or both.
  // The optional jwtCallback adds support for middleware to set its cookie
  // Returns the jwt token
  async validateTokens(jwtToken, refreshToken, jwtCallback = null) {
    var parsedJwtToken = null;
    var parsedRefreshToken = null;
    try {
      // Jwt token present
      if (jwtToken) {
        parsedJwtToken = await this.decodeAndVerifyJwt(jwtToken);
        return parsedJwtToken;
      }

      // Refresh token present
      if (refreshToken) {
        parsedRefreshToken =
          await this.decodeAndVerifyRefreshToken(refreshToken);

        // Get the userId associated with the refresh token
        const userId = parsedRefreshToken.userId;
        const newJwtToken = AuthService.createJwtToken(userId);
        const duration = AuthService.getJwtTokenDuration();
        parsedJwtToken = await this.decodeAndVerifyJwt(newJwtToken);

        // Optional callback to set jwt cookie for middleware
        if (jwtCallback) {
          jwtCallback(newJwtToken, duration);
        }
        return parsedJwtToken;
      }
    } catch (error) {
      throw error;
    }
  }

  // Verifies refresh token validity
  async decodeAndVerifyRefreshToken(refreshToken) {
    if (!refreshToken) {
      throw new Error("Refresh token is a falsy value");
    }
    if (authValidator.isRefreshTokenFormatInvalid(refreshToken)) {
      throw new Error("Refresh token format is invalid");
    }

    try {
      const dbRefreshToken =
        await refreshTokenRepository.getRefreshToken(refreshToken);

      if (!dbRefreshToken) {
        throw new Error("Database refresh token not found");
      }
      return dbRefreshToken;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // Returns decoded JWT if valid, null if not
  async decodeAndVerifyJwt(jwtToken) {
    if (!jwtToken) {
      console.log("JWT is a falsy value");
      return null;
    }

    try {
      // Decode and verify the token
      const decodedJwt = jwt.verify(jwtToken, process.env.JWT_SECRET);

      console.log(decodedJwt);
      if (authValidator.isJwtFormatInvalid(decodedJwt)) {
        console.log("JWT token format is invalid");
        return null;
      }

      return decodedJwt;
    } catch (err) {
      console.log("JWT verification failed:", err.message);
      return null;
    }
  }
}

const authService = new AuthService();
export default authService;
