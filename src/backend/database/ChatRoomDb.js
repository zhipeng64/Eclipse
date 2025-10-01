import { ObjectId } from "mongodb";
import { getEntry, getAllEntry, insertEntry, updateEntry } from "./crud.js";
import { convertObjectIds } from "./util.js";

class ChatroomRepository {
  constructor() {
    this.collection = process.env.DB_CHATROOM_COLLECTION;
  }

  /**
   * Finds a DM chatroom between two users
   */
  async getDMChatroom(userId1, userId2) {
    if (!userId1 || !userId2) {
      throw new Error("Invalid user IDs supplied to getDMChatroom");
    }
    // Convert hex ids to ObjectId instances
    const participants = [new ObjectId(userId1), new ObjectId(userId2)];
    const query = {
      isGroup: false,
      participants: { $all: participants, $size: 2 },
    };

    const result = await getEntry(query, this.collection);
    return convertObjectIds(result, ObjectId);
  }

  /**
   * Inserts a new DM chatroom
   */
  async insertDMChatroom(userId1, userId2) {
    if (!userId1 || !userId2) {
      throw new Error("Invalid user IDs supplied to insertDMChatroom");
    }

    const newChatroom = {
      isGroup: false,
      participants: [new ObjectId(userId1), new ObjectId(userId2)],
      recentMessageId: null,
      createdAt: new Date(),
    };

    const result = await insertEntry(newChatroom, this.collection);
    return convertObjectIds(result.insertedId, ObjectId);
  }

  /**
   * Gets all chatrooms a user is a part of
   */
  async getUserChatrooms(userId) {
    if (!userId) {
      throw new Error("Invalid userId supplied to getUserChatrooms");
    }

    const query = {
      participants: new ObjectId(userId),
    };

    const cursor = await getAllEntry(query, this.collection);
    let result = [];
    for await (const doc of cursor) {
      result.push(doc);
    }
    return convertObjectIds(result, ObjectId);
  }

  /**
   * Gets a chatroom by ID (used to validate access, etc.)
   */
  async getChatroomById(chatroomId) {
    if (!chatroomId) {
      throw new Error("Invalid chatroomId supplied");
    }

    const query = {
      _id: new ObjectId(chatroomId),
    };

    const result = await getEntry(query, this.collection);
    return convertObjectIds(result, ObjectId);
  }

  /**
   * Updates recent message for a chatroom
   */
  async updateRecentMessage(chatroomId, messageId) {
    if (!chatroomId || !messageId) {
      throw new Error("Invalid parameters supplied to updateRecentMessage");
    }

    const query = { _id: new ObjectId(chatroomId) };
    const update = { $set: { recentMessageId: messageId } };

    await updateEntry(query, update, null, this.collection);
    return true;
  }
}

const chatroomRepository = new ChatroomRepository();
export default chatroomRepository;
