import { FaHome } from "react-icons/fa";
import { IoMdChatboxes } from "react-icons/io";
import { IoSettings } from "react-icons/io5";

import { ChatOption } from "./ChatOption";
import { ChatPanel } from "./ChatPanel";

function MainPanel() {
  return (
    <div
      id="main-panel"
      className="flex flex-col w-full h-screen bg-gradient-to-br from-[#0f1a2b]/100 to-[#1a2a44]/90  text-white"
    >
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
      {/* Main content area */}
      <div id="content" className="flex grow space-x-5">
        <div className="flex justify-end w-full max-w-md ml-30 rounded-lg mb-5">
          <ChatOption />
        </div>

        <div className="mb-5">
          <ChatPanel />
        </div>
      </div>
    </div>
  );
}

export { MainPanel };
