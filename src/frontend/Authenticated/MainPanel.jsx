import { Navigation } from "./Navigation";
import { ChatOption } from "./ChatOption";
import { ChatPanel } from "./ChatPanel";
import { useAuthenticationChecks } from "../utils/customHooks";
import { useContext, useState, useEffect } from "react";
import SocketContext from "../Context/Socket.jsx";
import { HomeOption } from "./HomeOption";

function MainPanel() {
  const { isLoading, isAuthenticated } = useAuthenticationChecks();
  // Access socket context for real-time updates
  const { pendingFriendRequests, friends, selectedFriend } =
    useContext(SocketContext);

  // Back button for mobile screen
  const [isBackButtonVisible, setIsBackButtonVisible] = useState(false);

  const [optionSelected, setOptionSelected] = useState({
    // homeOption: false,
    chatOption: true,
    settingsOption: false,
  });

  const toggleBackButton = () => {
    setIsBackButtonVisible(!isBackButtonVisible);
  };

  // Show back button if a friend is selected (for mobile view)
  useEffect(() => {
    if (selectedFriend) {
      toggleBackButton();
    }
  }, [selectedFriend]);
  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return (
      <div
        id="main-panel"
        className="flex flex-row w-full h-dvh bg-[oklch(0.08_0_0)]"
      >
        <div className="w-auto flex flex-col lg:m-2 opac-shadow rounded-lg">
          <Navigation
            optionSelected={optionSelected}
            setOptionSelected={setOptionSelected}
          />
        </div>
        {/* Main content area */}
        <div className="flex flex-row flex-1">
          <div
            className={`rounded-lg flex-1 sm:max-w-sm sm:block opac-shadow lg:m-2 ${
              isBackButtonVisible ? "hidden" : "block"
            }`}
          >
            <ChatOption
              pendingFriendRequests={pendingFriendRequests}
              friends={friends}
            />
          </div>
          <div
            className={`sm:block rounded-lg flex-1 opac-shadow lg:m-2 ${
              isBackButtonVisible ? "block" : "hidden"
            }`}
          >
            <ChatPanel toggleBackButton={toggleBackButton} />
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
