// MongoDB repository for chat messages
import { insertEntry, getAggregation } from "./crud.js";
import { ObjectId } from "mongodb";
import { convertObjectIds } from "./util.js";

class MessagesDb {
  constructor() {
    this.collection = process.env.DB_MESSAGE_COLLECTION;
  }
  // Inserts a new message into the messages collection
  async insertMessage(chatroomId, sentBy, message, timestamp) {
    const entry = {
      chatroomId: new ObjectId(chatroomId),
      sentBy: new ObjectId(sentBy),
      message,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
    };
    const result = await insertEntry(entry, this.collection);
    return convertObjectIds(result.insertedId, ObjectId);
  }

  // Fetch messages for a chatroom with pagination, sorted by timestamp ascending
  async getMessages(matchFilter, limit = 50, skip = 0) {
    // const db = await getDb();
    // return db
    //   .collection(COLLECTION)
    //   .find({ chatroom_id: new ObjectId(chatroom_id) })
    //   .sort({ timestamp: 1 })
    //   .skip(skip)
    //   .limit(limit)
    //   .toArray();
    if (!matchFilter) {
      throw new Error("Invalid chatroomId supplied to getMessages");
    }

    // Convert ids to ObjectId
    if (matchFilter.chatroomId) {
      matchFilter.chatroomId = new ObjectId(matchFilter.chatroomId);
    }
    if (matchFilter.sentBy) {
      matchFilter.sentBy = new ObjectId(matchFilter.sentBy);
    }

    const aggregationQuery = [
      {
        $match: { ...matchFilter },
      },
      {
        $lookup: {
          from: "users",
          localField: "sentBy",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" }, // Unwind because message and user is 1-to-many relationship
      { $sort: { timestamp: -1 } }, // Sort by timestamp descending order
    ];
    console.time("MESSAGE AGGREGATION TIME");
    const cursor = await getAggregation(aggregationQuery, this.collection);
    const results = [];
    console.timeEnd("MESSAGE AGGREGATION TIME");

    for await (const doc of cursor) {
      results.push(doc);
    }
    return results.length > 0 ? convertObjectIds(results, ObjectId) : [];
  }

  // Fetch a single message by its ID
  async getMessageById(messageId) {
    if (!messageId) {
      throw new Error("Invalid messageId supplied to getMessageById");
    }
    const aggregationQuery = { _id: new ObjectId(messageId) };
    const result = await this.getMessages(aggregationQuery);
    return result.length === 1 ? result[0] : null;
  }

  // Fetch a single user's avatar (profile.avatarImage and profile.avatarImageType) on demand
  async getUserAvatar(userId) {
    if (!userId) {
      throw new Error("Invalid userId supplied to getUserAvatar");
    }
    const _id = new ObjectId(userId);
    const pipeline = [
      { $match: { _id } },
      { $project: { "profile.avatarImage": 1, "profile.avatarImageType": 1 } },
    ];
    const cursor = await getAggregation(pipeline, "users");
    for await (const doc of cursor) {
      // return the profile object (may contain binary avatar)
      return doc.profile || null;
    }
    return null;
  }
}

const messageRepository = new MessagesDb();
export default messageRepository;
