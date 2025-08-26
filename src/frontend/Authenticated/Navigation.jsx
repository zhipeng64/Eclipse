import { FaHome } from "react-icons/fa";
import { IoMdChatboxes } from "react-icons/io";
import { IoSettings } from "react-icons/io5";

function Navigation() {
  return (
    <nav
      id="top-nav"
      className="flex flex-row px-3 py-5 justify-center items-center space-x-15"
    >
      <div id="home-option" className="flex flex-col items-center">
        <i className="navigation-icon">
          <FaHome className="text-[1.4rem] cursor-pointer" />
        </i>
        <h2 className="text-lg">Home</h2>
      </div>

      <div id="chat-option" className="flex flex-col items-center">
        <i className="navigation-icon">
          <IoMdChatboxes className="text-[1.4rem] cursor-pointer" />
        </i>
        <h2 className="text-lg">Chat</h2>
      </div>

      <div id="settings-option" className="flex flex-col items-center">
        <i className="navigation-icon">
          <IoSettings className="text-[1.4rem] cursor-pointer" />
        </i>
        <h2 className="text-lg">Settings</h2>
      </div>
    </nav>
  );
}

export { Navigation };
