import { Navigation } from "./Navigation";
import { ChatOption } from "./ChatOption";
import { ChatPanel } from "./ChatPanel";
import { useAuthenticationChecks } from "../utils/customHooks";
import { useContext, useState } from "react";
import SocketContext from "../Context/Socket.jsx";
import { HomeOption } from "./HomeOption";

function MainPanel() {
  const { isLoading, isAuthenticated } = useAuthenticationChecks();
  // Access socket context for real-time updates
  const { pendingFriendRequests, friends } = useContext(SocketContext);

  const [optionSelected, setOptionSelected] = useState({
    // homeOption: false,
    chatOption: true,
    settingsOption: false,
  });
  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return (
      <div
        id="main-panel"
        className="flex flex-col w-full pb-3 h-screen bg-gray-950"
      >
        <div>
          {/* Navigation */}
          <Navigation
            optionSelected={optionSelected}
            setOptionSelected={setOptionSelected}
          />
        </div>
        {/* Main content area */}
        <div className="flex flex-row flex-1 min-h-0 px-2 pb-1 self-stretch">
          <div className="md:flex-[0.30] rounded-lg w-full max-w-full h-full max-h-full">
            <ChatOption
              pendingFriendRequests={pendingFriendRequests}
              friends={friends}
            />
          </div>
          <div className="md:flex-[0.70] rounded-lg w-full max-w-full h-full max-h-full">
            <ChatPanel />
          </div>
        </div>

        {/* {optionSelected.homeOption && (
              <>
                <div>
                  <HomeOption />
                </div>
              </>
            )}

            {optionSelected.settingsOption && (
              <>
                <div> Placeholder </div>
              </>
            )} */}
      </div>
    );
  }
}

export { MainPanel };
