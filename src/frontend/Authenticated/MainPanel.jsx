import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/Auth";
import { Navigation } from "./Navigation";
import { ChatOption } from "./ChatOption";
import { ChatPanel } from "./ChatPanel";

function MainPanel() {
  const navigate = useNavigate();
  const authenticationContext = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Sets user authentication status
  useEffect(() => {
    const authHandler = async () => {
      console.log("preparing auth status...");
      const authStatus = await authenticationContext();
      console.log("auth status: ", authStatus);
      setIsAuthenticated(authStatus);
      setIsLoading(false);

      if (!authStatus) {
        navigate("/");
      }
    };
    authHandler();
  }, []);

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
