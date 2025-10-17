import React from "react";
import { TriangleAlert } from "lucide-react";
type Props = {
  id: string;
  type: "email" | "password" | "text";
  onChange: (val: string) => void;
  placeHolder?: string;
  label?: string;
  disabled?: boolean;
  hidden?: boolean;
  errorMessage?: string;
  name: string;
  value: string;
};

export default function Input({
  id,
  type = "text",
  name,
  value,
  onChange,
  placeHolder = "",
  label = "",
  disabled = false,
  hidden = false,
  errorMessage = undefined,
}: Props) {
  return (
    <div
      className={`${
        hidden ? "hidden" : "flex flex-col gap-1 w-full p-4  min-h-24 "
      }`}
    >
      <label
        htmlFor={id}
        className="font-medium flex justify-between items-center h-12"
      >
        <span className="mr-2">{label}</span>
        {errorMessage && (
          <span className="text-sm font-light text-red-600 flex gap-2  justify-center items-center">
            <TriangleAlert color="red" size={18} className="animate-blink" />
            <span>{errorMessage}</span>
          </span>
        )}
      </label>
      <input
        name={name}
        value={value}
        id={id}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeHolder}
        className={`border-1 ${
          errorMessage ? "border-red-600" : "border-gray-200"
        } rounded-lg p-2 focus:outline-amber-300`}
        disabled={disabled}
      />
    </div>
  );
}
