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
  // Modal states
  const [isFriendSearchOpen, setIsFriendSearchOpen] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);

  /// Refs for modals
  const friendModalRef = useRef(null);
  const inboxModalRef = useRef(null);

  // Get setSelectedFriend from context
  const { selectedFriend, setSelectedFriend } = useContext(SocketContext);

  // Register event listeners
  useCloseOnClickOutside(friendModalRef, isFriendSearchOpen, () =>
    setIsFriendSearchOpen(false)
  );
  useCloseOnClickOutside(inboxModalRef, isInboxOpen, () => {
    setIsInboxOpen(false);
  });

  return (
    // h-full works because parent has resolved height via flex-grow
    <div
      id="chat-option"
      className="text-gray-300 bg-[oklch(0.12_0_0)] w-auto h-full max-h-full flex flex-col rounded-lg lg:p-0 opac-shadow"
    >
      {isFriendSearchOpen && (
        <SearchFriendModal friendModalRef={friendModalRef} />
      )}

      {isInboxOpen && <InboxModal inboxModalRef={inboxModalRef} />}
      <div id="top-navigation">
        <div className="flex flex-row items-center justify-between bottom-divider">
          <h1 className="text-2xl sm:text-3xl p-2 text-[oklch(0.75_0.04_246.6)]">
            Chat
          </h1>
          <div className="flex flex-row text-gray-200 p-2 gap-x-4 lg:gap-x-6">
            <i className="standard-icon-container p-1">
              <FaSearch className="text-[1.2rem]" />
            </i>
            <i
              className="purple-icon-container p-1"
              onClick={(e) => {
                e.stopPropagation();
                setIsFriendSearchOpen(true);
              }}
            >
              <IoPersonAddSharp className="text-[1.2rem]" />
            </i>
            <i
              className="relative standard-icon-container p-1"
              onClick={(e) => {
                e.stopPropagation();
                setIsInboxOpen(true);
              }}
            >
              {pendingFriendRequests.incoming &&
                pendingFriendRequests.incoming.length > 0 && (
                  <span className="absolute top-0 right-0 bg-[#9059f6] text-white text-[10px] rounded-full w-3 h-3 flex items-center justify-center">
                    {pendingFriendRequests.incoming.length}
                  </span>
                )}
              <CiMail className="text-[1.2rem]" />
            </i>
          </div>
        </div>
      </div>
      <div
        id="status-bar"
        className={`flex items-center gap-x-4 px-4 lg:gap-x-5 ${friends.length > 0 ? "" : "min-h-[10%]"} p-2 overflow-auto bottom-divider`}
      >
        {friends.length > 0 ? (
          friends.map((friend) => (
            <div
              className="flex flex-col items-center justify-center space-y-1 cursor-pointer"
              key={friend.username}
            >
              <img
                src={`data:image/${friend.avatarImageType};base64,${friend.avatar || "../assets/sunrise2.jpg"}`}
                alt="Avatar"
                className="w-10 h-10 lg:w-11 lg:h-11 rounded-full drop-shadow-[oklch(0.8_0.05_246.6)]/40 drop-shadow-sm"
              />
              <p className="text-xs lg:text-md">{friend.username}</p>
            </div>
          ))
        ) : (
          <div className="text-sm sm:text-md flex grow items-center justify-center text-gray-400">
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
              className={`flex w-full py-2 px-4 cursor-pointer bottom-divider ${selectedFriend?.username === friend.username ? "bg-gray-900" : "hover:bg-[oklch(0.20_0_0)]"}`}
              key={friend.username}
              onClick={() => setSelectedFriend(friend)}
            >
              <img
                src={`data:image/${friend.avatarImageType};base64,${friend.avatar || "../assets/sunrise2.jpg"}`}
                alt="Avatar"
                className="w-10 h-10 lg:w-11 lg:h-11 rounded-full mr-3.5 drop-shadow-[oklch(0.8_0.05_246.6)]/40 drop-shadow-sm"
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
          <div className="flex grow self-stretch items-center justify-center text-gray-400 text-sm sm:text-md">
            No recent chats
          </div>
        )}
      </div>
    </div>
  );
}

export { ChatOption };
