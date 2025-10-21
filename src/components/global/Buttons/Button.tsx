import React, { type JSX } from "react";

type Props = {
  onClick?: () => void;
  label: string | JSX.Element;
  bgColor: "lime" | "gray" | "white";
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
};

const colorMap: Record<
  "lime" | "gray" | "white",
  {
    bg: string;
    hover: string;
    border: string;
    text: string;
    disabledBg: string;
    disabledText: string;
  }
> = {
  lime: {
    bg: "bg-lime-300",
    hover: "hover:bg-lime-400",
    border: "border-lime-300",
    text: "text-black",
    disabledBg: "bg-gray-300",
    disabledText: "text-gray-500",
  },
  gray: {
    bg: "bg-gray-300",
    hover: "hover:bg-gray-400",
    border: "border-gray-300",
    text: "text-black",
    disabledBg: "bg-gray-300",
    disabledText: "text-gray-500",
  },
  white: {
    bg: "bg-white",
    hover: "hover:bg-gray-100",
    border: "border-gray-200",
    text: "text-black",
    disabledBg: "bg-gray-300",
    disabledText: "text-gray-500",
  },
};

export default function Button({
  label,
  onClick,
  bgColor,
  type = "button",
  disabled = false,
}: Props) {
  const colors = colorMap[bgColor];

  return (
    <button
      type={type}
      onClick={onClick && onClick}
      disabled={disabled}
      className={`
        w-full p-2 my-2 rounded-xl font-semibold text-center border 
        ${disabled ? colors.disabledBg : colors.bg}
        ${disabled ? colors.disabledText : colors.text}
        ${!disabled ? colors.hover : ""}
        ${colors.border}
        transition-all
        disabled:cursor-not-allowed
      `}
    >
      <span className="m-auto text-white">{label}</span>
    </button>
  );
}
