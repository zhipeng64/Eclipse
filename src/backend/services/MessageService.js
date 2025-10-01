import messageRepository from "../database/MessagesDb.js";

class MessageService {
  async getConversation({ chatroomId, limit = 50, skip = 0 }) {
    try {
      if (!chatroomId) {
        throw new Error("Invalid chatroomId supplied to fetchConversation");
      }
      console.time("Cursor Traversal and Enrichment Time");
      const messages = await messageRepository.getMessages({
        chatroomId: chatroomId,
      });
      console.timeEnd("Cursor Traversal and Enrichment Time");
      return {
        messages: await this._getMessageUserInfoList(messages),
      };
    } catch (error) {
      throw new Error(`Failed to fetch conversation: ${error.message}`);
    }
  }

  async fetchRecentMessage({ chatroom_id }) {
    try {
      const msg = await messageRepository.getRecentMessage({ chatroom_id }); // Fixed: use messageRepository consistently
      if (!msg) return null;
      const [enriched] = await this._enrichMessagesWithUserData([msg]);
      return enriched;
    } catch (error) {
      throw new Error(`Failed to fetch recent message: ${error.message}`);
    }
  }

  async insertMessage({ chatroomId, userId, message }) {
    const messageId = await messageRepository.insertMessage(
      chatroomId,
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
    if (!message) {
      throw new Error("MessageId not found in database");
    }
    return {
      messages: [this._mapMessageWithUserDetails(message)],
    };
  }

  // Maps a single message to include user details
  _mapMessageWithUserDetails(message) {
    if (!message) return null;
    const userDetails = message.userDetails;
    const account = userDetails?.account;
    const profile = userDetails?.profile;

    return {
      messageId: message._id,
      chatroomId: message.chatroomId,
      sentBy: account?.username,
      avatar: profile?.avatarImage,
      avatarImageType: profile?.avatarImageType,
      message: message.message,
      timestamp: message.timestamp,
    };
  }

  // Maps an array of messages to include user details
  _getMessageUserInfoList(messages) {
    if (!messages || messages.length === 0) return [];
    return messages.map((msg) => this._mapMessageWithUserDetails(msg));
  }
}

const messageService = new MessageService();
export default messageService;
