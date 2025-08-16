import React from "react";
import { NavLink } from "react-router-dom";
import { Home, ListChecks, Calendar, Boxes, Menu } from "lucide-react";

/**
 * Sidebar Component
 * - Tailwind CSS ベースのスタイル
 * - react-router-dom の NavLink でアクティブ表示
 * - モバイルではハンバーガーで開閉
 *
 * 使い方:
 * <Sidebar /> をレイアウト内で使用してください。
 * 例: <div className="flex"><Sidebar/><main>...</main></div>
 */
export default function Sidebar() {
  const [open, setOpen] = React.useState(true);

  // モバイル向け: 画面幅で初期状態を決める
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setOpen(window.innerWidth >= 1024); // lg 以上は開いた状態
    }
  }, []);

  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/todos", label: "ToDo一覧", icon: ListChecks },
    { to: "/calendar", label: "Calendar", icon: Calendar },
    { to: "/integrations", label: "外部アプリ", icon: Boxes },
  ];

  return (
    <aside
      className={
        "relative h-screen border-r bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60" +
        " shadow-sm"
      }
      aria-label="アプリのサイドバー"
    >
      {/* トグル（モバイル） */}
      <button
        type="button"
        aria-label={open ? "サイドバーを閉じる" : "サイドバーを開く"}
        onClick={() => setOpen((v) => !v)}
        className="lg:hidden absolute -right-4 top-3 z-20 rounded-full border bg-white p-2 shadow md:-right-5"
      >
        <Menu className="size-5" />
      </button>

      <div
        className={
          (open ? "w-64" : "w-16") +
          " group flex h-full flex-col transition-all duration-300 ease-in-out"
        }
      >
        {/* Brand */}
        <div className="flex items-center gap-2 p-4">
          <div className="grid size-8 place-items-center rounded-xl border shadow-sm">
            <Boxes className="size-4" />
          </div>
          <span
            className={
              "text-lg font-semibold tracking-tight" +
              (open ? " opacity-100" : " opacity-0 pointer-events-none hidden")
            }
          >
            todoApp
          </span>
        </div>

        {/* Nav */}
        <nav className="mt-2 flex-1 px-2">
          <ul className="space-y-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
                      isActive
                        ? "bg-gray-100 font-medium text-gray-900 shadow-inner"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    ].join(" ")
                  }
                >
                  <Icon className="size-5 shrink-0" />
                  <span
                    className={
                      open ? "whitespace-nowrap" : "pointer-events-none hidden"
                    }
                  >
                    {label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer mini-help */}
        <div className="p-3 text-[11px] text-gray-400">
          <div className={open ? "block" : "hidden"}>
            <p>Tips: サイドバーの幅はモバイルではボタンで切替できます。</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

/**
 * 参考: レイアウト例
 *
 * import Sidebar from "./Sidebar";
 * import { Outlet } from "react-router-dom";
 *
 * export function AppLayout() {
 *   return (
 *     <div className="flex min-h-screen">
 *       <Sidebar />
 *       <main className="flex-1 p-6">
 *         <Outlet />
 *       </main>
 *     </div>
 *   );
 * }
 */
