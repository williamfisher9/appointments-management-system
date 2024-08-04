import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./components/ThemeContext/ThemeContext.jsx";
import { TaskProvider } from "./components/TasksContext/TasksContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <TaskProvider>
      <App />
      </TaskProvider>
    </ThemeProvider>
  </React.StrictMode>
);
