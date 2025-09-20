// Low-level, generic CRUD operations
import { connectToMongo } from "./connection.js";
import { ALLOWED_COLLECTIONS } from "../schemas/database.js";
import { convertObjectIds, logWithDate } from "./util.js";
import { ObjectId } from "mongodb";

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
    const resultArray = await result.toArray();
    // logWithDate(result);

    // result is a Cursor object, convert to array
    return convertObjectIds(resultArray, ObjectId);
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

    return convertObjectIds(result, ObjectId);
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
    return convertObjectIds(result, ObjectId);
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
    return convertObjectIds(result, ObjectId);
  } catch (error) {
    throw error;
  }
};

export { getEntry, getAllEntry, insertEntry, updateEntry };
