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
        className="flex flex-col w-full pb-3 h-screen layer-0"
      >
        <div>
          {/* Navigation */}
          <Navigation
            optionSelected={optionSelected}
            setOptionSelected={setOptionSelected}
          />
        </div>
        {/* Main content area */}
        <div className="flex flex-col md:flex-row flex-1 min-h-0 px-2 pb-1 self-stretch gap-2">
          <div className="md:flex-[0.40] rounded-lg min-w-[220px] max-w-full h-full max-h-full">
            <ChatOption
              pendingFriendRequests={pendingFriendRequests}
              friends={friends}
            />
          </div>
          <div className="md:flex-[0.60] rounded-lg min-w-[260px] max-w-full h-full max-h-full">
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
