import userRepository from "../database/UserDb.js";

// Helper functions to normalized friend request data
// by converting requestorId to username and avatar image
async function normalizeFriendRequests(friendRequests) {
  return Promise.all(
    friendRequests.map(async (req) => {
      const user = await userRepository.getUserById(req?.requestorId);
      return {
        username: user?.account?.username,
        avatar: user?.profile?.avatarImage,
      };
    })
  );
}

// Helper function to normalize friends list data
async function normalizeFriendsList(friendsList, currentUserId) {
  return Promise.all(
    friendsList
      // Filter out entries where the only user is the current user (shouldn't happen, but safe)
      .filter((friendEntry) =>
        friendEntry.users.some(
          (userId) => userId.toString() !== currentUserId.toString()
        )
      )
      .map(async (friendEntry) => {
        // Find the friend (not the current user)
        const friendUserId = friendEntry.users.find(
          (userId) => userId.toString() !== currentUserId.toString()
        );
        const user = await userRepository.getUserById(friendUserId);
        return {
          username: user?.account?.username,
          avatar: user?.profile?.avatarImage,
        };
      })
  );
}

export { normalizeFriendRequests, normalizeFriendsList };
