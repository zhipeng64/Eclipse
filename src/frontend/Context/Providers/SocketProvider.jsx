import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { useAuthenticationChecks } from "../../utils/customHooks.jsx";
import SocketContext from "../Socket.jsx";
import env from "../../config.js";

function SocketProvider({ children }) {
  // State to hold the socket instance
  const [socket, setSocket] = useState(null);

  // Ref to track whether pending friend requests are still being loaded
  const pendingFriendRequestsLoadingRef = useRef(true);

  // Buffer to temporarily store incoming friend requests until initial load is complete
  const buffer = useRef([]);

  // Authentication state
  const { isLoading, isAuthenticated } = useAuthenticationChecks();

  // UI state
  const [newFriendRequest, setNewFriendRequest] = useState(false);
  const [pendingFriendRequests, setPendingFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);

  // Context value to be shared with children components
  const data = {
    socket,
    newFriendRequest,
    pendingFriendRequests,
    friends,
  };

  useEffect(() => {
    // Only initialize socket if user is authenticated
    if (!isAuthenticated) return;

    // Initialize socket connection
    const serverUrl = env.VITE_BACKEND_URL;
    const newSocket = io(serverUrl, { withCredentials: true });

    // Listener for new incoming friend requests
    const handleNewFriendRequest = (friendRequest) => {
      console.log("Received new friend request:", friendRequest);
      if (!friendRequest) return;

      if (pendingFriendRequestsLoadingRef.current) {
        // Still loading, buffer the request
        buffer.current.push(friendRequest);
      } else {
        // Immediately notify if already loaded
        setNewFriendRequest(true);
      }
    };

    // Listener for pending friend requests list
    const handlePendingFriendRequests = (list, status) => {
      console.log("Received pending friend requests:", list, status);
      pendingFriendRequestsLoadingRef.current = true;

      if (!list) return;

      setPendingFriendRequests((prev) => {
        if (status === env.VITE_EVENT_STATUS_INITIALIZE) {
          // First-time load: merge list and buffered items
          return [...list, ...buffer.current];
        }
        if (status === env.VITE_EVENT_STATUS_PUSH) {
          // New requests pushed from server
          return [...prev, ...list];
        }
        return prev;
      });

      pendingFriendRequestsLoadingRef.current = false;
    };

    // Listener to know user has joined a chat room
    const handleJoinChatRoom = (serverMessage) => {
      console.log("Join chatroom response:", serverMessage);
    };

    // Listener for full friends list
    const handleFriendsList = (list) => {
      console.log("Received friends list:", list);
      if (list) {
        setFriends(list);
        // Join chatrooms after friends list have been loaded
        list.forEach((friend) => {
          const chatroomId = friend?.chatroomId || null;
          newSocket.emit("join-chatroom", chatroomId, friend.username);
        });
      }
    };

    // Register socket event listeners
    newSocket.on("new-friend-request", handleNewFriendRequest);
    newSocket.on("pending-friend-requests", handlePendingFriendRequests);
    newSocket.on("friends-list", handleFriendsList);
    newSocket.on("join-chatroom", handleJoinChatRoom);

    // Save socket instance in state
    setSocket(newSocket);

    // Initial emits to fetch necessary data
    newSocket.emit("pending-friend-requests");
    newSocket.emit("friends-list");

    // Cleanup on unmount or logout
    return () => {
      newSocket.removeAllListeners();
      newSocket.disconnect();
      setSocket(null);
    };
  }, [isAuthenticated]);

  // Don’t render anything while auth state is loading
  if (isLoading) return null;

  return (
    <SocketContext.Provider value={data}>{children}</SocketContext.Provider>
  );
}

export default SocketProvider;
