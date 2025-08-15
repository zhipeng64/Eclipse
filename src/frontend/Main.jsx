// Root (entry point of React to HTML)
import { StrictMode } from "react";
import ReactDOM from "react-dom/client"; // Imports React DOM for web rendering
import { BrowserRouter } from "react-router-dom"; // Imports React Router for routing
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
