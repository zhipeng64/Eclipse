import friendRepository from "../database/FriendDb.js";
import userRepository from "../database/UserDb.js";
import { notifyUser } from "./socketHelper.js";
import { AppError } from "../utils/AppError.js";
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
    // Get all pending requests
    const pendingFriendEntries = await friendRepository.getFriendEntriesByMatch(
      {
        users: [userId],
        status: "pending",
      }
    );
    if (!pendingFriendEntries) {
      return { incoming: [], outgoing: [] };
    }

    // Split into incoming and outgoing requests
    return this._buildPendingRequestFormat(
      await this._getFriendRequestUserInfoList(
        pendingFriendEntries,
        userId,
        "pending",
        "incoming"
      ),
      await this._getFriendRequestUserInfoList(
        pendingFriendEntries,
        userId,
        "pending",
        "outgoing"
      )
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

    const friendRequest = await friendRepository.getFriendEntry({
      users: [currentUser._id, targetUserId],
    });

    if (friendRequest) {
      throw new AppError({
        originalErrorMessage: "FriendRequestExists",
        originalErrorStackTrace: new Error().stack,
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

    // Creates a new friend request entry
    const friendRequestId = await friendRepository.insertFriendEntry(
      currentUser._id,
      targetUserId
    );

    if (!friendRequestId) {
      throw new Error("Failed to insert friend request entry");
    }

    // Get the newly created friend entry with user details
    const friendEntry = await friendRepository.getFriendEntry({
      users: [currentUser._id, targetUserId],
    });
    if (!friendEntry) {
      throw new Error("Failed to fetch newly created friend request entry");
    }

    // Get the current user's outgoing request
    const senderOutgoingRequest = this._buildPendingRequestFormat(
      [],
      [this._mapToPendingRequest(friendEntry, currentUserId, "outgoing")]
    );

    // Get the target user's incoming request
    const receiverIncomingRequest = this._buildPendingRequestFormat(
      [this._mapToPendingRequest(friendEntry, targetUserId, "incoming")],
      []
    );
    // Notify recipient if online
    await notifyUser(
      targetUserId,
      "new-friend-request",
      receiverIncomingRequest,
      process.env.EVENT_STATUS_PUSH
    );
    await notifyUser(
      targetUserId,
      "pending-friend-requests",
      receiverIncomingRequest,
      process.env.EVENT_STATUS_PUSH
    );

    // Notify the requestor to update their sent requests list
    await notifyUser(
      currentUserId,
      "pending-friend-requests",
      senderOutgoingRequest,
      process.env.EVENT_STATUS_PUSH
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

    // Check if user is authorized to make the request
    if (recipientToken !== recipientId) {
      throw new AppError({
        originalErrorMessage: "Unauthorized",
        errorDescription:
          "FriendService received mismatched userId and recipientToken",
        statusCode: 400,
      });
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

    const friendRequest = await friendRepository.getFriendEntry({
      users: [recipientId, requestorId],
    });
    const friendRequestId = friendRequest?._id;
    const friendRequestStatus = friendRequest?.status;
    if (!friendRequest) {
      throw new Error("No friend request entry found");
    }
    if (friendRequestStatus !== "pending") {
      throw new Error("Friend request entry is not pending");
    }

    // Check if chatroom exists
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
    const updateStatus = await friendRepository.updateFriendRequest(
      friendRequestId,
      {
        status: "accepted",
        chatroomId: newChatRoomId,
      }
    );
    if (!updateStatus) {
      throw new Error("Failed to update friend request entry status");
    }

    // Notify both users to update their pending requests list (DELETE the accepted request)
    const recipientUserToDelete = this._buildPendingRequestFormat(
      [this._mapToPendingRequest(friendRequest, recipientId, "incoming")],
      []
    );
    const requestorUserToDelete = this._buildPendingRequestFormat(
      [],
      [this._mapToPendingRequest(friendRequest, requestorId, "outgoing")]
    );
    await notifyUser(
      recipientId,
      "pending-friend-requests",
      recipientUserToDelete,
      process.env.EVENT_STATUS_DELETE
    );
    await notifyUser(
      requestorId,
      "pending-friend-requests",
      requestorUserToDelete,
      process.env.EVENT_STATUS_DELETE
    );

    const updatedDocument = await friendRepository.getFriendEntry({
      _id: friendRequestId,
    });
    // Notify both users to update their friends list (ADD the new friend)
    const recipientFriendToAdd = this._buildFriendsListUpdateFormat([
      this._mapToAcceptedFriend(updatedDocument, recipientId),
    ]);
    const requestorFriendToAdd = this._buildFriendsListUpdateFormat([
      this._mapToAcceptedFriend(updatedDocument, requestorId),
    ]);
    await notifyUser(
      recipientId,
      "friends-list",
      recipientFriendToAdd,
      process.env.EVENT_STATUS_PUSH
    );
    await notifyUser(
      requestorId,
      "friends-list",
      requestorFriendToAdd,
      process.env.EVENT_STATUS_PUSH
    );
  }

  // Gets the friend list for userId
  async getFriendsList({ userId }) {
    if (!userId) {
      throw new AppError("Invalid user id supplied");
    }
    const friends = await friendRepository.getFriendEntriesByMatch({
      users: [userId],
      status: "accepted",
    });

    const friendsToInitialize = this._buildFriendsListUpdateFormat(
      await this._getFriendRequestUserInfoList(friends, userId, "accepted")
    );
    return friendsToInitialize;
  }

  // Standardizes formatting of pending friend requests
  _buildPendingRequestFormat(incoming = [], outgoing = []) {
    return { incoming, outgoing };
  }

  // Standardizes formatting of accepted friends
  _buildFriendsListUpdateFormat(friends = []) {
    return { friends };
  }

  // Data transformation helpers
  // Gets the pending friend request data for userId from a single friendship entry
  _mapToPendingRequest(friendshipEntry, userId, direction) {
    const targetUserId =
      direction === "incoming"
        ? friendshipEntry.requestorId
        : friendshipEntry.recipientId;

    const targetUser = friendshipEntry.userDetails.find(
      (user) => user._id === targetUserId && user._id !== userId
    );

    if (!targetUser) return null;
    return {
      id: friendshipEntry._id,
      username: targetUser.account.username,
      avatar: targetUser.profile.avatarImage,
      avatarImageType: targetUser.profile.avatarImageType,
    };
  }

  // Gets the accepted friend data for userId from a single friendship entry
  _mapToAcceptedFriend(friendshipEntry, userId) {
    const friendUser = friendshipEntry.userDetails.find(
      (user) => user._id !== userId
    );

    if (!friendUser) return null;

    return {
      id: friendshipEntry._id,
      friendId: friendUser._id,
      username: friendUser.account.username,
      avatar: friendUser.profile.avatarImage,
      avatarImageType: friendUser.profile.avatarImageType,
      chatroomId: friendshipEntry.chatroomId,
    };
  }

  /*
   Orchestrator that handles an array of friend requests (as opposed to a single friend request object) 
   and returns user info based on type (pending/accepted) and subtype (incoming/outgoing for pending)
  */
  async _getFriendRequestUserInfoList(
    friendRequests,
    userId,
    type,
    subtype = null
  ) {
    if (!friendRequests || !userId || !type) {
      throw new Error(
        "Invalid parameters given to getFriendRequestUserInfoList"
      );
    }

    switch (type) {
      case "pending":
        return friendRequests
          .map((request) => this._mapToPendingRequest(request, userId, subtype))
          .filter((request) => request !== null);

      case "accepted":
        return friendRequests
          .map((request) => this._mapToAcceptedFriend(request, userId))
          .filter((request) => request !== null);

      default:
        throw new Error(`Unsupported friend request type: ${type}`);
    }
  }
}

const friendService = new FriendService(chatRoomService);
export default friendService;
