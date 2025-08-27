import { insertEntry } from "./crud.js";
import { REFRESH_TOKEN_LIFESPAN_DAYS } from "../schemas/auth.js";

class RefreshTokenRepository {
  constructor() {
    this.collection = process.env.DB_REFRESH_TOKEN_COLLECTION;
  }

  async insertRefreshToken(userId, refreshToken) {
    const entry = {
      userId: userId,
      token: refreshToken,
      expiresAt: new Date(
        Date.now() + REFRESH_TOKEN_LIFESPAN_DAYS * 24 * 60 * 60 * 1000
      ),
    };
    const collection = this.collection;
    await insertEntry(entry, collection);
  }
}

const refreshTokenRepository = new RefreshTokenRepository();
export { refreshTokenRepository };
