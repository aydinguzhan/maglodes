import React from "react";
import { ChevronRight } from "lucide-react";

type Props = {
  title: string;
};

export default function TableHeader({ title }: Props) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="font-semibold text-2xl">{title}</div>
      <div className="font-medium text-green-600 text-md flex justify-end-safe items-center  hover:cursor-pointer gap-2">
        <span>View All </span>
        <ChevronRight size={18} />
      </div>
    </div>
  );
}
