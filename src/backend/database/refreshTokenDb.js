import { getEntry, insertEntry, updateEntry } from "./crud.js";
import { hashString } from "../utils/auth.js";
import { AuthService } from "../services/authService.js";

class RefreshTokenRepository {
  constructor() {
    this.collection = process.env.DB_REFRESH_TOKEN_COLLECTION;
  }

  // userId is an ObjectId(<hex_string>) type, not a plain hexadecimal string
  async insertRefreshToken(userId, refreshToken) {
    if (!userId || !refreshToken)
      throw new Error(
        "Invalid parameters given when inserting refresh token to database"
      );
    const entry = {
      userId: userId,
      token: hashString(refreshToken), // Stores the sha-256 hashed version of refresh token into database
      expiresAt: new Date(AuthService.getRefreshTokenExpiration()),
    };
    await insertEntry(entry, this.collection);
  }

  async getRefreshToken(refreshToken) {
    if (!refreshToken)
      throw new Error(
        "Invalid parameters given when getting refresh token from database"
      );
    const query = {
      token: hashString(refreshToken),
    };
    return await getEntry(query, this.collection);
  }

  async updateRefreshToken(userId, newRefreshToken) {
    if (!userId || !newRefreshToken)
      throw new Error(
        "Invalid parameters given when updating refresh token to database"
      );
    // Filter to match documents
    const query = {
      userId: userId,
    };

    // The properties you specify that will be updated (unspecified ones remain unchanged)
    const update = {
      $set: { token: hashString(newRefreshToken) },
    };

    const options = {};
    const result = await updateEntry(
      query,
      update,
      options,
      process.env.DB_REFRESH_TOKEN_COLLECTION
    );
    return result;
  }
}

const refreshTokenRepository = new RefreshTokenRepository();
export { refreshTokenRepository };
