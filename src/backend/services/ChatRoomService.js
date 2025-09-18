import { ObjectId } from "mongodb";
import chatroomRepository from "../database/ChatRoomDb.js";

class ChatRoomService {
  async getDMChatroom(userId1, userId2) {
    const id1 = new ObjectId(userId1);
    const id2 = new ObjectId(userId2);

    // Sort to ensure consistent ordering
    const sortedParticipants = [id1, id2].sort((a, b) =>
      a.toString().localeCompare(b.toString())
    );

    // Check if DM chatroom already exists
    const existingChatroom = await chatroomRepository.getDMChatroom({
      userId1: sortedParticipants[0],
      userId2: sortedParticipants[1],
    });

    if (existingChatroom) {
      return existingChatroom._id;
    }
  }
  async insertDMChatroom(userId1, userId2) {
    const id1 = new ObjectId(userId1);
    const id2 = new ObjectId(userId2);

    // Create a new DM chatroom
    const result = await chatroomRepository.insertDMChatroom({
      userId1: id1,
      userId2: id2,
    });
    if (!result?.insertedId) {
      throw new Error("Failed to create DM chatroom");
    }
    console.log("new chatroom created!");
    return result.insertedId;
  }
}

const chatRoomService = new ChatRoomService();
export default chatRoomService;
