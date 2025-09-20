import friendRepository from "../database/FriendDb.js";
import userRepository from "../database/UserDb.js";
import { getFriendRequestUserInfoList } from "./friendHelper.js";
import { notifyUser } from "./socketHelper.js";
import { AppError } from "../utils/AppError.js";
import { getMap } from "../socket.js";
import chatRoomService from "./ChatRoomService.js";

class FriendService {
  constructor(chatRoomService) {
    this.chatRoomService = chatRoomService;
  }
  async getPendingFriendRequests({ userId }) {
    if (!userId) {
      throw new AppError({
        originalErrorMessage: "InvalidInput",
        errorDescription: "Invalid userId supplied",
        statusCode: 400,
        clientResponse: {
          errors: [
            {
              field: "customError",
              msg: "Invalid user id",
            },
          ],
        },
      });
    }
    const pendingFriendEntries =
      await friendRepository.getFriendRequests(userId);

    return await getFriendRequestUserInfoList(pendingFriendEntries, userId, {
      type: "recipient",
    });
  }

  async addUser({ currentUserId, targetUsername }) {
    if (!currentUserId || !targetUsername) {
      throw new AppError({
        originalErrorMessage: "InvalidInput",
        errorDescription: "Invalid user id or target username supplied",
        statusCode: 400,
        clientResponse: {
          errors: [
            {
              field: "customError",
              msg: "Invalid user id or target username",
            },
          ],
        },
      });
    }

    const currentUser = await userRepository.getUserById(currentUserId);
    if (!currentUser) {
      throw new Error("Failed to get current user by id in addUser");
    }

    const targetUserId = (await userRepository.getUser(targetUsername))?._id;
    if (!targetUserId) {
      throw new Error("Failed to find target user id in addUser");
    }

    if (currentUser._id === targetUserId) {
      throw new AppError({
        originalErrorMessage: "SelfAdd",
        errorDescription: "Cannot add yourself as a friend",
        statusCode: 400,
        clientResponse: {
          errors: [
            {
              field: "customError",
              msg: "You cannot add yourself as a friend",
            },
          ],
        },
      });
    }

    const friendRequest = await friendRepository.getFriendEntry(
      currentUser._id,
      targetUserId
    );

    if (friendRequest) {
      throw new AppError({
        originalErrorMessage: "FriendRequestExists",
        errorDescription: "Friend request already exists",
        statusCode: 400,
        clientResponse: {
          errors: [
            {
              field: "customError",
              msg: "Friend request already exists",
            },
          ],
        },
      });
    }

    const friendRequestId = await friendRepository.insertFriendEntry(
      currentUser._id,
      targetUserId
    );

    if (!friendRequestId) {
      throw new Error("Failed to insert friend request entry");
    }

    // Notify recipient if online
    const userSocket = getMap().get(targetUserId);

    const friendEntry = await friendRepository.getFriendEntry(
      currentUser._id,
      targetUserId
    );
    const parsedEntry = await getFriendRequestUserInfoList(
      friendEntry,
      targetUserId
    );

    if (!parsedEntry) {
      throw new Error("Failed to parse friend request entry");
    }

    if (userSocket) {
      userSocket.emit("new-friend-request", parsedEntry);
      userSocket.emit(
        "pending-friend-requests",
        parsedEntry,
        process.env.EVENT_STATUS_PUSH
      );
    }
  }

  async acceptFriendRequest({ recipientToken, requestorUsername }) {
    if (!recipientToken || !requestorUsername) {
      throw new AppError({
        originalErrorMessage: "InvalidInput",
        errorDescription: "Invalid user id or target username supplied",
        statusCode: 400,
        clientResponse: {
          errors: [
            {
              field: "customError",
              msg: "Invalid user id or target username",
            },
          ],
        },
      });
    }

    const recipientId = (await userRepository.getUserById(recipientToken))?._id;
    if (!recipientId) {
      throw new Error(
        "Failed to get current user by id in acceptFriendRequest"
      );
    }

    const requestorId = (await userRepository.getUser(requestorUsername))?._id;
    if (!requestorId) {
      throw new Error("Failed to find target user id in acceptFriendRequest");
    }

    if (recipientId === requestorId) {
      throw new AppError({
        originalErrorMessage: "SelfAccept",
        errorDescription: "You cannot accept your own friend request",
        statusCode: 400,
        clientResponse: {
          errors: [
            {
              field: "customError",
              msg: "You cannot accept your own friend request",
            },
          ],
        },
      });
    }

    const friendRequest = await friendRepository.getFriendEntry(
      recipientId,
      requestorId
    );
    const friendRequestId = friendRequest?._id;
    const friendRequestStatus = friendRequest?.status;
    if (!friendRequest) {
      throw new Error("No friend request entry found");
    }
    if (friendRequestStatus !== "pending") {
      throw new Error("Friend request entry is not pending");
    }

    const result = await friendRepository.acceptFriendRequest(friendRequestId);
    if (!result || result.matchedCount === 0) {
      throw new Error("Updating friend request to accepted failed");
    }

    console.log("Friend request accepted successfully");
    // Check if checkroom exists

    const chatRoomExists = await this.chatRoomService.getDMChatroom({
      userId1: recipientId,
      userId2: requestorId,
    });

    // Should not exist before users became friends
    if (chatRoomExists) {
      throw new Error("Chatroom already exists between two users");
    }

    const newChatRoomId = await this.chatRoomService.insertDMChatroom({
      userId1: recipientId,
      userId2: requestorId,
    });
    console.log("New chatroom created with id: ", newChatRoomId);

    // Notify recipieint if online the new list of pending friend requests
    await notifyUser({
      userId: recipientId,
      eventName: "pending-friend-requests",
      eventStatus: process.env.EVENT_STATUS_INITIALIZE,
      callback: async () =>
        this.getPendingFriendRequests({ userId: recipientId }),
    });

    // Notify both users to update their friends list
    await this.notifyFriendsList({ userId: recipientId });
    await this.notifyFriendsList({ userId: requestorId });
  }

  // Gets the friend list for userId, appends chatroom data, and
  // notifies the socket for userId to update their friends list
  async notifyFriendsList({ userId }) {
    await notifyUser({
      userId,
      eventName: "friends-list",
      eventStatus: process.env.EVENT_STATUS_INITIALIZE,
      callback: async () => {
        const rawFriendsList = await friendRepository.getFriendsList(userId);
        console.log("Raw friends list:", rawFriendsList);
        const updatedFriendsList = await getFriendRequestUserInfoList(
          rawFriendsList,
          userId
        );

        // For each friend, get the DM chatroom and append chatroomId
        return Promise.all(
          updatedFriendsList.map(async (friend, index) => {
            const friendId =
              rawFriendsList[index]?.users[0] === userId
                ? rawFriendsList[index]?.users[1]
                : rawFriendsList[index]?.users[0];
            const chatroom = await this.chatRoomService.getDMChatroom({
              userId1: userId,
              userId2: friendId,
            });
            const chatroomId = chatroom ? chatroom._id : null;
            return {
              ...friend,
              chatroomId,
            };
          })
        );
      },
    });
  }
}

const friendService = new FriendService(chatRoomService);
export default friendService;
