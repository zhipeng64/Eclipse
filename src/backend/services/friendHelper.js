import userRepository from "../database/UserDb.js";
// Helper function to parse and get user info for each friend request
// By default, if no options are given, the function parses each entry
// and returns an array of objects representing only friends of the current user
async function getFriendRequestUserInfoList(
  friendRequests,
  currentUserId,
  options = null
) {
  if (!friendRequests || !currentUserId) {
    throw new Error("Invalid parameters given to getFriendRequestUserInfoList");
  }

  // Normalize to array: cursor -> array, array -> array, object -> [object]
  var friendRequestsList = [];
  if (typeof friendRequests?.toArray === "function") {
    friendRequestsList = await friendRequests.toArray();
  } else if (Array.isArray(friendRequests)) {
    friendRequestsList = friendRequests;
  } else if (typeof friendRequests === "object") {
    friendRequestsList = [friendRequests];
  }

  console.log("Friend Requests IDs (raw):", friendRequestsList);
  if (!options) {
    friendRequestsList = friendRequestsList.map((friendRequestEntry) => {
      let friendId = friendRequestEntry?.users[0].equals(currentUserId)
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

  //   console.log("Friend Request IDs:", friendRequestsList);
  // Fetch user info for each id present in friendRequestsList
  return Promise.all(
    friendRequestsList.map(async (userId) => {
      const user = await userRepository.getUserById(userId);
      return {
        username: user?.account?.username,
        avatar: user?.profile?.avatarImage,
      };
    })
  );
}

export { getFriendRequestUserInfoList };
