import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import { hashPassword } from "../utils/auth.js";
import { userRepository } from "../database/UserDb.js";
import { refreshTokenRepository } from "../database/RefreshTokenDb.js";
import { AuthService } from "./authService.js";
import { AppError } from "../utils/AppError.js";
import friendRepository from "../database/FriendDb.js";
import { ObjectId } from "mongodb";
import { getIO, getMap } from "../socket.js";
import { get } from "http";

class UserService {
  // Registers user if no duplicate user is found
  async registerUser({ username, email, password }) {
    try {
      if (!username || !email || !password) {
        throw new Error(
          "Invalid username, email, or password supplied when registering users"
        );
      }
      // Check if user already exists
      const user = await userRepository.getUser(username, email);
      if (user) {
        throw new Error("UserAlreadyExists");
      }

      // Hash password
      const hashedPassword = await hashPassword(password);
      if (!hashedPassword) {
        throw new Error("Invalid password hash");
      }

      // Default profile picture
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const imageData = fs.readFileSync(`${__dirname}/../assets/sunrise2.jpg`);

      // Insert user and get ID
      const accountEntry = {
        account: {
          username,
          email,
          hashedPassword,
        },
        profile: {
          avatarImage: imageData,
        },
      };
      const result = await userRepository.insertUser(accountEntry);
      if (!result) {
        throw new Error(
          "Failed to retrieve truthy return value after inserting user"
        );
      }
      const userId = result.insertedId;
      // JWT Payload
      const jwt = AuthService.createJwtToken(userId);
      const refreshToken = AuthService.createRefreshToken();

      // Insert refresh token to database
      await refreshTokenRepository.insertRefreshToken(userId, refreshToken);
      return {
        jwt,
        refreshToken,
        jwtExpiresAt: AuthService.getJwtTokenDuration(),
        refreshTokenExpiresAt: AuthService.getRefreshTokenDuration(),
      };
    } catch (error) {
      const message = error.message;
      switch (message) {
        case "UserAlreadyExists":
          throw new AppError({
            originalErrorMessage: message,
            originalErrorStackTrace: error.stack,
            errorDescription: "User registration failed",
            statusCode: 400,
            clientResponse: {
              errors: [
                {
                  field: "customError",
                  msg: "Username or email already exists",
                },
              ],
            },
          });
        default:
          throw new Error(message);
      }
    }
  }

  // Logs in the user and assigns the user jwt and refresh tokens
  async signInUser({ username, plaintextPassword }) {
    try {
      if (!username || !plaintextPassword) {
        throw new Error("Invalid username or password supplied during signup");
      }
      // Fetch user
      const user = await userRepository.getUser(username, null);
      if (!user) {
        throw new Error("Login for user failed (user not found in database)");
      }
      const userId = user._id;

      // Compare passwords
      const passwordHash = user.account.hashedPassword;
      if (!passwordHash) {
        throw new Error(
          "Login for user failed (password hash is a falsy value)"
        );
      }
      const isPasswordHashMatch = await bcrypt.compare(
        plaintextPassword,
        passwordHash
      );
      if (!isPasswordHashMatch) {
        console.log(plaintextPassword, passwordHash);
        throw new Error("Login for user failed (incorrect password supplied)");
      }

      // Update user's refresh token
      const newRefreshToken = AuthService.createRefreshToken();
      const result = await refreshTokenRepository.updateRefreshToken(
        userId,
        newRefreshToken
      );
      if (!result || result.matchedCount == 0) {
        throw new Error("Updating refresh token failed");
      }

      // Create new JWT token
      const newJwtToken = AuthService.createJwtToken(userId);
      return {
        jwt: newJwtToken,
        refreshToken: newRefreshToken,
        jwtExpiresAt: AuthService.getJwtTokenDuration(),
        refreshTokenExpiresAt: AuthService.getRefreshTokenDuration(),
      };
    } catch (error) {
      throw error;
    }
  }

  async getUserAvatar({ username }) {
    if (!username) {
      throw new Error("Invalid userId supplied");
    }
    const avatarImage = (await userRepository.getUser(username))?.profile
      ?.avatarImage;
    if (!avatarImage) {
      throw new Error("Failed to retrieve user avatar");
    }
    return avatarImage;
  }

  async searchUser({ currentUserId, targetUsername }) {
    try {
      if (!targetUsername || !currentUserId) {
        throw new Error("InvalidUserLookup");
      }
      // Get current user
      const currentUser = await userRepository.getUserById(
        new ObjectId(currentUserId)
      );
      if (!currentUser) {
        throw new Error("No user matched lookup criteria (current user)");
      }

      // Get target user
      const user = await userRepository.getUser(targetUsername, null);
      if (!user) {
        throw new Error("No user matched lookup criteria (target user)");
      }

      // Current user cannot be the target user
      if (currentUser._id.toHexString() === user._id.toHexString()) {
        throw new Error(
          "Cannot search user where target is the same as current user"
        );
      }

      const username = user?.account?.username;
      const avatarImage = user?.profile?.avatarImage;
      if (!username || !avatarImage) {
        throw new Error("Invalid user field fetched from database");
      }

      // Check if user is friends with target user
      var friendship = await friendRepository.getFriendEntry({
        userId: currentUser._id,
        targetUserId: user._id,
      });

      var friendshipData = friendship
        ? {
            status: friendship.status || null,
            role: currentUser._id.equals(friendship.recipientId)
              ? "recipient"
              : "requestor",
          }
        : null;
      console.log("friendship exists: ", friendship !== null);
      return {
        username,
        avatarImage,
        friendshipData,
      };
    } catch (error) {
      const message = error.message;
      switch (message) {
        case "InvalidUserLookup":
          throw new AppError({
            originalErrorMessage: message,
            originalErrorStackTrace: error.stack,
            errorDescription: "username is invalid",
            statusCode: 400,
            clientResponse: {
              errors: [
                {
                  field: "searchError",
                  message: "Please try a different username",
                },
              ],
            },
          });
        default:
          throw error;
      }
    }
  }

  // The id is a hex string fetched from the decoded jwt token
  async addUser({ currentUserId, targetUsername }) {
    try {
      if (!currentUserId || !targetUsername) {
        throw new Error("Invalid user id or target username supplied");
      }

      // Check if current username exists
      const currentUser = await userRepository.getUserById(
        new ObjectId(currentUserId)
      );
      if (!currentUser) {
        throw new Error("Failed to get current user by id in addUser");
      }

      // Get target user id if exist
      const targetUserId = (await userRepository.getUser(targetUsername))?._id;
      if (!targetUserId) {
        throw new Error("Failed to find target user id in addUser");
      }

      // Current user cannot be the target user
      if (currentUser._id.toHexString() === targetUserId.toHexString()) {
        throw new Error(
          "Cannot search user where target is the same as current user"
        );
      }

      // Check if friend request entry exists, if not create it
      const friendRequest = await friendRepository.getFriendEntry({
        userId: currentUser._id,
        targetUserId,
      });
      if (!friendRequest) {
        // Insert a new entry
        await friendRepository.insertFriendEntry({
          userId: currentUser._id,
          targetUserId,
        });
      } else {
        throw new Error("Friend request already exists");
      }

      // Notify the recipient, if the user is currently online (has a socket session)
      const map = getMap();

      // User is online
      const userSocket = map.get(targetUserId.toHexString());
      console.log(userSocket);
      if (userSocket) {
        userSocket.emit(
          "new-friend-request",
          "You have received a new friend request!",
          (clientResponse) => {
            console.log(clientResponse);
          }
        );
      }
    } catch (error) {
      throw error;
    }
  }

  // Gets all incoming pending friend requests and returns the result
  async getPendingFriendRequests({ currentUserId }) {
    if (!currentUserId) {
      throw new Error("Invalid userId supplied");
    }
    var pendingFriendEntries = await (
      await friendRepository.getFriendRequests({
        currentUserId: new ObjectId(currentUserId),
      })
    )?.toArray(); // Returns a Cursor instance

    // Populate user info on each friend request entry
    const populatedResults = await Promise.all(
      pendingFriendEntries.map(async (req) => {
        const user = await userRepository.getUserById(req?.requestorId);
        return {
          username: user?.account?.username,
          avatar: user?.profile?.avatarImage,
        };
      })
    );
    return populatedResults;
  }

  async acceptFriendRequest({ currentUserId, targetUsername }) {
    try {
      if (!currentUserId || !targetUsername) {
        throw new Error("Invalid user id or target username supplied");
      }

      // Check if current username exists
      const currentUser = await userRepository.getUserById(
        new ObjectId(currentUserId)
      );
      if (!currentUser) {
        throw new Error(
          "Failed to get current user by id in acceptFriendRequest"
        );
      }

      // Get target user id if exist
      const targetUserId = (await userRepository.getUser(targetUsername))?._id;
      if (!targetUserId) {
        throw new Error("Failed to find target user id in acceptFriendRequest");
      }

      // Current user cannot be the target user
      if (currentUser._id.toHexString() === targetUserId.toHexString()) {
        throw new Error(
          "Cannot search user where target is the same as current user"
        );
      }

      // Check if friend request entry exists
      const friendRequest = await friendRepository.getFriendEntry({
        userId: currentUser._id,
        targetUserId,
      });
      if (!friendRequest) {
        throw new Error("No friend request found");
      } else {
        if (friendRequest.status !== "pending") {
          throw new Error("Friend request is not pending");
        }
        // Update the friend request entry to accepted using FriendDb encapsulation
        const result = await friendRepository.acceptFriendRequest(
          friendRequest._id
        );
        if (!result || result.matchedCount == 0) {
          throw new Error("Updating friend request to accepted failed");
        }
      }

      // Notify the requestor, if the user is currently online (has a socket session)
      const map = getMap();
      // Recipient may be online, update pending requests list
      const userSocket = map.get(currentUser._id.toHexString());
      if (userSocket) {
        const updatedPendingRequests = await this.getPendingFriendRequests({
          currentUserId: targetUserId.toHexString(),
        });
        console.log("new pending requests");
        console.log(updatedPendingRequests);
        userSocket.emit("pending-friend-requests", updatedPendingRequests);
      }
    } catch (error) {
      throw error;
    }
  }
}

const userService = new UserService();
export default userService;
