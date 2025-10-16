import React, { type JSX } from "react";

type Props = {
  onClick: () => void;
  label: string | JSX.Element;
  bgColor: "lime" | "gray" | "white";
};
const colorMap: Record<string, { bg: string; border: string }> = {
  lime: { bg: "bg-lime-300", border: "border-lime-300" },
  gray: { bg: "bg-gray-300", border: "border-gray-300" },
  white: { bg: "bg-white", border: "border-gray-200" },
  // gray: "bg-gray-300",
  // white: "bg-white",
};
export default function Button({ label, onClick, bgColor }: Props) {
  return (
    <div
      className={`border-1 rounded-xl ${colorMap[bgColor].bg} ${colorMap[bgColor].border}  w-full text-center p-2 my-2 hover:bg-gray-100 cursor-pointer transition-all `}
      onClick={() => onClick()}
    >
      <div className="font-semibold">{label}</div>
    </div>
  );
}
