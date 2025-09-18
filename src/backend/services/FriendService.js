import { ObjectId } from "mongodb";
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
    const pendingFriendEntries = await friendRepository.getFriendRequests({
      currentUserId: new ObjectId(userId),
    });

    return await getFriendRequestUserInfoList(
      pendingFriendEntries,
      new ObjectId(userId),
      { type: "recipient" }
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

    const currentUser = await userRepository.getUserById(
      new ObjectId(currentUserId)
    );
    if (!currentUser) {
      throw new Error("Failed to get current user by id in addUser");
    }

    const targetUserId = (await userRepository.getUser(targetUsername))?._id;
    if (!targetUserId) {
      throw new Error("Failed to find target user id in addUser");
    }

    if (currentUser._id.toHexString() === targetUserId.toHexString()) {
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

    const friendRequest = await friendRepository.getFriendEntry({
      userOne: currentUser._id,
      userTwo: targetUserId,
    });

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

    const friendRequestId = await friendRepository.insertFriendEntry({
      userId: currentUser._id,
      targetUserId,
    });

    if (!friendRequestId) {
      throw new Error("Failed to insert friend request entry");
    }

    // Notify recipient if online
    const userSocket = getMap().get(targetUserId.toHexString());

    const friendEntry = await friendRepository.getFriendEntry({
      userOne: currentUser._id,
      userTwo: targetUserId,
    });
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

    const recipientId = (
      await userRepository.getUserById(new ObjectId(recipientToken))
    )?._id;
    if (!recipientId) {
      throw new Error(
        "Failed to get current user by id in acceptFriendRequest"
      );
    }

    const requestorId = (await userRepository.getUser(requestorUsername))?._id;
    if (!requestorId) {
      throw new Error("Failed to find target user id in acceptFriendRequest");
    }

    if (recipientId.equals(requestorId)) {
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

    const { friendRequest, friendRequestId, friendRequestStatus } =
      await friendRepository.getFriendEntry({
        userOne: recipientId,
        userTwo: requestorId,
      });

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

    // Check if checkroom exists
    const chatRoomExists = await this.chatRoomService.getDMChatroom({
        userId1: recipientId.toHexString(),
        userId2: requestorId.toHexString()
    })

    // Should not exist before users became friends
    if (chatRoomExists) {
        throw new Error("Chatroom already exists between two users")
    }
    const newChatRoomId = await this.chatRoomService.insertDMChatroom({
        userId1: recipientId.toHexstring(),
        userId2: requestorId.toHexString()
    })
    console.log("New chatroom created with id: " = newChatRoomId)

    // Notify recipieint if online the new list of pending friend requests
    await notifyUser({
      userId: recipientId,
      eventName: "pending-friend-requests",
      eventStatus: process.env.EVENT_STATUS_PUSH,
      callback: async () =>
        this.getPendingFriendRequests({ userId: recipientId.toHexString() }),
    });

    // Notify both users to update their friends list
    await this._notifyFriendsList(recipientId);
    await this._notifyFriendsList(requestorId);
  }

  async _notifyFriendsList(userId) {
    await notifyUser({
      userId,
      eventName: "friends-list",
      eventStatus: process.env.EVENT_STATUS_PUSH,
      callback: async () => {
        let updatedFriendsList = await (
          await friendRepository.getFriendsList({ currentUserId: userId })
        ).toArray();
        updatedFriendsList = await getFriendRequestUserInfoList(
          updatedFriendsList,
          userId
        );
        return updatedFriendsList;
      },
    });
  }
}

const friendService = new FriendService(chatRoomService);
export default friendService;
