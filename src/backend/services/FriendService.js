import friendRepository from "../database/FriendDb.js";
import userRepository from "../database/UserDb.js";
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

    return await this._getFriendRequestUserInfoList(
      pendingFriendEntries,
      userId,
      {
        type: "recipient",
        status: "pending",
      }
    );
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
    const parsedEntry = await this._getFriendRequestUserInfoList(
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

  // Helper function to parse and get user info for each friend request
  // By default, if no options are given, the function parses each entry
  // and returns an array of objects representing only friends of the current user
  async _getFriendRequestUserInfoList(
    friendRequests,
    currentUserId,
    options = null
  ) {
    if (!friendRequests || !currentUserId) {
      throw new Error(
        "Invalid parameters given to getFriendRequestUserInfoList"
      );
    }

    // Normalize to array: cursor -> array, array -> array, object -> [object]
    var friendRequestsList = [];
    // Array of documents
    if (Array.isArray(friendRequests)) {
      friendRequestsList = friendRequests;
    }
    // Single document
    else if (typeof friendRequests === "object") {
      friendRequestsList = [friendRequests];
    }

    if (!options) {
      friendRequestsList = friendRequestsList.map((friendRequestEntry) => {
        // users array contains hex string ids
        const friendId =
          friendRequestEntry?.users[0] === currentUserId
            ? friendRequestEntry?.users[1]
            : friendRequestEntry?.users[0];
        return friendId;
      });
    } else {
      switch (options.type) {
        case "recipient":
          friendRequestsList = friendRequestsList.map((friendRequestEntry) => {
            return friendRequestEntry.requestorId;
          });
          break;
        default:
          throw new Error(
            "Invalid option type given to getFriendRequestUserInfoList"
          );
      }
    }
    if (!friendRequestsList) {
      throw new Error("Failed to parse friend request user ids");
    }

    // Fetch user info for each id present in friendRequestsList
    return Promise.all(
      friendRequestsList.map(async (userId) => {
        const result = {};
        const user = await userRepository.getUserById(userId);
        if (user) {
          result.username = user?.account?.username || null;
          result.avatar = user?.profile?.avatarImage || null;
        }
        // Get chatroom only if option status is not "pending"
        const chatroom =
          options?.status !== "pending"
            ? await this.chatRoomService.getDMChatroom({
                userId1: currentUserId,
                userId2: userId,
              })
            : null;
        if (chatroom) {
          result.chatroomId = chatroom._id || null;
        }

        return result;
      })
    );
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

    // Notify recipient to perform a DELETE operation on the matching pending friend request
    await notifyUser({
      userId: recipientId,
      eventName: "pending-friend-requests",
      eventStatus: process.env.EVENT_STATUS_DELETE,
      callback: async () => {
        return await this._getFriendRequestUserInfoList(
          friendRequest,
          recipientId,
          { type: "recipient", status: "pending" }
        );
      },
    });

    // Notify both users to update their friends list
    await this.notifyFriendsList({
      userId: recipientId,
      eventStatus: process.env.EVENT_STATUS_PUSH,
      callback: async () => {
        return await this._getFriendRequestUserInfoList(
          friendRequest,
          recipientId
        );
      },
    });
    await this.notifyFriendsList({
      userId: requestorId,
      eventStatus: process.env.EVENT_STATUS_PUSH,
      callback: async () => {
        return await this._getFriendRequestUserInfoList(
          friendRequest,
          requestorId
        );
      },
    });
  }

  // Gets the friend list for userId, appends chatroom data, and
  // notifies the socket for userId to update their friends list
  async notifyFriendsList({ userId, eventStatus, callback = null }) {
    // Default callback for INITIALIZE event — builds full friends list with chatroomIds
    const defaultInitializeCallback = async () => {
      const rawFriendsList = await friendRepository.getFriendsList(userId);
      const updatedFriendsList = await this._getFriendRequestUserInfoList(
        rawFriendsList,
        userId
      );

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
          return { ...friend, chatroomId };
        })
      );
    };

    // Choose which payload to use: custom if provided, else default for INITIALIZE
    const payloadCallback =
      callback ||
      (eventStatus === process.env.EVENT_STATUS_INITIALIZE
        ? defaultInitializeCallback
        : null);

    if (!payloadCallback) {
      throw new Error(
        `No payload callback provided for event status: ${eventStatus}`
      );
    }

    await notifyUser({
      userId,
      eventName: "friends-list",
      eventStatus,
      callback: payloadCallback,
    });
  }
}

const friendService = new FriendService(chatRoomService);
export default friendService;
