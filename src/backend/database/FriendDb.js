import { getEntry, insertEntry } from "./crud.js";
import { sortByObjectIds } from "./util.js";

/*
    Before any read or write operations, query or entry fields must 
    be sorted by their _id for cleaner, more predictable query.
*/
class FriendRepository {
  constructor() {
    this.collection = process.env.DB_FRIEND_COLLECTION;
  }

  async getFriendEntry({ userId, targetUserId }) {
    console.log("printing ids");
    console.log(userId, targetUserId);
    if (!userId || !targetUserId) {
      throw new Error(
        "Invalid userId or targetUserId supplied when querying friend entry"
      );
    }
    const [user1, user2] = sortByObjectIds(userId, targetUserId);
    // Sorting gives us fast friendship lookups
    const query = {
      user1,
      user2,
    };
    const friendEntry = await getEntry(query, this.collection);
    return friendEntry;
  }

  // User
  async insertFriendEntry({ userId, targetUserId }) {
    if (!userId || !targetUserId) {
      throw new Error(
        "Invalid userId or targetUserId supplied when inserting friend entry"
      );
    }

    const [user1, user2] = sortByObjectIds(userId, targetUserId);
    const entry = {
      user1,
      user2,
      requestorId: userId,
      recipientId: targetUserId,
      status: "pending",
      createdAt: new Date(Date.now()),
    };
    await insertEntry(entry, this.collection);
  }
}

const friendRepository = new FriendRepository();
export default friendRepository;
