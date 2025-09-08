// Controls event listeners and logic, decoupled from socket server initialization
// to separate responsibilities
class SocketController {
  // Wraps an initialized Socket server object
  constructor(io) {
    this.io = io;
  }
}
