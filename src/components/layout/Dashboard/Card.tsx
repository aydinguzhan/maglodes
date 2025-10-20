import React from "react";
import Text from "../../global/Text/Text";
import { Wallet } from "lucide-react";

type Props = {
  bgColor?: "gray" | "black";
  data: any;
  currency?: string;
};

const colorMap = {
  black: "bg-gray-800 text-gray-100",
  gray: "bg-gray-200 text-gray-900",
};

export default function Card({ bgColor = "black", data }: Props) {
  console.log(data);
  return (
    <div
      className={`w-full min-h-[150px] flex items-center gap-4 p-4 rounded-2xl ${colorMap[bgColor]} shadow-lg `}
    >
      <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-gray-100/80 border border-white/40 shadow">
        <Wallet
          color={bgColor === "gray" ? "black" : "lime"}
          className="w-6 h-6"
        />
      </div>

      <div className="flex flex-col flex-1 justify-center gap-1">
        <Text color="gray" label="Total Balance" size="sm" />
        <Text
          color={bgColor === "gray" ? "black" : "gray"}
          label={data}
          size="xl"
        />
      </div>
    </div>
  );
}
