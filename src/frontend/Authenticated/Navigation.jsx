import { FaHome } from "react-icons/fa";
import { IoMdChatboxes } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { useState, useContext, useEffect } from "react";
import SocketContext from "../Context/Socket";

function Navigation({ optionSelected, setOptionSelected }) {
  const [showToast, setShowToast] = useState(false);
  const { newFriendRequest } = useContext(SocketContext);

  // Show the toast upon a new friend request
  useEffect(() => {
    if (!newFriendRequest) return;
    const showMessage = () => {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 10000); // Hide after 10 seconds
    };
    showMessage();
  }, [newFriendRequest]);
  return (
    <nav
      id="side-nav"
      className="h-full w-full flex flex-col text-sm p-2 justify-between bg-[oklch(0.18_0_0)] items-center text-white opac-shadow"
    >
      {/* <div
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
      </div> */}

      {/* 'right' places the right edge of pseudo element certain pixels 
      from the right edge of its container for absolute positioning*/}
      <div
        id="chat-option"
        className={`flex flex-row items-center cursor-pointer p-2 rounded-lg ${
          optionSelected.chatOption
            ? "bg-[oklch(0.65_0.06_237.18)]"
            : "hover:shadow-[0_0_8px_0_oklch(0.664_0.222_282.5)]"
        }`}
        onClick={() =>
          setOptionSelected({
            // homeOption: false,
            chatOption: true,
            settingsOption: false,
          })
        }
      >
        <i className="navigation-icon">
          <IoMdChatboxes
            className={`text-[1.1rem] lg:text-[1.5rem] ${
              optionSelected.chatOption
                ? "text-black"
                : "text-[oklch(0.8_0.05_237.18)]"
            }`}
          />
        </i>
        {showToast && <p>You have a new friend request!</p>}
      </div>

      <div
        id="settings-option"
        className={`flex flex-row items-center cursor-pointer px-2 py-4 rounded-lg ${
          optionSelected.settingsOption
            ? "bg-[oklch(0.65_0.06_237.18)]"
            : "hover:shadow-[0_0_8px_0_oklch(0.664_0.222_282.5)]"
        }`}
        onClick={() =>
          setOptionSelected({
            // homeOption: false,
            chatOption: false,
            settingsOption: true,
          })
        }
      >
        <i className="navigation-icon">
          <IoSettings
            className={`text-[1.1rem] lg:text-[1.5rem] ${
              optionSelected.settingsOption
                ? "text-black"
                : "text-[oklch(0.8_0.05_237.18)]"
            }`}
          />
        </i>
      </div>
    </nav>
  );
}

export { Navigation };
