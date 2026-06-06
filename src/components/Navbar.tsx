"use client";

import { useState } from "react";
import { Video, LogOut, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router";

function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navItems = [
    { id: "monitoring", label: "Live Monitoring" },
    { id: "recordings", label: "Recorded Events" },
    { id: "configuration", label: "System Configuration" },
  ];

  const isActive = (path: string, id: string) =>
    location.pathname === path ||
    (location.pathname === "/dashboard" && id === "monitoring");

  return (
    <nav className="bg-slate-900 border-b border-slate-800">
      <div className="mx-auto max-w-[1600px] px-3 sm:px-6">
        <div className="flex h-14 items-center justify-between">

          {/* LEFT - LOGO */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded border border-blue-500/50 bg-blue-500/10">
              <Video className="h-4 w-4 text-blue-400" />
            </div>

            <div className="text-xs sm:text-sm text-slate-200">
              CCTV Monitoring System
            </div>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const path = `/dashboard/${item.id}`;

              return (
                <Link
                  key={item.id}
                  to={path}
                  className={`px-3 lg:px-4 py-2 text-xs lg:text-sm border-b-2 transition-all ${
                    isActive(path, item.id)
                      ? "text-blue-400 border-blue-400 bg-slate-800/50"
                      : "text-slate-400 border-transparent hover:text-slate-200 hover:border-slate-600"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-3 sm:gap-4 text-xs text-slate-400">

            <div className="hidden sm:flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span>Online</span>
            </div>

            <Link
              to="/"
              className="hidden sm:flex items-center gap-2 hover:text-slate-200"
            >
              <LogOut className="h-4 w-4" />
              Exit
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-slate-300"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden border-t border-slate-800 bg-slate-900">
            <div className="flex flex-col gap-1 py-2">

              {navItems.map((item) => {
                const path = `/dashboard/${item.id}`;

                return (
                  <Link
                    key={item.id}
                    to={path}
                    onClick={() => setOpen(false)}
                    className={`px-4 py-2 text-sm ${
                      isActive(path, item.id)
                        ? "text-blue-400 bg-slate-800"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-slate-200"
              >
                <LogOut className="h-4 w-4" />
                Exit
              </Link>

            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;