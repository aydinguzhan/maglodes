import React from "react";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

type Props = {
  title: string;
};

export default function TableHeader({ title }: Props) {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="font-semibold text-xl">{title}</div>
      <div className="font-medium text-green-600 text-md flex justify-end-safe items-center  hover:cursor-pointer gap-2">
        <span>{t("LABEL_VIEW_ALL")}</span>
        <ChevronRight size={18} />
      </div>
    </div>
  );
}
