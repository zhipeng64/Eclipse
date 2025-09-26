import { useState, useRef, useContext } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import SearchFriendModal from "./SearchFriendModal";
import { useCloseOnClickOutside } from "../utils/customHooks.jsx";
import InboxModal from "./InboxModal.jsx";
import SocketContext from "../Context/Socket.jsx";
import defaultImage from "../assets/sunrise2.jpg";

function ChatOption({ pendingFriendRequests, friends }) {
  // Debug: Log received props
  console.log(
    "ChatOption - Received friends prop:",
    friends,
    "Length:",
    friends.length
  );

  // Modal states
  const [isFriendSearchOpen, setIsFriendSearchOpen] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);

  /// Refs for modals
  const friendModalRef = useRef(null);
  const inboxModalRef = useRef(null);

  // Get setSelectedChat from context
  const { selectedChat, setSelectedChat } = useContext(SocketContext);

  // Register event listeners
  useCloseOnClickOutside(friendModalRef, isFriendSearchOpen, () =>
    setIsFriendSearchOpen(false)
  );
  useCloseOnClickOutside(inboxModalRef, isInboxOpen, () => {
    setIsInboxOpen(false);
  });

  // Optionally, you can log selectedChat for debugging
  // console.log(selectedChat);
  return (
    // h-full works because parent has resolved height via flex-grow
    <div
      id="chat-option"
      className="text-white dlayer-4 w-auto h-full max-h-full flex flex-col rounded-lg opac-shadow"
    >
      {isFriendSearchOpen && (
        <SearchFriendModal friendModalRef={friendModalRef} />
      )}

      {isInboxOpen && <InboxModal inboxModalRef={inboxModalRef} />}
      <div id="top-navigation" className="opac-shadow">
        <div className="flex items-center justify-between p-3 mb-0.5">
          <h1 className="text-3xl">Chat</h1>
          <div className="flex space-x-7 text-gray-200 pr-2r">
            <i className="standard-icon-container p-1">
              <FaSearch className="standard-icon" />
            </i>
            <i
              className="standard-icon-container p-1"
              onClick={(e) => {
                e.stopPropagation();
                setIsFriendSearchOpen(true);
              }}
            >
              <IoPersonAddSharp className="standard-icon" />
            </i>
            <i
              className="relative standard-icon-container p-1"
              onClick={(e) => {
                e.stopPropagation();
                setIsInboxOpen(true);
              }}
            >
              {pendingFriendRequests.length > 0 && (
                <span className="absolute top-0 right-0 bg-[#9059f6] text-white text-[10px] rounded-full w-3 h-3 flex items-center justify-center">
                  {pendingFriendRequests.length}
                </span>
              )}
              <CiMail className="standard-icon" />
            </i>
          </div>
        </div>
      </div>
      <div
        id="status-bar"
        className={`flex items-center gap-5 ${friends.length > 0 ? "" : "min-h-[10%]"} px-4 py-2 opac-shado w overflow-auto`}
      >
        {friends.length > 0 ? (
          friends.map((friend) => (
            <div
              className="flex flex-col items-center justify-center space-y-1 cursor-pointer"
              key={friend.username}
            >
              <img
                src={defaultImage}
                alt="Avatar"
                className="w-11 h-11 rounded-full"
              />
              <p className="text-sm">{friend.username}</p>
            </div>
          ))
        ) : (
          <div className="flex grow items-center justify-center text-gray-400">
            No friends yet
          </div>
        )}
      </div>
      <div
        id="recent-chats"
        className="flex flex-col items-start space-y-0 grow overflow-auto"
      >
        {friends.length > 0 ? (
          friends.map((friend) => (
            <div
              className={`flex w-full py-2 px-4 opac-shadow cursor-pointer ${selectedChat?.username === friend.username ? "bg-gray-700" : "hover:bg-gray-800 "}`}
              key={friend.username}
              onClick={() => setSelectedChat(friend)}
            >
              <img
                src={defaultImage}
                alt="Avatar"
                className="w-11 h-11 rounded-full mr-3.5"
              />
              <div className="flex flex-col">
                <p className="text-sm">{friend.username}</p>
                <p className="text-xs text-gray-400">
                  {/* Placeholder for last message or status */}
                  No recent messages
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex grow self-stretch items-center justify-center text-gray-400">
            No recent chats
          </div>
        )}
      </div>
    </div>
  );
}

export { ChatOption };
