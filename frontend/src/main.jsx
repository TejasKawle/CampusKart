import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import SmoothScroll from "./SmoothScroll.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SmoothScroll>
      <AuthProvider>
        <App />
      </AuthProvider>
    </SmoothScroll>
  </StrictMode>
);
