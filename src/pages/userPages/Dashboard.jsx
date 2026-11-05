import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect
} from "react";
import { useNavigate, useLocation, useSearchParams, Link } from "react-router-dom";



import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Search,
  CalendarDays,
  Zap,
  ClipboardList,
  CreditCard,
  Map,
  Wallet,
  Gift,
  ShieldCheck,
  User,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Find Auto", path: "/find-auto", icon: Search },
  { name: "Scheduled Booking", path: "/scheduled-booking", icon: CalendarDays },
  { name: "Instant Booking", path: "/instant-booking", icon: Zap },
  { name: "My Bookings", path: "/my-bookings", icon: ClipboardList },
  { name: "Digital Pass", path: "/digital-pass", icon: CreditCard },
  { name: "My Journey", path: "/my-journey", icon: Map },
  { name: "Wallet", path: "/wallet", icon: Wallet },
  { name: "Rewards", path: "/rewards", icon: Gift },
  { name: "Safety Centre", path: "/safety-centre", icon: ShieldCheck },
  { name: "Profile", path: "/profile", icon: User },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-[#F7F8F5] lg:flex">

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-60
          bg-[#26372F] text-white
          flex flex-col
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:sticky lg:top-0 lg:translate-x-0
          lg:shrink-0 lg:self-start
        `}
      >

        {/* LOGO */}
        <div className="h-[85px] px-5 flex items-center gap-3 border-b border-white/10 shrink-0">

          <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center">
            <span className="text-[#26372F] font-extrabold text-xl">
              V
            </span>
          </div>

          <div>
            <h1 className="text-xl font-bold italic tracking-wide">
              VeyraPass
            </h1>
            <p className="text-[10px] text-[#96B6A1] tracking-widest">
              SHARE · RIDE · GO
            </p>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden"
          >
            <X size={21} />
          </button>

        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/dashboard"}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl
                  text-sm font-semibold transition-all duration-200
                  ${
                    isActive
                      ? "bg-[#96B6A1] text-[#26372F]"
                      : "text-gray-200 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon size={19} strokeWidth={1.8} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}

        </nav>

        {/* USER PROFILE */}
        <div className="border-t border-white/10 p-4 shrink-0">

          <div className="flex items-center gap-3 mb-4">

            <div className="w-10 h-10 rounded-xl bg-[#96B6A1] text-[#26372F] flex items-center justify-center font-bold">
              U
            </div>

            <div>
              <p className="text-sm font-semibold">User</p>
              <p className="text-xs text-[#96B6A1]">Passenger</p>
            </div>

          </div>

          <button className="w-full flex items-center justify-center gap-2 border border-red-400/40 text-red-300 hover:bg-red-500/10 rounded-xl py-2.5 text-sm transition">
            <LogOut size={17} />
            Logout
          </button>

        </div>

      </aside>

      {/* RIGHT SIDE - EMPTY DASHBOARD */}
      <main className="flex-1 min-w-0 min-h-screen">

        {/* MOBILE MENU BUTTON */}
        <div className="lg:hidden p-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-[#26372F] text-white p-2.5 rounded-lg"
          >
            <Menu size={22} />
          </button>
        </div>

      </main>

    </div>
  );
}
