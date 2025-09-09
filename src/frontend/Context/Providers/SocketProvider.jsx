import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { useAuthenticationChecks } from "../../utils/customHooks.jsx";
import SocketContext from "../Socket.jsx";

function SocketProvider({ children }) {
  const socketRef = useRef(null);
  const { isLoading, isAuthenticated } = useAuthenticationChecks();
  const [newFriendRequest, setNewFriendRequest] = useState(false);
  const data = {
    socket: socketRef.current,
    newFriendRequest,
  };

  // Creates a singleton socket
  useEffect(() => {
    if (!isAuthenticated) return;
    const serverUrl = `${import.meta.env.VITE_BACKEND_URL}`; // Automatically appends /socket.io pathname by default
    socketRef.current = io(serverUrl, {
      withCredentials: true,
    });

    // Register listeners
    // Receives a new friend request
    socketRef.current.on("new-friend-request", (message, callback) => {
      if (message) {
        setNewFriendRequest(true);
        callback("thanks backend!");
      }
    });

    return () => {
      socketRef.current.removeAllListeners();
      socketRef.current.disconnect();
    };
  }, [isAuthenticated]);

  if (isLoading) {
    return null; // Load nothing while still loading
  }

  return (
    <SocketContext.Provider value={data}>
      {/* Special "children" prop wraps all other components within subtree where this component is referenced*/}
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
