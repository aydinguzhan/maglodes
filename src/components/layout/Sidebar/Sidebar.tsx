import React, { useState } from "react";
import MenuItem from "./partical/MenuItem";
import {
  Home,
  Settings,
  User,
  Menu,
  X,
  LogOut,
  MessageCircleQuestion,
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    {
      icon: <Home className="w-5 h-5 text-gray-700" />,
      label: "Dashboard",
      _onClick: () => {},
    },
    {
      icon: <Settings className="w-5 h-5 text-gray-700" />,
      label: "Ayarlar",
      _onClick: () => {},
    },
    {
      icon: <User className="w-5 h-5 text-gray-700" />,
      label: "Profil",
      _onClick: () => {},
    },
  ];

  const authItems = [
    {
      icon: <LogOut className="w-5 h-5 text-gray-700" />,
      label: "Logout",
      _onClick: () => {},
    },
    {
      icon: <MessageCircleQuestion className="w-5 h-5 text-gray-700" />,
      label: "Help",
      _onClick: () => {},
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-gray-100 transition-all duration-300 flex flex-col p-4 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 mb-4 mx-auto flex justify-center items-center rounded hover:bg-gray-200 transition-colors"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Menü öğeleri */}
      <div className="flex-1 flex flex-col justify-between overflow-y-auto">
        <nav className="flex flex-col gap-3">
          {menuItems.map((item) => (
            <MenuItem
              key={item.label}
              Icon={item.icon}
              isOpen={isOpen}
              _onClick={item._onClick}
              label={item.label}
            />
          ))}
        </nav>

        {/* Alt menu (logout/help) */}
        <div className="flex flex-col gap-3 mt-4">
          {authItems.map((item) => (
            <MenuItem
              key={item.label}
              Icon={item.icon}
              isOpen={isOpen}
              _onClick={item._onClick}
              label={item.label}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
