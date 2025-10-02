// MongoDB repository for chat messages
import { insertEntry, getAggregation } from "./crud.js";
import { ObjectId } from "mongodb";
import { convertObjectIds } from "./util.js";
import { connectToMongo } from "./connection.js";

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
      {
        $project: {
          _id: 1,
          message: 1,
          timestamp: 1,
          chatroomId: 1,
          sentBy: 1,
          userDetails: {
            account: { username: 1 },
          },
        },
      },
      { $sort: { timestamp: 1 } }, // Sort by timestamp ascending order
    ];
    const cursor = await getAggregation(aggregationQuery, this.collection);

    // Explain the results
    // let db = await connectToMongo();
    // const explanation = await db
    //   .collection(this.collection)
    //   .aggregate(aggregationQuery)
    //   .explain("executionStats");
    // console.dir(explanation, { depth: 5, colors: true }); // Use console.dir to avoid circular ref error

    // for await (const doc of cursor) {
    //   results.push(doc);
    // }
    console.time("Cursor toArray Time");
    const results = await cursor.toArray(); // Faster than for-await loop
    console.timeEnd("Cursor toArray Time");
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
}

const messageRepository = new MessagesDb();
export default messageRepository;
