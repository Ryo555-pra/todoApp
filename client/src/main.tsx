// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./App";
import Home from "./pages/Home";
import Todos from "./pages/Todos";
import CalendarPage from "./pages/Calendar";
import Integrations from "./pages/Integrations";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* ← これが重要！ */}
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="todos" element={<Todos />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="integrations" element={<Integrations />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
