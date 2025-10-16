import React from "react";

type Props = {
  id: string;
  type: "email" | "password" | "text";
  onChange: () => void;
  placeHolder?: string;
  label?: string;
};

export default function Input({
  id,
  type = "text",
  onChange,
  placeHolder = "",
  label = "",
}: Props) {
  return (
    <div className="flex flex-col gap-1 w-full p-1 ">
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        onChange={() => onChange()}
        placeholder={placeHolder}
        className="border-1 border-gray-200 rounded-lg p-2 focus:outline-amber-300"
      />
    </div>
  );
}
