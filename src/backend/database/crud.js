// Low-level, generic CRUD operations
import { connectToMongo } from "./connection.js";
import { ALLOWED_COLLECTIONS } from "../schemas/database.js";
import { logWithDate } from "./util.js";

const getAllEntry = async (query, collection) => {
  try {
    if (
      !query ||
      Object.keys(query).length === 0 ||
      !ALLOWED_COLLECTIONS.includes(collection)
    ) {
      throw new Error("Failed to get entry: invalid query or collection");
    }

    const db = await connectToMongo();
    const result = await db.collection(collection).find(query);
    // logWithDate(result);

    return result;
  } catch (error) {
    throw error;
  }
};

const getEntry = async (query, collection) => {
  try {
    if (
      !query ||
      Object.keys(query).length === 0 ||
      !ALLOWED_COLLECTIONS.includes(collection)
    ) {
      throw new Error("Failed to get entry: invalid query or collection");
    }

    const db = await connectToMongo();
    const result = await db.collection(collection).findOne(query);
    // logWithDate(result);

    return result;
  } catch (error) {
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
    throw error;
  }
};

const updateEntry = async (query, update, options, collection) => {
  if (
    !query ||
    Object.keys(query).length === 0 ||
    !ALLOWED_COLLECTIONS.includes(collection) ||
    !update ||
    Object.keys(update).length === 0
  ) {
    console.log("Invalid input to updateEntry:", {
      query,
      collection,
      update,
      options,
    });
    throw new Error(
      "Failed to update entry: invalid query, update, options, or collection"
    );
  }

  try {
    const db = await connectToMongo();
    var result;
    if (options) {
      result = await db
        .collection(collection)
        .updateOne(query, update, options);
    } else {
      result = await db.collection(collection).updateOne(query, update);
    }
    return result;
  } catch (error) {
    throw error;
  }
};

export { getEntry, getAllEntry, insertEntry, updateEntry };
