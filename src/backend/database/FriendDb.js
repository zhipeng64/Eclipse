import { getEntry, insertEntry, getAllEntry, updateEntry } from "./crud.js";
import { convertObjectIds } from "./util.js";
import { ObjectId } from "mongodb";

class FriendRepository {
  constructor() {
    this.collection = process.env.DB_FRIEND_COLLECTION;
  }

  async getFriendEntry(userOne, userTwo) {
    if (!userOne || !userTwo) {
      throw new Error(
        "Invalid userId or targetUserId supplied when querying friend entry"
      );
    }
    // Convert to ObjectId for querying
    const query = {
      users: { $all: [new ObjectId(userOne), new ObjectId(userTwo)] },
    };
    const friendEntry = await getEntry(query, this.collection);
    return friendEntry;
  }

  // User
  async insertFriendEntry(userId, targetUserId) {
    if (!userId || !targetUserId) {
      throw new Error(
        "Invalid userId or targetUserId supplied when inserting friend entry"
      );
    }

    const entry = {
      requestorId: new ObjectId(userId),
      recipientId: new ObjectId(targetUserId),
      users: [new ObjectId(userId), new ObjectId(targetUserId)],
      status: "pending",
      createdAt: new Date(Date.now()),
    };
    const result = await insertEntry(entry, this.collection);
    return result.insertedId;
  }

  async getFriendRequests(currentUserId) {
    if (!currentUserId) {
      throw new Error(
        "Invalid parameters supplied when getting friend entries"
      );
    }

    const query = {
      recipientId: new ObjectId(currentUserId),
      status: "pending",
    };
    const cursor = await getAllEntry(query, this.collection);
    return cursor;
  }

  async acceptFriendRequest(friendRequestId) {
    if (!friendRequestId) {
      throw new Error(
        "Invalid friendRequestId supplied to acceptFriendRequest"
      );
    }
    const query = { _id: new ObjectId(friendRequestId) };
    const update = { $set: { status: "accepted" } };
    const result = await updateEntry(query, update, null, this.collection);
    return result;
  }

  // Gets all friends for current user (accepted friendships only)
  async getFriendsList(currentUserId) {
    if (!currentUserId) {
      throw new Error("Invalid parameters supplied when getting friends list");
    }

    // Find all friendships current user has and display the friend's user info
    const query = {
      users: new ObjectId(currentUserId),
      status: "accepted",
    };
    const cursor = await getAllEntry(query, this.collection);
    return cursor;
  }
}

const friendRepository = new FriendRepository();
export default friendRepository;
