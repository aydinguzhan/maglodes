import { useState } from "react";
import TableHeader from "./TableHeader";
import { useTranslation } from "react-i18next";

export type ScheduledTransferRow = {
  id: string;
  image: string;
  name: string;
  type: string;
  business?: string;
  amount: number | string;
  amountFormat?: string;
  date: string;
};

type Props = {
  labels: string[];
  tableRows?: ScheduledTransferRow[];
  title: string;
  type?: "basic" | "moduler";
};

export default function TableBody({
  labels,
  tableRows = [],
  title,
  type = "moduler",
}: Props) {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(tableRows.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableRows.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="overflow-x-auto border-1 border-gray-100 rounded-xl p-3">
      <TableHeader title={title} />

      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-50 border border-gray-50">
            {labels.map((label, index) => (
              <th
                key={label + index}
                className="text-left font-medium text-gray-500 px-4 py-2"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {currentRows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-2">
                <div className="flex items-center gap-3 text-sm">
                  <img
                    src={row.image}
                    alt={row.name}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <span className="flex flex-col">
                    <span className="font-medium text-gray-700">
                      {row.name}
                    </span>
                    <span className="font-medium text-xs text-gray-300">
                      {row.date ?? row.business}
                    </span>
                  </span>
                </div>
              </td>

              {type === "moduler" && <td className="px-4 py-2">{row.type}</td>}
              <td className="px-4 py-2">{row?.amountFormat ?? row.amount}</td>
              <td className="px-4 py-2">
                {type === "moduler" ? row.date : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          {t("LABEL_PREV")}
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded ${
              page === currentPage
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          {t("LABEL_NEXT")}
        </button>
      </div>
    </div>
  );
}
