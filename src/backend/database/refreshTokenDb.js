import { insertEntry } from "./crud.js";
import { REFRESH_TOKEN_LIFESPAN_DAYS } from "../schemas/auth.js";

const insertRefreshToken = async (userId, refreshToken) => {
  const entry = {
    userId: userId,
    token: refreshToken,
    expiresAt: new Date(
      Date.now() + REFRESH_TOKEN_LIFESPAN_DAYS * 24 * 60 * 60 * 1000
    ),
  };
  const collection = process.env.DB_REFRESH_TOKEN_COLLECTION;
  await insertEntry(entry, collection);
};

export { insertRefreshToken };
