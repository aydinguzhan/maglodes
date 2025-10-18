import React from "react";

type Props = {
  size?: string; // Tailwind width için örn: "20", "32", ...
  visible: boolean; // loader'ı göstermek için
};

export default function Loader({ size = "20", visible }: Props) {
  if (!visible) return null; // görünür değilse render etme

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/30">
      <div
        className={`loader w-${size} h-1`}
        style={{ minWidth: "130px", height: "4px" }}
      ></div>
    </div>
  );
}
