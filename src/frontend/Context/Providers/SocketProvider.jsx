import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { useAuthenticationChecks } from "../../utils/customHooks.jsx";
import {
  useInsertIfNotExists,
  useRemoveIfExists,
} from "../../utils/customHooks.jsx";
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

  // Debug: Log friends state changes
  useEffect(() => {
    console.log("FRIENDS STATE CHANGED:", friends, "Length:", friends.length);
  }, [friends]);

  // Chat-related state
  const [conversationHistory, setConversationHistory] = useState([]); // Depends on selectedChat
  const [recentMessages, setRecentMessages] = useState(new Map()); // Stores recent message per chatroom

  // Chat selection state (moved from ChatPanel)
  const [selectedChat, setSelectedChat] = useState(null);
  const selectedChatRef = useRef(selectedChat); // Ref to keep track of selectedChat without stale closure

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
  };

  useEffect(() => {
    selectedChatRef.current = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    // Only initialize socket if user is authenticated
    if (!isAuthenticated) return;

    // Initialize socket connection
    const serverUrl = "/"; // Root namespace
    const newSocket = io(serverUrl, {
      path: "/socket.io/",
      withCredentials: true,
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
      console.log(
        "Received pending friend requests:",
        list,
        "STATUS:",
        status,
        "TYPE:",
        typeof status
      );
      pendingFriendRequestsLoadingRef.current = true;

      if (!list) return;
      var comparator = (a, b) => a.username === b.username;

      // Fallback: if status is missing, assume initialize
      // Normalize status to lowercase to handle case sensitivity
      const actualStatus = (
        status || env.VITE_EVENT_STATUS_INITIALIZE
      ).toLowerCase();
      console.log("Using pending requests status:", actualStatus);

      switch (actualStatus) {
        // Initial load of pending friend requests
        case env.VITE_EVENT_STATUS_INITIALIZE:
          console.log("Setting pending requests (INITIALIZE):", [
            ...list,
            ...buffer.current,
          ]);
          setPendingFriendRequests((prevRequests) => {
            const allNewRequests = [...list, ...buffer.current];
            const filteredRequests = allNewRequests.filter(
              (newRequest) =>
                !prevRequests.some((existingRequest) =>
                  comparator(existingRequest, newRequest)
                )
            );
            return [...prevRequests, ...filteredRequests];
          });
          break;
        // Incremental addition (push) of new friend requests
        case env.VITE_EVENT_STATUS_PUSH:
          console.log("Adding pending requests (PUSH):", list);
          setPendingFriendRequests((prevRequests) => {
            const filteredRequests = list.filter(
              (newRequest) =>
                !prevRequests.some((existingRequest) =>
                  comparator(existingRequest, newRequest)
                )
            );
            return [...prevRequests, ...filteredRequests];
          });
          break;
        // Removal of friend requests (e.g., upon acceptance or rejection)
        case env.VITE_EVENT_STATUS_DELETE:
          console.log("Removing pending requests (DELETE):", list);
          setPendingFriendRequests((prevRequests) => {
            return prevRequests.filter(
              (existingRequest) =>
                !list.some((requestToRemove) =>
                  comparator(existingRequest, requestToRemove)
                )
            );
          });
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
      console.log(
        "Received friends list:",
        list,
        "STATUS:",
        status,
        "TYPE:",
        typeof status
      );
      if (!list) return;

      console.log("FRIENDS LIST: ", list, status);
      console.log(
        "Comparing status:",
        status,
        "vs expected:",
        env.VITE_EVENT_STATUS_INITIALIZE
      );
      console.log(
        "Status comparison result:",
        status === env.VITE_EVENT_STATUS_INITIALIZE
      );
      if (!Array.isArray(list)) {
        console.error(
          "Expected 'list' to be an array, but got:",
          typeof list,
          list
        );
      }

      // Do the same as above
      var comparator = (a, b) => a.username === b.username;

      // Fallback: if status is missing, assume initialize
      // Normalize status to lowercase to handle case sensitivity
      const actualStatus = (
        status || env.VITE_EVENT_STATUS_INITIALIZE
      ).toLowerCase();
      console.log("Using status:", actualStatus);

      switch (actualStatus) {
        case env.VITE_EVENT_STATUS_INITIALIZE:
          console.log("Setting friends (INITIALIZE):", list);
          setFriends((prevFriends) => {
            const filteredNewFriends = list.filter(
              (newFriend) =>
                !prevFriends.some((existingFriend) =>
                  comparator(existingFriend, newFriend)
                )
            );
            const updatedFriends = [...prevFriends, ...filteredNewFriends];
            console.log(
              "Friends updated from",
              prevFriends,
              "to",
              updatedFriends
            );
            return updatedFriends;
          });
          list.map((friend) =>
            joinRoom(newSocket, "join-chatroom", friend.chatroomId)
          );
          break;
        case env.VITE_EVENT_STATUS_PUSH:
          console.log("Adding friends (PUSH):", list);
          setFriends((prevFriends) => {
            const filteredNewFriends = list.filter(
              (newFriend) =>
                !prevFriends.some((existingFriend) =>
                  comparator(existingFriend, newFriend)
                )
            );
            const updatedFriends = [...prevFriends, ...filteredNewFriends];
            console.log(
              "Friends updated from",
              prevFriends,
              "to",
              updatedFriends
            );
            return updatedFriends;
          });
          list.map((friend) =>
            joinRoom(newSocket, "join-chatroom", friend.chatroomId)
          );
          break;
        case env.VITE_EVENT_STATUS_DELETE:
          console.log("Removing friends (DELETE):", list);
          setFriends((prevFriends) => {
            const updatedFriends = prevFriends.filter(
              (existingFriend) =>
                !list.some((friendToRemove) =>
                  comparator(existingFriend, friendToRemove)
                )
            );
            console.log(
              "Friends updated from",
              prevFriends,
              "to",
              updatedFriends
            );
            return updatedFriends;
          });
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
