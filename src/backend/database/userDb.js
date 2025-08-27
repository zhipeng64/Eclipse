import { getEntry, insertEntry } from "./crud.js";

class UserRepository {
  constructor() {
    this.collection = process.env.DB_USER_COLLECTION;
  }

  // Search
  async isUserDuplicate(username, email) {
    // Check if user exists in database
    const query = { $or: [{ username }, { email }] };
    const userExist = await getEntry(query, this.collection);
    return userExist;
  }

  // Insert
  async insertUser(username, email, hashedPassword) {
    const entry = {
      username,
      email,
      hashedPassword,
    };
    const collection = this.collection;
    const result = await insertEntry(entry, collection);
    return result;
  }
}

const userRepository = new UserRepository();
export { userRepository };
