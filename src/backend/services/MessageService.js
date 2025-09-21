import userRepository from "../database/UserDb.js";
import messageRepository from "../database/MessagesDb.js";

class MessageService {
  async fetchConversation({ chatroom_id, limit = 50, skip = 0 }) {
    try {
      const messages = await messageRepository.getMessages(
        chatroom_id,
        limit,
        skip
      );
      return await this._enrichMessagesWithUserData(messages);
    } catch (error) {
      throw new Error(`Failed to fetch conversation: ${error.message}`);
    }
  }

  async fetchRecentMessage({ chatroom_id }) {
    try {
      const msg = await MessagesDb.getRecentMessage({ chatroom_id });
      if (!msg) return null;
      const [enriched] = await enrichMessagesWithUserData([msg]);
      return enriched;
    } catch (error) {
      throw new Error(`Failed to fetch recent message: ${error.message}`);
    }
  }

  async insertMessage({ chatroom_id, userId, message }) {
    const messageId = await messageRepository.insertMessage(
      chatroom_id,
      userId,
      message
    );
    if (!messageId) {
      throw new Error("Failed to insert message");
    }
    return messageId;
  }

  async getMessageById({ messageId }) {
    if (!messageId) {
      throw new Error("Invalid messageId supplied to getMessageById");
    }
    const message = await messageRepository.getMessageById(messageId);
    return this._enrichMessagesWithUserData(message);
  }

  // Utility to enrich messages with user data
  async _enrichMessagesWithUserData(messages) {
    if (!messages || messages.length === 0) return [];
    if (!Array.isArray(messages)) {
      messages = [messages];
    }
    const userIds = messages.map((msg) =>
      msg.sentBy ? msg.sentBy : msg.sentBy
    );
    const users = await Promise.all(
      userIds.map(async (id) => {
        return await userRepository.getUserById(id);
      })
    );
    return messages.map((msg, index) => ({
      messageId: msg._id,
      chatroomId: msg.chatroom_id,
      sentBy: users[index]?.account?.username,
      avatar: users[index]?.profile?.avatarImage,
      message: msg?.message,
      timestamp: msg?.timestamp,
    }));
  }
}

const messageService = new MessageService();
export default messageService;
