import chatroomRepository from "../database/ChatRoomDb.js";
import messageService from "./MessageService.js";

class ChatRoomService {
  constructor(messageService) {
    this.messageService = messageService;
  }

  async getDMChatroom({ userId1, userId2 }) {
    if (!userId1 || !userId2) {
      throw new Error("Invalid user IDs supplied to getDMChatroom");
    }
    // Service layer deals with hex string ids only; repository will convert
    // Sort by string to ensure consistent ordering
    const sortedParticipants = [userId1, userId2].sort((a, b) =>
      a.toString().localeCompare(b.toString())
    );

    // Check if DM chatroom already exists
    const existingChatroom = await chatroomRepository.getDMChatroom(
      sortedParticipants[0],
      sortedParticipants[1]
    );

    if (existingChatroom) {
      return existingChatroom;
    }
  }

  async getDMChatroomById({ chatroomId }) {
    if (!chatroomId) {
      throw new Error("Invalid chatroomId supplied to getDMChatroomById");
    }
    const chatroom = await chatroomRepository.getChatroomById(chatroomId);
    return chatroom;
  }

  async insertDMChatroom({ userId1, userId2 }) {
    if (!userId1 || !userId2) {
      throw new Error("Invalid user IDs supplied to insertDMChatroom");
    }
    console.log("Inserting DM chatroom with users:", { userId1, userId2 });
    // Pass hex strings to repository; repository will convert
    const chatroomId = await chatroomRepository.insertDMChatroom(
      userId1,
      userId2
    );
    if (!chatroomId) {
      throw new Error("Failed to create DM chatroom");
    }
    console.log("new chatroom created!");
    return chatroomId;
  }
}

const chatRoomService = new ChatRoomService(messageService);
export default chatRoomService;
