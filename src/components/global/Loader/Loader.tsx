import React from "react";

type Props = {
  size?: string;
};

export default function Loader({ size = "6" }: Props) {
  return (
    <div
      className={`${"w-" + size} ${
        "h-" + size
      } border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin`}
    ></div>
  );
}
