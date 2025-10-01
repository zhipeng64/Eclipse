import {
  getEntry,
  insertEntry,
  updateEntry,
  getAggregation,
  findAndUpdateEntry,
} from "./crud.js";
import { ObjectId } from "mongodb";
import { convertObjectIds } from "./util.js";

class FriendRepository {
  constructor() {
    this.collection = process.env.DB_FRIEND_COLLECTION;
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
    return convertObjectIds(result.insertedId, ObjectId);
  }

  /*
    Get friend requests with matching filter using aggregation.
    This uses encapsulation to control access to the aggregation logic from callers
    and also bundles the logic, doing any necessary conversions (e.g. ObjectId) to 
    maintain separation of concerns.
  */
  async getFriendEntriesByMatch(matchFilter) {
    if (!matchFilter) {
      throw new Error("No match filter supplied to getFriendEntriesByMatch");
    }

    // Perform conversions for any ObjectId fields in matchFilter
    if (matchFilter._id) {
      matchFilter._id = new ObjectId(matchFilter._id);
    }
    if (matchFilter.users) {
      matchFilter.users = matchFilter.users.map((id) => new ObjectId(id));
    }
    // Build users match condition
    let usersMatch = {};
    if (matchFilter.users) {
      if (matchFilter.users.length === 1) {
        usersMatch = { users: matchFilter.users[0] };
      } else if (matchFilter.users.length > 1) {
        usersMatch = { users: { $all: matchFilter.users } };
      }
      delete matchFilter.users;
    }
    console.log(matchFilter.users);

    const aggregationQuery = [
      { $match: { ...matchFilter, ...usersMatch } },
      {
        $lookup: {
          from: "users",
          localField: "users",
          foreignField: "_id",
          as: "userDetails",
        },
      },
    ];
    console.log("AGGREGATION QUERY:", aggregationQuery);
    console.log("USERS: ", usersMatch);
    const cursor = await getAggregation(aggregationQuery, this.collection);
    const results = [];
    console.log("AGGREGATION RESULTS:", results);
    for await (const doc of cursor) {
      results.push(doc);
    }
    return results.length > 0 ? convertObjectIds(results, ObjectId) : [];
  }

  async getFriendEntry(matchFilter) {
    if (!matchFilter) {
      throw new Error("No match filter supplied to getFriendEntry");
    }
    const results = await this.getFriendEntriesByMatch(matchFilter);
    return results.length === 1 ? results[0] : null;
  }

  // Updates friend request entry with fieldsToUpdate based on friendRequestId
  // Returns true if update was successful
  async updateFriendRequest(friendRequestId, fieldsToUpdate, options = null) {
    if (!fieldsToUpdate) {
      throw new Error("No fields supplied to updateFriendRequest");
    }

    // Convert ids to ObjectId
    if (fieldsToUpdate.chatroomId) {
      fieldsToUpdate.chatroomId = new ObjectId(fieldsToUpdate.chatroomId);
    }

    const query = { _id: new ObjectId(friendRequestId) };
    const update = {
      $set: { ...fieldsToUpdate },
    };
    const result = await updateEntry(query, update, options, this.collection);
    if (!result || result.matchedCount === 0) {
      throw new Error("Updating friend request to accepted failed");
    }
    return true;
  }

  // Uses findOneAndUpdate to update a friend request entry based on a filter
  async findAndUpdateFriendRequest(
    friendRequestId,
    fieldsToUpdate,
    options = null
  ) {
    if (!friendRequestId || !fieldsToUpdate) {
      throw new Error(
        "No friendRequestId or fieldsToUpdate supplied to findAndUpdateFriendRequest"
      );
    }

    // Convert ids to ObjectId
    if (fieldsToUpdate.chatroomId) {
      fieldsToUpdate.chatroomId = new ObjectId(fieldsToUpdate.chatroomId);
    }
    const query = { _id: new ObjectId(friendRequestId) };
    const update = {
      $set: { ...fieldsToUpdate },
    };
    const result = await findAndUpdateEntry(
      query,
      update,
      options,
      this.collection
    );
    return result ? convertObjectIds(result, ObjectId) : null; // Return result directly since it's the document in older driver versions
  }
}

const friendRepository = new FriendRepository();
export default friendRepository;
