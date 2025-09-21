// MongoDB repository for chat messages
import { getEntry, insertEntry, getAllEntry, updateEntry } from "./crud.js";
import { ObjectId } from "mongodb";

class MessagesDb {
  constructor() {
    this.collection = process.env.DB_MESSAGE_COLLECTION;
  }
  // Inserts a new message into the messages collection
  async insertMessage(chatroom_id, sentBy, message, timestamp) {
    const entry = {
      chatroom_id: new ObjectId(chatroom_id),
      sentBy: new ObjectId(sentBy),
      message,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
    };
    const result = await insertEntry(entry, this.collection);
    return result.insertedId;
  }

  // Fetch messages for a chatroom with pagination, sorted by timestamp ascending
  async getMessages(chatroom_id, limit = 50, skip = 0) {
    const db = await getDb();
    return db
      .collection(COLLECTION)
      .find({ chatroom_id: new ObjectId(chatroom_id) })
      .sort({ timestamp: 1 })
      .skip(skip)
      .limit(limit)
      .toArray();
  }

  // Fetch a single message by its ID
  async getMessageById(messageId) {
    if (!messageId) {
      throw new Error("Invalid messageId supplied to getMessageById");
    }
    const query = { _id: new ObjectId(messageId) };
    return await getEntry(query, this.collection);
  }
}

const messageRepository = new MessagesDb();
export default messageRepository;
