import { io } from "socket.io-client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useAuthenticationChecks } from "../../utils/customHooks.jsx";
import { insertIfNotExists, removeIfExists } from "../../utils/customHooks.jsx";
import SocketContext from "../Socket.jsx";
import { joinRoom } from "../../utils/socket.js";
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

  // Chat-related state
  const [conversationHistory, setConversationHistory] = useState([]); // Depends on selectedChat
  const [recentMessages, setRecentMessages] = useState(new Map()); // Stores recent message per chatroom

  // Chat selection state (moved from ChatPanel)
  const [selectedChat, setSelectedChat] = useState(null);
  const selectedChatRef = useRef(selectedChat); // Ref to keep track of selectedChat without stale closure

  // Force re-render mechanism for debugging production issues
  const [forceUpdate, setForceUpdate] = useState(0);
  const triggerUpdate = useCallback(
    () => setForceUpdate((prev) => prev + 1),
    []
  );

  // Context value to be shared with children components
  const data = {
    socket,
    newFriendRequest,
    pendingFriendRequests,
    friends,
    selectedChat,
    setSelectedChat,
    conversationHistory,
    setConversationHistory,
    recentMessages,
    triggerUpdate, // For debugging production issues
  };

  useEffect(() => {
    selectedChatRef.current = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    // Only initialize socket if user is authenticated
    if (!isAuthenticated) return;

    // Prevent duplicate connections in React.StrictMode
    if (socket?.connected) {
      return;
    }

    // Initialize socket connection
    const serverUrl = "/"; // Root namespace
    const newSocket = io(serverUrl, {
      path: "/socket.io/",
      withCredentials: true,
      transports: ["websocket", "polling"], // Explicit transport order for production
    });

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
      console.log(
        "Current pending requests before update:",
        pendingFriendRequests
      );
      pendingFriendRequestsLoadingRef.current = true;

      if (!list) return;
      var comparator = (a, b) => a.username === b.username;
      switch (status) {
        // Initial load of pending friend requests
        case env.VITE_EVENT_STATUS_INITIALIZE:
          setPendingFriendRequests((prev) => {
            const updated = insertIfNotExists(
              prev,
              [...list, ...buffer.current],
              comparator
            );
            console.log("Updated pending requests (INITIALIZE):", updated);
            return updated;
          });
          break;
        // Incremental addition (push) of new friend requests
        case env.VITE_EVENT_STATUS_PUSH:
          setPendingFriendRequests((prev) =>
            insertIfNotExists(prev, [...list], comparator)
          );
          break;
        // Removal of friend requests (e.g., upon acceptance or rejection)
        case env.VITE_EVENT_STATUS_DELETE:
          setPendingFriendRequests((prev) =>
            removeIfExists(prev, [...list], comparator)
          );
          break;
      }

      pendingFriendRequestsLoadingRef.current = false;
    };

    // Listener to know user has joined a chat room
    const handleJoinChatRoom = (serverMessage) => {
      console.log("Join chatroom response:", serverMessage);
    };

    // Listener for full friends list
    const handleFriendsList = (list, status) => {
      console.log("Received friends list:", list, status);
      console.log("Current friends before update:", friends);
      if (!list) return;
      if (!Array.isArray(list)) {
        console.error(
          "Expected 'list' to be an array, but got:",
          typeof list,
          list
        );
      }

      // Do the same as above
      var comparator = (a, b) => a.username === b.username;
      switch (status) {
        case env.VITE_EVENT_STATUS_INITIALIZE:
          setFriends((prev) => {
            const updated = insertIfNotExists(prev, [...list], comparator);
            console.log("Updated friends list (INITIALIZE):", updated);
            return updated;
          });
          list.map((friend) =>
            joinRoom(newSocket, "join-chatroom", friend.chatroomId)
          );
          break;
        case env.VITE_EVENT_STATUS_PUSH:
          setFriends((prev) => insertIfNotExists(prev, [...list], comparator));
          list.map((friend) =>
            joinRoom(newSocket, "join-chatroom", friend.chatroomId)
          );
          break;
        case env.VITE_EVENT_STATUS_DELETE:
          setFriends((prev) => removeIfExists(prev, [...list], comparator));
          break;
      }
    };

    // Gets the conversation history from the server
    const handleConversation = (list, status) => {
      if (!list) return;
      const messageInChatroom = list.filter(
        (message) =>
          selectedChatRef.current &&
          message.chatroomId === selectedChatRef.current.chatroomId
      );

      if (messageInChatroom.length === 0) return; // No messages for the selected chatroom
      console.log("NEW MESSAGE: ", list, status);
      console.log("Selected Chat Ref:", selectedChatRef.current);
      console.log("Message in Chatroom:", messageInChatroom);
      switch (status) {
        case env.VITE_EVENT_STATUS_INITIALIZE:
          // Check if selectedChat matches the chatroomId of the messages received
          setConversationHistory(messageInChatroom);

          break;
        case env.VITE_EVENT_STATUS_PUSH:
          // Insert to existing conversation history if it matches selectedChat
          setConversationHistory((prev) => [...prev, ...messageInChatroom]);
          break;
      }
    };

    // Gets the recent message received from server
    const handleRecentMessage = (list, status) => {
      console.log("Handling recent message:", list, status);
      console.log("Current recentMessages Map:", recentMessages);
      if (!list) return;
      switch (status) {
        case env.VITE_EVENT_STATUS_INITIALIZE:
          // Update recentMessages map with the new message
          setRecentMessages((prev) => {
            const updated = new Map(prev);
            updated.set(list.chatroomId, list);
            return updated;
          });
          break;
        case env.VITE_EVENT_STATUS_PUSH:
          // Update recentMessages map with the new message
          setRecentMessages((prev) => {
            const updated = new Map(prev);
            updated.set(list.chatroomId, list);
            return updated;
          });
          break;
      }
    };

    // Register socket event listeners
    newSocket.on("new-friend-request", handleNewFriendRequest);
    newSocket.on("pending-friend-requests", handlePendingFriendRequests);
    newSocket.on("friends-list", handleFriendsList);
    newSocket.on("join-chatroom", handleJoinChatRoom);
    newSocket.on("conversation", handleConversation);
    newSocket.on("recent-message", handleRecentMessage);
    newSocket.on("connect_error", (err) => {
      console.error("Socket.IO connect_error:", err.message);
      console.error("Error description:", err.description);
      console.error("Error context:", err.context);
    });
    newSocket.on("disconnect", (reason, details) => {
      console.warn("Socket disconnected:", reason);
      if (details) {
        console.warn(
          "Disconnect details:",
          details.message,
          details.description,
          details.context
        );
      }
    });
    // Save socket instance in state
    setSocket(newSocket);

    // Initial emits to fetch necessary data
    newSocket.emit("pending-friend-requests");
    newSocket.emit("friends-list");

    // Cleanup on unmount or logout
    return () => {
      if (newSocket) {
        newSocket.removeAllListeners();
        newSocket.close(); // Use close() instead of disconnect() for complete cleanup
      }
      setSocket(null);
      // Reset loading states
      pendingFriendRequestsLoadingRef.current = true;
      buffer.current = [];
    };
  }, [isAuthenticated]);

  // Don’t render anything while auth state is loading
  if (isLoading) return null;

  return (
    <SocketContext.Provider value={data}>{children}</SocketContext.Provider>
  );
}

export default SocketProvider;
