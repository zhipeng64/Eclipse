import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { useAuthenticationChecks } from "../../utils/customHooks.jsx";
import SocketContext from "../Socket.jsx";

function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const pendingFriendRequestsLoadingRef = useRef(true);
  const buffer = useRef([]);

  const { isLoading, isAuthenticated } = useAuthenticationChecks();
  const [newFriendRequest, setNewFriendRequest] = useState(false);
  const [pendingFriendRequests, setPendingFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const data = {
    socket: socket,
    newFriendRequest,
    pendingFriendRequests,
    friends,
  };

  // Creates a singleton socket
  useEffect(() => {
    if (!isAuthenticated) return;
    const serverUrl = `${import.meta.env.VITE_BACKEND_URL}`; // Automatically appends /socket.io pathname by default
    const newSocket = io(serverUrl, {
      withCredentials: true,
    });

    // Register listeners
    // Receives a new friend request
    // This must come after pending requests are loaded
    newSocket.on("new-friend-request", (friendRequest) => {
      console.log("Received new friend request:");
      console.log(friendRequest);
      if (friendRequest) {
        if (!pendingFriendRequestsLoadingRef.current) {
          setNewFriendRequest(true);
        } else {
          buffer.current.push(friendRequest);
        }
      }
    });

    // Receives a list of all pending friend requests
    newSocket.on("pending-friend-requests", (list) => {
      console.log(list);
      pendingFriendRequestsLoadingRef.current = true;
      if (list) {
        setPendingFriendRequests([...list, ...buffer.current]);
      }
      pendingFriendRequestsLoadingRef.current = false;
    });

    // Receives a list of all friends
    newSocket.on("friends-list", (list) => {
      if (list) {
        setFriends(list);
      }
    });

    setSocket(newSocket);
    // Emit event to fetch all pending friend requests
    newSocket.emit("pending-friend-requests");

    // Emit event to fetch all friends
    newSocket.emit("friends-list");
    return () => {
      newSocket.removeAllListeners();
      newSocket.disconnect();
      setSocket(null);
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
