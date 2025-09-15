import { FaHome } from "react-icons/fa";
import { IoMdChatboxes } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { useContext } from "react";
import SocketContext from "../Context/Socket";

function Navigation({ optionSelected, setOptionSelected }) {
  const { newFriendRequest } = useContext(SocketContext);
  return (
    <nav
      id="top-nav"
      className="flex flex-row px-3 py-5 justify-center items-center space-x-15 text-white"
    >
      <div
        id="home-option"
        className={`flex flex-col items-center cursor-pointer p-2 rounded-lg ${optionSelected.homeOption ? "layer-2" : ""}`}
        onClick={() =>
          setOptionSelected({
            homeOption: true,
            chatOption: false,
            settingsOption: false,
          })
        }
      >
        <i className="navigation-icon">
          <FaHome className="text-[1.4rem]" />
        </i>
        <h2 className="text-lg">Home</h2>
      </div>

      {/* 'right' places the right edge of pseudo element certain pixels 
      from the right edge of its container for absolute positioning*/}
      <div
        id="chat-option"
        className={`relative flex flex-col items-center cursor-pointer p-2 rounded-lg ${optionSelected.chatOption ? "layer-2" : ""}
        ${
          newFriendRequest
            ? "after:content-[''] after:absolute after:rounded-lg after:top-1 after:right-3 after:w-3 after:h-3 after:bg-[#b390f4]"
            : ""
        }
        `}
        onClick={() =>
          setOptionSelected({
            homeOption: false,
            chatOption: true,
            settingsOption: false,
          })
        }
      >
        <i className="navigation-icon">
          <IoMdChatboxes className="text-[1.4rem] " />
        </i>
        <h2 className="text-lg">Chat</h2>
        {newFriendRequest && <p>You have a new friend request!</p>}
      </div>

      <div
        id="settings-option"
        className={`flex flex-col items-center cursor-pointer p-2 rounded-lg ${optionSelected.settingsOption ? "bg-gray-700" : ""}`}
        onClick={() =>
          setOptionSelected({
            homeOption: false,
            chatOption: false,
            settingsOption: true,
          })
        }
      >
        <i className="navigation-icon">
          <IoSettings className="text-[1.4rem]" />
        </i>
        <h2 className="text-lg">Settings</h2>
      </div>
    </nav>
  );
}

export { Navigation };
