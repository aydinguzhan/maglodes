import React from "react";
import Card from "../../components/layout/Dashboard/Card";
import CreditCard from "../../components/layout/Dashboard/CreditCard";
import TopBar from "../../components/layout/Dashboard/TopBar";
import Chart from "../../components/layout/Chart/Chart";
import Table from "../../components/layout/Table/Table";
import Sidebar from "../../components/layout/Sidebar/Sidebar";

const tableHeaders = ["NAME/BUSINESS", "TYPE", "AMOUNT", "DATE"];
const tableRow = [
  {
    id: "1",
    imgUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Iphone 13 Pro Max",
    business: "Apple",
    type: "mobile",
    amount: "$429",
    date: "14 Apr 2022",
  },
  {
    id: "2",
    imgUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Iphone 12 Pro Max",
    business: "Apple",
    type: "mobile",
    amount: "$329",
    date: "14 Apr 2022",
  },
];
const tableHeader1 = ["", ""];
const tableRow1 = [
  {
    id: "1",
    imgUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Iphone 13 Pro Max",
    amount: "$429",
    date: "14 Apr 2022",
  },
  {
    id: "2",
    imgUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Iphone 12 Pro Max",
    amount: "$329",
    date: "14 Apr 2022",
  },
];

export default function Dashboard() {
  return (
    <>
      <Sidebar />
      <div className="flex mx-15">
        <main className="flex-1 bg-white p-6 flex flex-col">
          <TopBar pageName="Dashboard" />

          <div className="flex flex-1 gap-6 mt-4 h-full">
            <div className="flex-2/3 flex flex-col gap-6 h-full">
              <div className="flex gap-4 ">
                <Card bgColor="black" />
                <Card bgColor="gray" />
                <Card bgColor="gray" />
              </div>

              <div className="flex-1 bg-gray-50 rounded-2xl p-4 ">
                <Chart />
              </div>
              <div className="mt-6">
                <Table
                  tableHeader={tableHeaders}
                  tableRow={tableRow}
                  title="Recent Transaction"
                />
              </div>
            </div>
            <div>
              <div className="h-100">
                <div className="relative flex justify-center items-center lg:col-span-2 ">
                  <div className="absolute top-35 z-10 opacity-80 scale-95">
                    <CreditCard bgColor="to-zinc-900" blur={true} />
                  </div>

                  <div className="relative z-0">
                    <CreditCard bgColor="to-zinc-900" blur={false} />
                  </div>
                </div>
              </div>
              <div>
                <Table
                  tableHeader={tableHeader1}
                  tableRow={tableRow1}
                  title="Scheduled Transfers"
                  type="basic"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
