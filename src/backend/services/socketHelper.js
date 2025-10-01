// Flexible function to notify a user via their socket connection
import { getMap } from "../socket.js";

// Notifies a single user if they have an active socket connection
const notifyUser = async (userId, eventName, data, eventStatus) => {
  const map = getMap();
  const userSocket = map.get(userId);
  if (userSocket && data) {
    // Check if data is a plain object (new Object or {})
    if (Object.getPrototypeOf(data) !== Object.prototype) {
      throw new Error("Response to frontend must be a plain object");
    }

    // Socketio automatically handles serialization
    userSocket.emit(eventName, data, eventStatus);
  }
};

// Notifies all users in a room
const notifyRoom = async (io, roomId, eventName, data, eventStatus) => {
  if (!io || !roomId) {
    throw new Error("Invalid roomId supplied to notifyRoom");
  }
  io.to(roomId).emit(eventName, data, eventStatus);
};
export { notifyUser, notifyRoom };
