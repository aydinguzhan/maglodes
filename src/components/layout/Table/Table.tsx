import React from "react";
import TableBody, { type ScheduledTransferRow } from "./Components/TableBody";

type Props = {
  title: string;
  tableHeader: string[];
  tableRow?: ScheduledTransferRow[] | any;
  type?: "basic" | "moduler";
};

export default function Table({
  tableHeader,
  tableRow = [],
  title,
  type,
}: Props) {
  console.log("Table Row:", tableRow);
  return (
    <TableBody
      labels={tableHeader}
      tableRows={tableRow}
      title={title}
      type={type}
    />
  );
}
