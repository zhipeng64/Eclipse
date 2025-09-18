// Flexible function to notify a user via their socket connection
import { getMap } from "../socket.js";
const notifyUser = async ({
  socketId,
  eventName,
  eventStatus,
  callback = null,
  params = [], // This lets the callback to have any parameters defined by caller
}) => {
  const map = getMap();
  const userSocket = map.get(socketId.toHexString());
  if (userSocket) {
    const result = callback ? await callback(...params) : null;
    userSocket.emit(eventName, result, eventStatus);
  }
};

export { notifyUser };
