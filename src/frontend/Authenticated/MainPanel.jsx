import { Navigation } from "./Navigation";
import { ChatOption } from "./ChatOption";
import { ChatPanel } from "./ChatPanel";
import { useAuthenticationChecks } from "../utils/customHooks";
import { useState } from "react";
import { HomeOption } from "./HomeOption";

function MainPanel() {
  const { isLoading, isAuthenticated } = useAuthenticationChecks();
  const [optionSelected, setOptionSelected] = useState({
    homeOption: false,
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
        {/* Navigation */}
        <Navigation
          optionSelected={optionSelected}
          setOptionSelected={setOptionSelected}
        />

        {/* Main content area */}
        {optionSelected.chatOption && (
          <div className="flex grow gap-1 pl-40 self-start justify-center">
            <div className="w-120 shrink-0">
              <ChatOption />
            </div>
            <div className="">
              <ChatPanel />
            </div>
          </div>
        )}

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
