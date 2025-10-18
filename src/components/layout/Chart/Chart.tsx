import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Props = { data: any };

export default function Chart({ data }: Props) {
  // const data = [
  //   {
  //     month: "Page A",
  //     expense: 4000,
  //     income: 2400,
  //     net: 2400,
  //   },
  //   {
  //     month: "Page B",
  //     expense: 3000,
  //     income: 1398,
  //     net: 2210,
  //   },
  //   {
  //     month: "Page C",
  //     expense: 2000,
  //     income: 9800,
  //     net: 2290,
  //   },
  //   {
  //     month: "Page D",
  //     expense: 2780,
  //     income: 3908,
  //     net: 2000,
  //   },
  //   {
  //     month: "Page E",
  //     expense: 1890,
  //     income: 4800,
  //     net: 2181,
  //   },
  //   {
  //     month: "Page F",
  //     expense: 2390,
  //     income: 3800,
  //     net: 2500,
  //   },
  //   {
  //     month: "Page G",
  //     expense: 3490,
  //     income: 4300,
  //     net: 2100,
  //   },
  // ];
  return (
    <div className="w-full h-80 ">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="expense" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
