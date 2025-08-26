import { IoPersonAddSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

function ChatOption(chatData) {
  return (
    <div
      id="chat-option"
      className="text-white bg-[#0f0f1a] w-full max-w-lg h-full flex flex-col rounded-lg opac-shadow"
    >
      <div id="top-navigation" className="opac-shadow">
        <div className="flex items-center justify-between p-3 mb-0.5">
          <h1 className="text-3xl">Chat</h1>
          <div className="flex space-x-7 text-gray-200 pr-2">
            <i>
              <FaSearch className="standard-icon" />
            </i>
            <i>
              <IoPersonAddSharp className="standard-icon" />
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
