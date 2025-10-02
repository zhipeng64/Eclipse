// Reusable socket helper functions
const joinRoom = (socket, endpoint, roomId) => {
  if (!socket || !endpoint || !roomId) {
    return;
  }
  socket.emit(endpoint, { roomId });
};

export { joinRoom };
