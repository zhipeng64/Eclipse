// Socket event handlers for chat messages
import messageService from "../MessageService.js";
import {
  roomIdSchema,
  messageContentSchema,
} from "../../validators/zodValidators.js";
import { notifyUser, notifyRoom } from "../socketHelper.js";
import { fr } from "zod/v4/locales";
export default function registerMessageListeners({ io, socket, userId }) {
  // Fetch conversation history for a chatroom
  socket.on("conversation", async ({ chatroomId, limit = 50, skip = 0 }) => {
    console.log(chatroomId);
    try {
      const formattedMessages = await messageService.getConversation({
        chatroomId,
        limit,
        skip,
      });
      console.log(typeof formattedMessages);

      await notifyUser(
        userId,
        "conversation",
        formattedMessages,
        process.env.EVENT_STATUS_INITIALIZE
      );
    } catch (err) {
      console.log(err.stack);
      socket.emit("conversation", [{ status: "ERROR", error: err.message }]);
    }
  });

  // Fetch the most recent message for a chatroom
  socket.on("recent-message", async ({ chatroom_id, callback }) => {
    try {
      const message = await messageService.fetchRecentMessage({ chatroom_id });
      callback && callback({ status: "SUCCESS", message });
      socket.emit("recent-message", [{ status: "SUCCESS", message }]);
    } catch (err) {
      callback && callback({ status: "ERROR", error: err.message });
      socket.emit("recent-message", [{ status: "ERROR", error: err.message }]);
    }
  });

  // Emits back to all clients' conversation history and recent messages
  socket.on("send-message", async ({ chatroomId, message }) => {
    console.log("send-message event received:", { chatroomId, message });
    try {
      if (!chatroomId || !message) {
        throw new Error("chatroomId and message are required");
      }
      // Validate and sanitize inputs as necessary here
      const isAuthorizedRoomId = roomIdSchema.safeParse(chatroomId);
      if (!isAuthorizedRoomId.success) {
        throw new Error("Invalid chatroomId format");
      }

      const isAuthorizedMessage = messageContentSchema.safeParse(message);
      if (!isAuthorizedMessage.success) {
        throw new Error("Invalid message format");
      }

      const messageId = await messageService.insertMessage({
        chatroomId,
        userId,
        message,
      });
      const formattedMessage = await messageService.getMessageById({
        messageId,
      });
      if (!formattedMessage) {
        throw new Error("Failed to retrieve the sent message");
      }

      console.log("Formatted message:", formattedMessage);
      console.log("ROOM ID:", chatroomId);
      await notifyRoom(
        io,
        chatroomId,
        "conversation",
        formattedMessage,
        process.env.EVENT_STATUS_PUSH
      );
    } catch (error) {
      console.error("Error in send-message:", error.stack);
    }
  });
}
