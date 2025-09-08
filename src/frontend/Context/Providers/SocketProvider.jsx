import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { useAuthenticationChecks } from "../../utils/customHooks.jsx";
import SocketContext from "../Socket.jsx";

function SocketProvider({ children }) {
  const { isAuthenticated } = useAuthenticationChecks();
  const [pendingFriendRequests, setPendingFriendRequests] = useState({});
  const socketRef = useRef(null);

  // Creates a singleton socket
  useEffect(() => {
    const serverUrl = `${import.meta.env.VITE_BACKEND_URL}`; // Automatically appends /socket.io pathname by default
    socketRef.current = io(serverUrl, {
      withCredentials: true,
    });

    // Register listeners
    // Receives a new friend request
    socketRef.current.on("new-friend-request", (friendRequest) => {});

    return () => {
      socketRef.current.removeAllListeners();
      socketRef.current.disconnect();
    };
  }, []);
  return (
    <SocketContext.Provider value={socketRef.current}>
      {/* Special "children" prop wraps all other components within subtree where this component is referenced*/}
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
