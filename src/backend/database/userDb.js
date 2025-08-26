import { getEntry, insertEntry } from "./crud.js";

// Search
const isUserDuplicate = async (username, email) => {
  // Check if user exists in database
  const query = { $or: [{ username }, { email }] };
  const userExist = await getEntry(query, process.env.DB_USER_COLLECTION);
  return userExist;
};

// Insert
const insertUser = async (username, email, hashedPassword) => {
  const entry = {
    username,
    email,
    hashedPassword,
  };
  const collection = process.env.DB_USER_COLLECTION;
  const result = await insertEntry(entry, collection);
  return result;
};

export { isUserDuplicate, insertUser };
