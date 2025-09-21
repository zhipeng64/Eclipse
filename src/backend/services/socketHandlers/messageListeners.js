// Socket event handlers for chat messages
import messageService from "../MessageService.js";
export default function registerMessageListeners({ io, socket, userId }) {
  // Fetch conversation history for a chatroom
  socket.on(
    "fetch-conversation",
    async (chatroom_id, limit = 50, skip = 0, callback) => {
      try {
        const messages = await messageService.fetchConversation({
          chatroom_id,
          limit,
          skip,
        });
        callback && callback({ status: "SUCCESS", messages });
        socket.emit("fetch-conversation", [{ status: "SUCCESS", messages }]);
      } catch (err) {
        callback && callback({ status: "ERROR", error: err.message });
        socket.emit("fetch-conversation", [
          { status: "ERROR", error: err.message },
        ]);
      }
    }
  );

  // Fetch the most recent message for a chatroom
  socket.on("recent-message", async (chatroom_id, callback) => {
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
  socket.on("send-message", async (chatroom_id, message) => {
    try {
      if (!chatroom_id || !message) {
        throw new Error("chatroom_id and message are required");
      }
      const messageId = await messageService.insertMessage({
        chatroom_id,
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
      console.log("ROOM ID:", chatroom_id);
      // Emit the new message to all participants in the chatroom
      io.to(chatroom_id).emit(
        "conversation",
        formattedMessage,
        process.env.EVENT_STATUS_PUSH
      );
    } catch (error) {
      console.error("Error in send-message:", error.stack);
    }
  });
}
