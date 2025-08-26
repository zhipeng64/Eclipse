import { connectToMongo } from "./connection.js";
import { ALLOWED_COLLECTIONS } from "../schemas/database.js";

const getEntry = async (query, collection) => {
  if (
    !query ||
    Object.keys(query).length === 0 ||
    !ALLOWED_COLLECTIONS.includes(collection)
  ) {
    console.log("Invalid input to getEntry:", { query, collection });
    throw new Error("Failed to get entry: invalid query or collection");
  }

  try {
    const db = await connectToMongo();
    const result = await db.collection(collection).findOne(query);
    console.log("Entry retrieved successfully:", result);
    return result;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};

const insertEntry = async (query, collection) => {
  if (
    !query ||
    Object.keys(query).length === 0 ||
    !ALLOWED_COLLECTIONS.includes(collection)
  ) {
    console.log("Invalid input to insertEntry:", { query, collection });
    throw new Error("Failed to insert entry: invalid query or collection");
  }

  try {
    const db = await connectToMongo();
    const result = await db.collection(collection).insertOne(query);
    console.log("Entry inserted successfully");
    return result;
  } catch (error) {
    console.error("Error inserting entry:", error);
    throw error;
  }
};

export { getEntry, insertEntry };
