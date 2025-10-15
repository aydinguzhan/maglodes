import React from "react";
import TableBody from "./Components/TableBody";
type ITableRow = {
  id: string;
  imgUrl: string;
  name: string;
  type: string;
  business: string;
  amount: string;
  date: string;
};

type Props = {
  title: string;
  tableHeader: string[];
  tableRow: any[];
  type?: "basic" | "moduler";
};

export default function Table({ tableHeader, tableRow, title, type }: Props) {
  return (
    <TableBody
      labels={tableHeader}
      tableRows={tableRow}
      title={title}
      type={type}
    />
  );
}
