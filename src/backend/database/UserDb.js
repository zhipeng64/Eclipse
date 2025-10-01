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
    return convertObjectIds(user, ObjectId);
  }

  async getUserById(userId) {
    if (!userId) {
      throw new Error("Failed to get user by id");
    }
    const query = { _id: new ObjectId(userId) };
    const user = await getEntry(query, this.collection);
    return convertObjectIds(user, ObjectId);
  }

  // Insert
  async insertUser({ username, email, hashedPassword, imageData, imageType }) {
    if (!username || !email || !hashedPassword || !imageData || !imageType)
      throw new Error(
        "Invalid parameters given when inserting user to database"
      );
    const entry = {
      account: {
        username,
        email,
        hashedPassword,
      },
      profile: {
        avatarImage: imageData,
        avatarImageType: imageType,
      },
    };
    const collection = this.collection;
    const result = await insertEntry(entry, collection);
    return convertObjectIds(result.insertedId, ObjectId);
  }
}

const userRepository = new UserRepository();
export default userRepository;
