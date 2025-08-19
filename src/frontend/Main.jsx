// Root (entry point of React to HTML)
import { StrictMode } from "react";
import ReactDOM from "react-dom/client"; // Imports React DOM for web rendering
import { BrowserRouter } from "react-router-dom"; // Imports React Router for routing
import "@fontsource/orbitron/400.css";
import "@fontsource/electrolize/400.css"; // Specify weight
import App from "./App";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
