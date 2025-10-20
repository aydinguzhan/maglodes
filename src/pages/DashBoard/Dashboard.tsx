import React, { useEffect, useState } from "react";
import Card from "../../components/layout/Dashboard/Card";
import CreditCard from "../../components/layout/Dashboard/CreditCard";
import TopBar from "../../components/layout/Dashboard/TopBar";
import Chart from "../../components/layout/Chart/Chart";
import Table from "../../components/layout/Table/Table";
import Sidebar from "../../components/layout/Sidebar/Sidebar";
import { useAuthStore } from "../../stores/useAuthStore";
import DashboardService from "../../services/api/dashboard";
import type {
  ScheduledTransfersResponse,
  WalletCard,
  WorkingCapitalResponse,
} from "../../utils/types";
import Loader from "../../components/global/Loader/Loader";
import utils from "../../utils/utils";
import { ToastContainer } from "react-toastify";

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

type Props = {
  onLogout: () => void;
};

export default function Dashboard({ onLogout }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuthStore();
  const dashboardService = new DashboardService(token ?? undefined);
  const [wallets, setWallets] = useState<WalletCard[]>([]);
  const [transfers, setTransfers] = useState<ScheduledTransfersResponse>();
  const [workingCapitali, setWorkingCapital] =
    useState<WorkingCapitalResponse>();

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      try {
        setIsLoading(true);
        const [wallets, workingCapital, transfers] = await Promise.all([
          dashboardService.getWallet(),
          dashboardService.getWorkingCapital(),
          dashboardService.getScheduledTransfers(),
        ]);
        setWallets(wallets.data.cards as WalletCard[]);
        setWorkingCapital(workingCapital as WorkingCapitalResponse);
        setTransfers(transfers as ScheduledTransfersResponse);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return (
    <>
      <ToastContainer />
      <Loader visible={isLoading} size="32" />
      <Sidebar onLogout={onLogout} />
      <div className="flex mx-15">
        <main className="flex-1 bg-white p-6 flex flex-col">
          <TopBar pageName="Dashboard" />

          <div className="flex flex-1 gap-6 mt-4 h-full">
            <div className="flex-2/3 flex flex-col gap-6 h-full">
              <div className="flex gap-4 ">
                <Card
                  bgColor="black"
                  data={[
                    workingCapitali?.data?.summary.netBalance,
                    workingCapitali?.data?.currency,
                  ].join(" ")}
                />
                <Card
                  bgColor="gray"
                  data={[
                    workingCapitali?.data?.summary.totalExpense,
                    workingCapitali?.data?.currency,
                  ].join(" ")}
                />
                <Card
                  bgColor="gray"
                  data={[
                    workingCapitali?.data?.summary.totalIncome,
                    workingCapitali?.data?.currency,
                  ].join(" ")}
                />
              </div>

              <div className="flex-1 bg-gray-50 rounded-2xl p-4 ">
                <Chart data={workingCapitali?.data?.data} />
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
                    <CreditCard
                      bgColor="to-zinc-900"
                      blur={true}
                      cardInfo={wallets[0]}
                    />
                  </div>

                  <div className="relative z-0">
                    <CreditCard
                      bgColor="to-zinc-900"
                      blur={false}
                      cardInfo={wallets[1]}
                    />
                  </div>
                </div>
              </div>
              <div>
                <Table
                  tableHeader={["", ""]}
                  tableRow={(transfers?.data?.transfers || []).map((t) => ({
                    id: t.id ?? "",
                    image: (t as any).image ?? "",
                    name:
                      (t as any).name ??
                      (t as any).title ??
                      "Scheduled Transfer",
                    type: (t as any).type ?? "scheduled",
                    business: (t as any).business,
                    amount: (t as any).amount ?? "",
                    date: (t as any).date ?? "",
                  }))}
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
