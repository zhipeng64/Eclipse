import { Server } from "socket.io";
import { getTokens } from "./utils/socket.js";
import registerListeners from "./services/socketHandlers/socketListeners.js";

// Socket.IO instance and socket map
let io;
const socketMap = new Map();

// Initializes the socket server
function initializeSocket(httpsServer) {
  const corsConfiguration = {
    origin: process.env.CORS_ALLOW_LIST.split(","),
    methods: ["GET", "POST"],
    credentials: true,
  };

  io = new Server(httpsServer, {
    cors: corsConfiguration,
  });

  /*
    Accept incoming socket connections.
    Since a function, async or not, has its own local callstack when invoked, 
    any local variables and function arguments will have their own values, so 
    we can have many users connecting concurrently without race conditions.
  */
  io.on("connection", async (socket) => {
    console.log(`Client socket with socketId "${socket.id}" connected`);
    try {
      // Authenticate and extract user ID from cookies
      const cookieString = socket.handshake.headers.cookie;
      const decodedJwtToken = await getTokens(cookieString);
      const userId = decodedJwtToken.id;

      // Track the connected socket
      socketMap.set(userId, socket);

      // Register all socket event listeners for this user
      registerListeners({ io, socket, userId });
    } catch (error) {
      console.warn("Socket auth failed", {
        socketId: socket.id,
        ip: socket.handshake.address,
        error: error.message,
      });

      // Disconnect unauthorized socket
      socket.disconnect();
    }
  });
}

// Returns the initialized socket.io instance
function getIO() {
  if (!io) {
    throw new Error("Socket.IO not initialized!");
  }
  return io;
}

// Returns the socket map for real-time operations
function getMap() {
  return socketMap;
}

export { initializeSocket, getIO, getMap };
