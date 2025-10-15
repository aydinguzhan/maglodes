import React from "react";
import TableHeader from "./TableHeader";

type ITableRow = {
  id: string;
  imgUrl: string; // yeni alan
  name: string;
  type: string;
  business: string;
  amount: string;
  date: string;
};

type Props = {
  labels: string[];
  tableRows: ITableRow[];
  title: string;
  type?: "basic" | "moduler";
};

export default function TableBody({
  labels,
  tableRows,
  title,
  type = "moduler",
}: Props) {
  return (
    <div className="overflow-x-auto  border-1 border-gray-100 rounded-xl p-3">
      <TableHeader title={title} />

      <table className="min-w-full ">
        <thead>
          <tr className="bg-gray-50 border border-gray-50">
            {labels.map((label) => (
              <th
                key={label}
                className="text-left font-medium text-gray-500 px-4 py-2"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tableRows.map((row) => (
            <tr key={row.id} className=" hover:bg-gray-50 transition-colors">
              <td className="px-4 py-2">
                <div className="flex items-center gap-3 text-sm">
                  <img
                    src={row.imgUrl}
                    alt={row.name}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <span className="flex flex-col">
                    <span className="font-medium  text-gray-700">
                      {row.name}
                    </span>

                    <span className="font-medium text-xs text-gray-300">
                      {type === "basic" ? row.date : row.business}
                    </span>
                  </span>
                </div>
              </td>

              <td className="px-4 py-2">{row.type && row.type}</td>
              <td className="px-4 py-2">{row.amount && row.amount}</td>
              <td className="px-4 py-2">
                {row.date && type === "moduler" && row.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
