import { Navigation } from "./Navigation";
import { ChatOption } from "./ChatOption";
import { ChatPanel } from "./ChatPanel";
import { useAuthenticationChecks } from "../utils/customHooks";
import { useState } from "react";
import { HomeOption } from "./HomeOption";

function MainPanel() {
  const { isLoading, isAuthenticated } = useAuthenticationChecks();
  const [optionSelected, setOptionSelected] = useState({
    // homeOption: false,
    chatOption: true,
    settingsOption: false,
  });
  const [chatPanelSelectionState, setChatPanelSelectionState] = useState(null);

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
        <div className="flex flex-col md:flex-row grow px-2 pb-1 self-stretch gap-2">
          <div className="md:flex-[0.40] rounded-lg min-w-[220px] max-w-full">
            <ChatOption />
          </div>
          <div className="md:flex-[0.60] rounded-lg min-w-[260px] max-w-full">
            <ChatPanel chatPanelSelectionState={chatPanelSelectionState} />
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
