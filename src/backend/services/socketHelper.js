// Flexible function to notify a user via their socket connection
import { getMap } from "../socket.js";
const notifyUser = async ({
  userId,
  eventName,
  eventStatus,
  callback = null,
  params = [], // This lets the callback to have any parameters defined by caller
}) => {
  const map = getMap();
  // userId is expected to be a hex string at service/socket layers
  const userSocket = map.get(userId);
  if (userSocket) {
    // result must be an array of objects for socket emission
    const result = callback ? await callback(...params) : null;
    const formattedPayload = formatSocketPayload({ data: result });
    userSocket.emit(eventName, formattedPayload, eventStatus);
  }
};

// Socket always return an array of objects
function formatSocketPayload({ data = [] }) {
  return Array.isArray(data) ? data : [data];
}

export { notifyUser, formatSocketPayload };
