import React from "react";

type Props = {
  onClick: Function;
  label: string;
  bgColor: "lime" | "gray" | "white";
};
const colorMap: Record<string, { bg: string; border: string }> = {
  lime: { bg: "bg-lime-300", border: "border-lime-300" },
  gray: { bg: "bg-gray-300", border: "border-gray-300" },
  white: { bg: "bg-white", border: "border-white" },
  // gray: "bg-gray-300",
  // white: "bg-white",
};
export default function Button({ label, onClick, bgColor }: Props) {
  return (
    <div
      className={`rounded-xl ${colorMap[bgColor].bg} ${colorMap[bgColor].border} w-full text-center p-2 my-2 hover:bg-gray-200 cursor-pointer`}
      onClick={() => onClick()}
    >
      <div className="font-semibold">{label}</div>
    </div>
  );
}
