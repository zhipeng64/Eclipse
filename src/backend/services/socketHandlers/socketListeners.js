import friendService from "../FriendService.js";
import chatRoomService from "../ChatRoomService.js";
import userService from "../UserService.js";

export default function registerListeners({ socket, userId }) {
  // Handle disconnect event
  socket.on("disconnect", () => {
    console.log(`Client socket with socketId "${socket.id}" disconnected`);
  });

  // Handle request for pending friend requests
  socket.on("pending-friend-requests", async () => {
    try {
      const friendRequestList = await friendService.getPendingFriendRequests({
        userId,
      });

      socket.emit(
        "pending-friend-requests",
        friendRequestList,
        process.env.EVENT_STATUS_INITIALIZE
      );
    } catch (err) {
      console.error("Error in pending-friend-requests:", err.message);
    }
  });

  // Handle request for full friends list (including chatrooms)
  socket.on("friends-list", async () => {
    try {
      const friendsList = await friendService.notifyFriendsList({
        userId,
      });

      socket.emit(
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
  socket.on("join-chatroom", async (roomId, otherUsername) => {
    console.log("join-chatroom event received:", { roomId, otherUsername });
    if (!roomId || !otherUsername) {
      throw new Error("Invalid parameters supplied to join-chatroom");
    }

    // Check current user and other user are valid
    console.log("UserId and otherUsername:", { userId, otherUsername });
    const currentUser = await userService.getUserById({ userId });
    const otherUser = await userService.getUser({ username: otherUsername });
    if (!currentUser || !otherUser) {
      throw new Error("Failed to fetch users");
    }

    const otherUserId = otherUser?._id;
    // Check that the room is valid
    const chatRoom = await chatRoomService.getDMChatroom({
      userId1: userId,
      userId2: otherUserId,
    });
    console.log("Chatroom fetched:", chatRoom);
    if (!chatRoom || chatRoom._id !== roomId) {
      throw new Error(
        "Failed to fetch chatroom or supplied roomId does not match database chatroom id"
      );
    }
    socket.join(roomId);
    // socket.to(roomId).emit("join-chatroom", "A new user has joined the chatroom");
    socket.emit("join-chatroom", `Successfully joined chatroom: ${roomId}`);
  });
}
