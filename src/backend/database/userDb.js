import { getEntry, insertEntry } from "./crud.js";
import { ObjectId } from "mongodb";
import { convertObjectIds } from "./util.js";

class UserRepository {
  constructor() {
    this.collection = process.env.DB_USER_COLLECTION;
  }

  // Get
  async getUser(username, email = null) {
    if (!username)
      throw new Error(
        "Invalid parameters given when getting a user from database"
      );
    // Check if user exists in database
    const query = { $or: [{ "account.username": username }] };

    // Email is optional
    if (email) {
      query.$or.push({ "account.email": email });
    }
    const user = await getEntry(query, this.collection);
    return user;
  }

  async getUserById(userId) {
    if (!userId) {
      throw new Error("Failed to get user by id");
    }
    const query = { _id: new ObjectId(userId) };
    const user = await getEntry(query, this.collection);
    // Convert any ObjectId fields to hex strings before returning
    return user;
  }

  // Insert
  async insertUser(account, profile) {
    if (!account || !profile)
      throw new Error(
        "Invalid parameters given when inserting user to database"
      );
    const entry = {
      account,
      profile,
    };
    const collection = this.collection;
    const result = await insertEntry(entry, collection);
    return result;
  }
}

const userRepository = new UserRepository();
export default userRepository;
