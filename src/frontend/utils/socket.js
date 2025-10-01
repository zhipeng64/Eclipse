// Reusable socket helper functions
const joinRoom = (socket, endpoint, roomId) => {
  if (!socket || !endpoint || !roomId) {
    console.warn("Invalid parameters to joinRoom");
    console.log({ socket, endpoint, roomId });
    return;
  }
  socket.emit(endpoint, { roomId });
  console.log(`Socket ${socket.id} joined room ${roomId}`);
};

export { joinRoom };
