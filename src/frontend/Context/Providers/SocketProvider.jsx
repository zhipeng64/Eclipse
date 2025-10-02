import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { useAuthenticationChecks } from "../../utils/customHooks.jsx";
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
  const [currentUser, setCurrentUser] = useState({}); // Holds current user's profile info
  const [newFriendRequest, setNewFriendRequest] = useState(false);
  const [pendingFriendRequests, setPendingFriendRequests] = useState({
    incoming: [],
    outgoing: [],
  });
  const [friends, setFriends] = useState([]);

  // Debug: Log friends state changes
  useEffect(() => {
    console.log("FRIENDS STATE CHANGED:", friends, "Length:", friends.length);
  }, [friends]);

  // Chat-related state
  const [conversationHistory, setConversationHistory] = useState([]); // Depends on selectedFriend
  const [recentMessages, setRecentMessages] = useState(new Map()); // Stores recent message per chatroom

  // Chat selection state
  const [selectedFriend, setSelectedFriend] = useState(null);
  const selectedFriendRef = useRef(selectedFriend); // Ref to keep track of selectedFriend without stale closure

  // Context value to be shared with children components
  const data = {
    socket,
    currentUser,
    newFriendRequest,
    pendingFriendRequests,
    friends,
    selectedFriend,
    setSelectedFriend,
    conversationHistory,
    setConversationHistory,
    recentMessages,
  };

  useEffect(() => {
    selectedFriendRef.current = selectedFriend;
  }, [selectedFriend]);

  useEffect(() => {
    // Only initialize socket if user is authenticated
    if (!isAuthenticated) return;

    // Initialize socket connection
    // Use the backend URL from config
    const serverUrl = env.VITE_BACKEND_URL;
    console.log("Connecting to Socket.IO server at:", serverUrl);
    const newSocket = io(serverUrl, {
      path: "/socket.io/",
      withCredentials: true,
    });

    // Listener for current user profile info
    const handleCurrentUserProfile = (profile) => {
      console.log("Received current user profile:", profile);
      setCurrentUser(profile);
    };

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
    const handlePendingFriendRequests = (friendRequests, status) => {
      console.log(
        "Received pending friend requests:",
        friendRequests,
        "STATUS:",
        status,
        "TYPE:",
        typeof status
      );
      pendingFriendRequestsLoadingRef.current = true;

      if (!friendRequests) return;
      const newIncomingRequests = friendRequests.incoming || [];
      const newOutgoingRequests = friendRequests.outgoing || [];
      const result = {};
      switch (status) {
        // Initial load of pending friend requests
        case env.VITE_EVENT_STATUS_INITIALIZE:
          result.incoming = [...newIncomingRequests, ...buffer.current];
          result.outgoing = [...newOutgoingRequests];
          console.log("Setting pending requests (INITIALIZE):", result);
          setPendingFriendRequests(result);
          buffer.current = [];
          break;
        // Incremental addition (push) of new friend requests
        case env.VITE_EVENT_STATUS_PUSH:
          console.log("Adding pending requests (PUSH):", friendRequests);
          setPendingFriendRequests((prevObject) => ({
            incoming: [...prevObject.incoming, ...newIncomingRequests],
            outgoing: [...prevObject.outgoing, ...newOutgoingRequests],
          }));
          break;
        // Removal of friend requests (e.g., after acceptance/decline)
        case env.VITE_EVENT_STATUS_DELETE:
          console.log("Removing pending requests (DELETE):", friendRequests);
          setPendingFriendRequests((prevObject) => ({
            incoming: prevObject.incoming.filter(
              (req) => !friendRequests.incoming.some((r) => r.id === req.id)
            ),
            outgoing: prevObject.outgoing.filter(
              (req) => !friendRequests.outgoing.some((r) => r.id === req.id)
            ),
          }));
      }
      pendingFriendRequestsLoadingRef.current = false;
    };

    // Listener to know user has joined a chat room
    const handleJoinChatRoom = (serverMessage) => {
      console.log("Join chatroom response:", serverMessage);
    };

    // Listener for full friends list
    const handleFriendsList = (friends, status) => {
      console.log(
        "Received friends list:",
        friends,
        "STATUS:",
        status,
        "TYPE:",
        typeof status
      );
      if (!friends) return;
      const friendArray = friends?.friends || [];
      switch (status) {
        case env.VITE_EVENT_STATUS_INITIALIZE:
          console.log("Setting friends list (INITIALIZE):", friendArray);
          // Join each chatroom
          friendArray.forEach((friend) => {
            joinRoom(newSocket, "join-chatroom", friend.chatroomId);
          });
          setFriends(friendArray);
          break;
        case env.VITE_EVENT_STATUS_PUSH:
          console.log("Adding to friends list (PUSH):", friendArray);
          friendArray.forEach((friend) => {
            joinRoom(newSocket, "join-chatroom", friend.chatroomId);
          });
          setFriends((prevArray) => [...prevArray, ...friendArray]);
          break;
        case env.VITE_EVENT_STATUS_DELETE:
          console.log("Removing from friends list (DELETE):", friendArray);
          setFriends((prevArray) =>
            prevArray.filter(
              (friend) =>
                !friendArray.some(
                  (removedFriend) => removedFriend.id === friend.id
                )
            )
          );
          break;
      }
    };

    // Gets the conversation history from the server
    const handleConversation = (messages, status) => {
      if (!messages) return;
      const messageList = messages?.messages || [];

      // Check if new messages belongs to the selected friend's chatroom
      const messagesInChatroom = messageList.filter(
        (message) =>
          selectedFriendRef.current &&
          message.chatroomId === selectedFriendRef.current.chatroomId
      );

      console.log("NEW MESSAGE: ", messageList, status);
      console.log("Selected Chat Ref:", selectedFriendRef.current);
      console.log("Message in Chatroom:", messagesInChatroom);
      switch (status) {
        case env.VITE_EVENT_STATUS_INITIALIZE:
          setConversationHistory(messagesInChatroom);
          break;
        case env.VITE_EVENT_STATUS_PUSH:
          setConversationHistory((prev) => [...prev, ...messagesInChatroom]);
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
    newSocket.on("current-user-profile", handleCurrentUserProfile);
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
    newSocket.emit("current-user-profile");
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
