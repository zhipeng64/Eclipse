import { Routes, Route } from "react-router-dom";
import LandingPage from "./Lobby/LandingPage.jsx";
import { ChatPanel } from "./Authenticated/ChatPanel";
import { ChatOption } from "./Authenticated/ChatOption.jsx";
import { HomeOption } from "./Authenticated/HomeOption.jsx";
import { MainPanel } from "./Authenticated/MainPanel.jsx";
import { SettingsOption } from "./Authenticated/SettingsOption.jsx";
import ProtectedProvider from "./Context/Providers/ProtectedProvider.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dev" element={<ChatPanel />} />
      <Route path="/chat" element={<ChatOption />} />
      <Route path="/home" element={<HomeOption />} />

      {/* A Route is a child route if it is nested within another Route component
      Here, two child routes exist. A component in parent route can render child 
      component only if Outlet is used*/}
      <Route element={<ProtectedProvider />}>
        <Route path="/main-lobby" element={<MainPanel />} />
        <Route path="/settings" element={<SettingsOption />} />
      </Route>
    </Routes>
  );
}
