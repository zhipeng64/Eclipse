import { Routes, Route } from "react-router-dom";
import LandingPage from "./Lobby/LandingPage.jsx";
import { ChatPanel } from "./Authenticated/ChatPanel";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dev" element={<ChatPanel />} />
    </Routes>
  );
}
