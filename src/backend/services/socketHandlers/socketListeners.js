import friendService from "../FriendService.js";
import chatRoomService from "../ChatRoomService.js";
import userService from "../UserService.js";
import { roomIdSchema } from "../../validators/zodValidators.js";
import { sanitizedStringSchema } from "../../sanitizers/zodSanitizers.js";
import registerMessageListeners from "./messageListeners.js";
import { notifyUser, notifyRoom } from "../socketHelper.js";

export default function registerListeners({ io, socket, userId }) {
  registerMessageListeners({ io, socket, userId });
  socket.on("error", (err) => {
    console.error(`Socket error on ${socket.id}:`, err);
  });

  // Handle disconnect event
  socket.on("disconnect", () => {
    console.log(`Client socket with socketId "${socket.id}" disconnected`);
  });

  // Gets incoming pending friend requests for user
  socket.on("pending-friend-requests", async () => {
    try {
      const friendRequestList = await friendService.getPendingFriendRequests({
        userId,
      });

      console.log("Emitting pending-friend-requests:", friendRequestList);
      notifyUser(
        userId,
        "pending-friend-requests",
        friendRequestList,
        process.env.EVENT_STATUS_INITIALIZE
      );
    } catch (err) {
      console.error("Error in pending-friend-requests:", err.stack);
    }
  });

  // Handle request for full friends list
  socket.on("friends-list", async () => {
    try {
      const friendsList = await friendService.getFriendsList({ userId });
      await notifyUser(
        userId,
        "friends-list",
        friendsList,
        process.env.EVENT_STATUS_INITIALIZE
      );
    } catch (err) {
      console.error("Error in friends-list:", err.message);
      console.error(err.stack);
    }
  });

  // Handles a client socket joining a DM chat room
  socket.on("join-chatroom", async ({ roomId }) => {
    try {
      console.log("join-chatroom event received:", roomId);
      if (!roomId) {
        throw new Error("Invalid parameters supplied to join-chatroom");
      }

      // Validate the roomId
      const isValidRoomId = roomIdSchema.safeParse(roomId);
      if (!isValidRoomId.success) {
        throw new Error("Invalid roomId format supplied to join-chatroom");
      }
      // Sanitize the roomId
      const sanitizedRoomId = sanitizedStringSchema.parse(roomId);
      console.log("Sanitized roomId:", sanitizedRoomId);

      // Check current user is valid
      const currentUser = await userService.getUserById({ userId });
      if (!currentUser) {
        throw new Error("Failed to fetch current user");
      }

      // Check that the room is valid
      const chatRoom = await chatRoomService.getDMChatroomById({
        chatroomId: sanitizedRoomId,
      });
      if (!chatRoom || chatRoom._id !== sanitizedRoomId) {
        throw new Error(
          "Failed to fetch chatroom or supplied roomId does not match database chatroom id"
        );
      }
      socket.join(sanitizedRoomId);
      console.log("SOCKET HAS JOINED ROOM:", sanitizedRoomId);
      await notifyRoom(
        socket,
        sanitizedRoomId,
        "join-chatroom",
        "A new user has joined the chatroom"
      );
    } catch (err) {
      console.error("Error in join-chatroom:", err.message);
      console.error(err.stack);
    }
  });
}
