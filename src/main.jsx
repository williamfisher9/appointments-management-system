import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./components/ThemeContext/ThemeContext.jsx";
import { SettingsContextProvider } from "./components/SettingsContext/SettingsContext.jsx";
import { AppointmentsProvider } from "./components/AppointmentsContext/AppointmentsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SettingsContextProvider>
    <ThemeProvider>
      <AppointmentsProvider>
      <App />
      </AppointmentsProvider>
    </ThemeProvider>
    </SettingsContextProvider>
  </React.StrictMode>
);
