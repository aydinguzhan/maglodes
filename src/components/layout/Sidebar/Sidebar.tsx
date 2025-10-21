import { useState } from "react";
import MenuItem from "./partical/MenuItem";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Settings,
  User,
  Menu,
  X,
  LogOut,
  MessageCircleQuestion,
} from "lucide-react";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useTranslation } from "react-i18next";

type Props = {
  onLogout: () => void;
};
export default function Sidebar({}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuthStore();
  const { t } = useTranslation();

  const navigate = useNavigate();
  const menuItems = [
    {
      icon: <Home className="w-5 h-5 text-gray-700" />,
      label: t("LABEL_DASHBOARD"),
      _onClick: () => {},
    },
    {
      icon: <Settings className="w-5 h-5 text-gray-700" />,
      label: t("LABEL_SETTINGS"),
      _onClick: () => {},
    },
    {
      icon: <User className="w-5 h-5 text-gray-700" />,
      label: t("LABEL_PROFIL"),
      _onClick: () => {},
    },
  ];

  const authItems = [
    {
      icon: <LogOut className="w-5 h-5 text-gray-700" />,
      label: t("LABEL_LOGOUT"),
      _onClick: () => {
        logout();
        navigate("/auth");
      },
    },
    {
      icon: <MessageCircleQuestion className="w-5 h-5 text-gray-700" />,
      label: t("LABEL_HELP"),
      _onClick: () => {},
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 min-h-screen  bg-gray-100 transition-all duration-300 flex flex-col p-4 z-10 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 mb-4 mx-auto flex justify-center items-center rounded hover:bg-gray-200 transition-colors"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

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

        <div className="flex flex-col gap-3 mt-4">
          {authItems.map((item, index) => (
            <MenuItem
              key={`auth-${index}-${item.label}`}
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
