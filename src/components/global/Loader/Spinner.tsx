import React from "react";

type Props = {
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
};

export default function Spinner({
  size = "sm",
  color = "text-white",
  className = "",
}: Props) {
  const sizeClasses =
    size === "sm"
      ? "w-4 h-4 border-2"
      : size === "md"
      ? "w-5 h-5 border-[3px]"
      : "w-6 h-6 border-4";

  return (
    <div
      className={`inline-block ${sizeClasses} border-t-transparent border-solid rounded-full animate-spin ${color} border-current ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}
