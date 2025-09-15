import { useState, useRef, useContext, useEffect } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import SearchFriendModal from "./SearchFriendModal";
import { useCloseOnClickOutside } from "../utils/customHooks.jsx";
import InboxModal from "./InboxModal.jsx";
import SocketContext from "../Context/Socket.jsx";

function ChatOption({ chatData }) {
  const { socket, pendingFriendRequests } = useContext(SocketContext);
  const [isFriendSearchOpen, setIsFriendSearchOpen] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const friendModalRef = useRef(null);
  const inboxModalRef = useRef(null);

  // Register event listeners
  useCloseOnClickOutside(friendModalRef, isFriendSearchOpen, () =>
    setIsFriendSearchOpen(false)
  );
  useCloseOnClickOutside(inboxModalRef, isInboxOpen, () => {
    setIsInboxOpen(false);
  });

  // Fetch all pending friend requests
  useEffect(() => {
    if (!socket) return;
    socket.emit("pending-friend-requests");
  }, [socket]);

  if (pendingFriendRequests.length > 0) {
    console.log(pendingFriendRequests);
  }
  return (
    // h-full works because parent has resolved height via flex-grow
    <div
      id="chat-option"
      className="text-white dlayer-4 w-auto h-full flex flex-col rounded-lg opac-shadow"
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
        className="flex items-center space-x-5 p-2 opac-shadow"
      >
        <div className="flex flex-col items-center justify-center space-y-1">
          <img
            src="../assets/sunrise2.jpg"
            alt="Avatar"
            className="w-11 h-11 rounded-full"
          />
          <p className="text-sm">John Zena</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-1">
          <img
            src="../assets/sunrise.jpg"
            alt="Avatar"
            className="w-11 h-11 rounded-full"
          />
          <p className="text-sm">Stewart</p>
        </div>
      </div>
      <div
        id="recent-chats"
        className="flex flex-col items-start space-y-0 grow"
      >
        <div className="flex w-full py-2 px-4 opac-shadow">
          <img
            src="../assets/sunrise2.jpg"
            alt="Avatar"
            className="w-11 h-11 rounded-full mr-3.5"
          />
          <div className="flex flex-col">
            <p className="text-sm">John Zena</p>
            <p className="text-xs text-gray-400">
              I wish the world is a better place for those in need
            </p>
          </div>
        </div>
        <div className="flex w-full py-2 px-4 opac-shadow">
          <img
            src="../assets/sunrise.jpg"
            alt="Avatar"
            className="w-11 h-11 rounded-full mr-3.5"
          />
          <div className="flex flex-col">
            <p className="text-sm">Stewart</p>
            <p className="text-xs text-gray-400">
              I ponder about the meanining of 42
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ChatOption };
