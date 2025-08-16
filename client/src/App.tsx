// src/App.tsx
import "./App.css";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="app-shell">
      {" "}
      {/* 横2カラムの親 */}
      <Sidebar /> {/* 左カラム（固定幅） */}
      <main className="main">
        {" "}
        {/* 右カラム（残り全部） */}
        <Outlet />
      </main>
    </div>
  );
}
