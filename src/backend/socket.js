import { Server } from "socket.io";
import { getTokens } from "./utils/socket.js";
import userService from "./services/UserService.js";
import {
  normalizeFriendRequests,
  normalizeFriendsList,
} from "./services/friendHelper.js";
import friendRepository from "./database/FriendDb.js";
import { ObjectId } from "mongodb";
// Global variable that references the socketio server
var io;

// Stateful tracking of connected sockets, keyed by _id, value is the client socket object
var socketMap = new Map();

// Initializes the socketio server and centralizes all listeners
function initializeSocket(httpsServer) {
  const corsConfiguration = {
    origin: process.env.CORS_ALLOW_LIST.split(","),
    methods: ["GET", "POST"],
    credentials: true,
  };

  // Socket IO Server
  const io = new Server(httpsServer, {
    cors: corsConfiguration, // Need separate CORS configuration for SocketIO, not shared with ExpressJS
  });

  // Accept incoming socket connections
  // Since a function, async or not, has its own local callstack when invoked,
  // any local variables and function arguments will have their own values, so
  // we can have many users connecting concurrently without race conditions.
  io.on("connection", async (socket) => {
    socket.on("disconnect", () => {
      console.log(`Client socket with socketId "${socket.id}" disconnected`);
    });

    socket.on("pending-friend-requests", async () => {
      // Get jwt token id
      const cookieString = socket.handshake.headers.cookie;
      const decodedJwtToken = await getTokens(cookieString);
      const friendRequestList = await userService.getPendingFriendRequests({
        currentUserId: decodedJwtToken.id,
      });
      socket.emit("pending-friend-requests", friendRequestList);
    });

    socket.on("friends-list", async () => {
      // Get jwt token id
      const cookieString = socket.handshake.headers.cookie;
      const decodedJwtToken = await getTokens(cookieString);
      var friendsList = await (
        await friendRepository.getFriendsList({
          currentUserId: new ObjectId(decodedJwtToken.id),
        })
      ).toArray();
      friendsList = await normalizeFriendsList(
        friendsList,
        new ObjectId(decodedJwtToken.id)
      );
      socket.emit("friends-list", friendsList);
    });

    console.log(`Client socket with socketId: "${socket.id}" connected`);
    try {
      // A connecting client socket must pass authentication checks
      const cookieString = socket.handshake.headers.cookie;
      const decodedJwtToken = await getTokens(cookieString); // <-- add await

      // Statefully track socket in Map
      socketMap.set(decodedJwtToken.id, socket);
    } catch (error) {
      console.warn("Socket auth failed", {
        socketId: socket.id,
        ip: socket.handshake.address,
        error: error.message,
      });
      // On error, disconnect the socket
      socket.disconnect();
    }
  });
}

// Returns the socketio server if present, otherwise throw an error
function getIO() {
  if (!io) {
    throw new Error("Socket.IO not initialized!");
  }
  return io;
}

// Returns all tracked sockets
function getMap() {
  if (!getMap) {
    throw new Error("Socket map not initializde");
  }
  return socketMap;
}

export { initializeSocket, getIO, getMap };
