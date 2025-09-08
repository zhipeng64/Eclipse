import { Navigation } from "./Navigation";
import { ChatOption } from "./ChatOption";
import { ChatPanel } from "./ChatPanel";
import { useAuthenticationChecks } from "../utils/customHooks";

function MainPanel() {
  const { isLoading, isAuthenticated } = useAuthenticationChecks();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return (
      <div
        id="main-panel"
        className="flex flex-col w-full h-screen primary-background"
      >
        {/* Navigation */}
        <Navigation />

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
}

export { MainPanel };
