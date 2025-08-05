// Root (entry point of React to HTML)
import ReactDOM from "react-dom/client"; // Imports React DOM for web rendering
import App from "./App";
import { StrictMode } from "react";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
