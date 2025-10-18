import React from "react";
import Text from "../../global/Text/Text";
import { Search, Bell, ChevronDown } from "lucide-react";
import { useAuthStore } from "../../../stores/useAuthStore";
type Props = {
  pageName: string;
};

export default function TopBar({ pageName }: Props) {
  const { user } = useAuthStore();
  return (
    <div className="w-full flex justify-between   border-b-1 border-gray-50  h-10">
      <Text color="black" label={pageName} size="xl" />
      <div className="flex justify-center items-center px-4 gap-5">
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
