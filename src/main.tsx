import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { SemesterContextProvider } from "./contexts/SemesterContext.tsx";
import "@fontsource/barlow";
import "@fontsource/barlow/400.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SemesterContextProvider>
      <App />
    </SemesterContextProvider>
  </React.StrictMode>
);
