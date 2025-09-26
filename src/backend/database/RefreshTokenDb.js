import { getEntry, insertEntry, updateEntry } from "./crud.js";
import { hashString } from "../utils/auth.js";
import { AuthService } from "../services/AuthService.js";
import { ObjectId } from "mongodb";

class RefreshTokenRepository {
  constructor() {
    this.collection = process.env.DB_REFRESH_TOKEN_COLLECTION;
  }

  // userId is a hex string
  async insertRefreshToken(userId, refreshToken) {
    if (!userId || !refreshToken)
      throw new Error(
        "Invalid parameters given when inserting refresh token to database"
      );
    const entry = {
      userId: new ObjectId(userId),
      token: hashString(refreshToken), // Stores the sha-256 hashed version of refresh token into database
      expiresAt: new Date(AuthService.getRefreshTokenExpiration()),
    };
    const result = await insertEntry(entry, this.collection);
    return result.insertedId;
  }

  async getRefreshToken(refreshToken) {
    if (!refreshToken)
      throw new Error(
        "Invalid parameters given when getting refresh token from database"
      );
    const query = {
      token: hashString(refreshToken),
    };
    const result = await getEntry(query, this.collection);
    return result;
  }

  async updateRefreshToken(userId, newRefreshToken) {
    if (!userId || !newRefreshToken)
      throw new Error(
        "Invalid parameters given when updating refresh token to database"
      );
    // Filter to match documents (userId supplied as hex string)
    const query = {
      userId: new ObjectId(userId),
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
