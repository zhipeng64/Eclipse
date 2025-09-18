import { getEntry, insertEntry, getAllEntry, updateEntry } from "./crud.js";
import { sortByObjectIds } from "./util.js";

/*
    Before any read or write operations, query or entry fields must 
    be sorted by their _id for cleaner, more predictable query.
*/
class FriendRepository {
  constructor() {
    this.collection = process.env.DB_FRIEND_COLLECTION;
  }

  async getFriendEntry({ userOne, userTwo }) {
    if (!userOne || !userTwo) {
      throw new Error(
        "Invalid userId or targetUserId supplied when querying friend entry"
      );
    }

    // Checks if a friendship already exists between two users by checking users array
    const query = {
      users: { $all: [userOne, userTwo] },
    };
    const friendEntry = await getEntry(query, this.collection);
    console.log("friend entry from db:");
    console.log(friendEntry);
    return friendEntry;
  }

  // User
  async insertFriendEntry({ userId, targetUserId }) {
    if (!userId || !targetUserId) {
      throw new Error(
        "Invalid userId or targetUserId supplied when inserting friend entry"
      );
    }

    const entry = {
      requestorId: userId,
      recipientId: targetUserId,
      users: [userId, targetUserId],
      status: "pending",
      createdAt: new Date(Date.now()),
    };
    const id = await insertEntry(entry, this.collection);
    return id;
  }

  async getFriendRequests({ currentUserId }) {
    if (!currentUserId) {
      throw new Error(
        "Invalid parameters supplied when getting friend entries"
      );
    }

    const query = {
      recipientId: currentUserId,
      status: "pending",
    };
    const friendRequests = await getAllEntry(query, this.collection);
    return friendRequests;
  }

  async acceptFriendRequest(friendRequestId) {
    if (!friendRequestId) {
      throw new Error(
        "Invalid friendRequestId supplied to acceptFriendRequest"
      );
    }
    const query = { _id: friendRequestId };
    const update = { $set: { status: "accepted" } };
    const result = await updateEntry(query, update, null, this.collection);
    return result;
  }

  // Gets all friends for current user (accepted friendships only)
  async getFriendsList({ currentUserId }) {
    if (!currentUserId) {
      throw new Error("Invalid parameters supplied when getting friends list");
    }

    // Find all friendships current user has and display the friend's user info
    const query = {
      users: currentUserId,
      status: "accepted",
    };
    var friendsList = await getAllEntry(query, this.collection);
    return friendsList;
  }
}

const friendRepository = new FriendRepository();
export default friendRepository;
