// src/components/Sidebar.tsx
import { NavLink } from "react-router-dom";
import { Home, ListChecks, Calendar, Boxes } from "lucide-react";

export default function Sidebar() {
  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/todos", label: "ToDo一覧", icon: ListChecks },
    { to: "/calendar", label: "Calendar", icon: Calendar },
    { to: "/integrations", label: "外部アプリ", icon: Boxes },
  ];

  return (
    <aside className="sidebar" aria-label="アプリのサイドバー">
      <div className="brand">
        <Boxes size={16} />
        <span>todoApp</span>
      </div>

      <nav>
        <ul className="navlist">
          {navItems.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink to={to} end className="navlink">
                <Icon size={18} />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="tip">
        Tips: サイドバーは左固定、右側にページが表示されます。
      </div>
    </aside>
  );
}
