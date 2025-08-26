import { Routes, Route } from "react-router-dom";
import LandingPage from "./Lobby/LandingPage.jsx";
import { ChatPanel } from "./Authenticated/ChatPanel";
import { ChatOption } from "./Authenticated/ChatOption.jsx";
import { HomeOption } from "./Authenticated/HomeOption.jsx";
import { MainPanel } from "./Authenticated/MainPanel.jsx";
import { SettingsOption } from "./Authenticated/SettingsOption.jsx";
import { AuthProvider } from "./Context/Providers/AuthProvider.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dev" element={<ChatPanel />} />
      <Route path="/chat" element={<ChatOption />} />
      <Route path="/home" element={<HomeOption />} />

      <Route element={<AuthProvider />}>
        <Route path="/main-lobby" element={<MainPanel />} />
        <Route path="/settings" element={<SettingsOption />} />
      </Route>
    </Routes>
  );
}
