import React from "react";

type Props = {
  size: "xxxl" | "xxl" | "xl" | "lg" | "sm";
  color: "gray" | "black" | "white";
  label: string;
};

const sizeMap = {
  xxxl: "text-3xl",
  xxl: "text-2xl",
  xl: "text-xl",
  lg: "text-lg",
  sm: "text-sm",
};
const colorMap = {
  black: "text-black-400",
  gray: "text-gray-400",
  white: "text-white",
};

export default function Text({ color = "black", size, label }: Props) {
  return (
    <div className={`font-medium ${sizeMap[size]} ${colorMap[color]}`}>
      {label}
    </div>
  );
}
