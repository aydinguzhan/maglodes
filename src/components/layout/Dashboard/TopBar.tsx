import React, { useState } from "react";
import Text from "../../global/Text/Text";
import { Search, Bell, ChevronDown } from "lucide-react";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useTranslation } from "react-i18next";
import utils from "../../../utils/utils";

type Props = {
  pageName: string;
  selectLang: string;
  setSelectLang: React.Dispatch<React.SetStateAction<string>>;
};

export default function TopBar({ pageName, selectLang, setSelectLang }: Props) {
  const { user } = useAuthStore();
  const { i18n } = useTranslation();
  return (
    <div className="w-full flex justify-between   border-b-1 border-gray-50  h-10">
      <Text color="black" label={pageName} size="xl" />

      <div className="flex justify-center items-center px-4 gap-5">
        <div className="flex gap-2 border-1 rounded-md border-gray-300 ">
          <button
            className={`p-1 ${
              selectLang === "en" &&
              "bg-lime-500  rounded-sm text-white transition-all"
            }`}
            onClick={() => utils.changeLan("en", () => setSelectLang("en"))}
          >
            EN
          </button>
          <button
            className={`p-1 ${
              selectLang === "tr" &&
              "bg-lime-500  rounded-sm text-white transition-all "
            }`}
            onClick={() => utils.changeLan("tr", () => setSelectLang("tr"))}
          >
            TR
          </button>
        </div>
        <Search color="gray" />
        <Bell color="gray" />
        <span className="flex justify-center items-center gap-4 font-semibold">
          <img
            src={"https://randomuser.me/api/portraits/men/32.jpg"}
            alt={"profile"}
            className="w-10 h-10 object-cover rounded-full"
          />
          <span className="flex justify-center items-center gap-2">
            <span>{user?.fullName}</span>
            <ChevronDown size={18} color="black" />
          </span>
        </span>
      </div>
    </div>
  );
}
