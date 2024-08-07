import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./components/ThemeContext/ThemeContext.jsx";
import { TaskProvider } from "./components/TasksContext/TasksContext.jsx";
import { SettingsContextProvider } from "./components/SettingsContext/SettingsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SettingsContextProvider>
    <ThemeProvider>
      <TaskProvider>
      <App />
      </TaskProvider>
    </ThemeProvider>
    </SettingsContextProvider>
  </React.StrictMode>
);
