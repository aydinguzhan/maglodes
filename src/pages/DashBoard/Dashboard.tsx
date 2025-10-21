import { useEffect, useState } from "react";
import Card from "../../components/layout/Dashboard/Card";
import CreditCard from "../../components/layout/Dashboard/CreditCard";
import TopBar from "../../components/layout/Dashboard/TopBar";
import Chart from "../../components/layout/Chart/Chart";
import Table from "../../components/layout/Table/Table";
import Sidebar from "../../components/layout/Sidebar/Sidebar";
import { useAuthStore } from "../../stores/useAuthStore";
import DashboardService from "../../services/api/dashboard";
import type { WalletCard } from "../../utils/types";
import Loader from "../../components/global/Loader/Loader";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import utils from "../../utils/utils";

type Props = {
  onLogout: () => void;
};

export default function Dashboard({ onLogout }: Props) {
  const { t } = useTranslation();
  const [selectLang, setSelectLang] = useState("en");
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuthStore();
  const dashboardService = new DashboardService(token ?? undefined);
  const [wallets, setWallets] = useState<WalletCard[]>([]);
  const [workingCapital, setWorkingCapital] = useState<any>();
  const [scheduledList, setScheduledList] = useState<any>([]);
  const [recentTransactions, setRecentTransactions] = useState<any>([]);
  const tableHeaders = [
    t("LABEL_NAME_BUSSINESS"),
    t("LABEL_TYPE"),
    t("LABEL_AMOUNT"),
    t("LABEL_DATE"),
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      try {
        setIsLoading(true);
        const [wallets, workingCapital, transfers, recentTransactions] =
          (await Promise.all([
            dashboardService.getWallet(),
            dashboardService.getWorkingCapital(),
            dashboardService.getScheduledTransfers(),
            dashboardService.getRecentTransactions(),
          ])) as any;

        setWallets(wallets.data.cards as WalletCard[]);
        setWorkingCapital(workingCapital);
        setScheduledList(transfers.data.transfers);
        setRecentTransactions(recentTransactions.data.transactions);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);
  useEffect(() => {
    utils.changeLan("en");
  }, []);

  return (
    <>
      <ToastContainer />
      <Loader visible={isLoading} size="32" />

      <Sidebar onLogout={onLogout} />
      <div className="flex mx-15">
        <main className="flex-1 bg-white p-6 flex flex-col">
          <TopBar
            pageName="Dashboard"
            selectLang={selectLang}
            setSelectLang={setSelectLang}
          />

          <div className="flex flex-1 gap-6 mt-4 h-full">
            <div className="flex-2/3 flex flex-col gap-6 h-full">
              <div className="flex gap-4 ">
                <Card
                  label={t("LABEL_TOTAL_BALANCE")}
                  bgColor="black"
                  data={workingCapital?.summary?.netFormat}
                />
                <Card
                  label={t("LABEL_TOTAL_EXPENSE")}
                  bgColor="gray"
                  data={workingCapital?.summary?.expenseFormat}
                />
                <Card
                  label={t("LABEL_TOTAL_INCOME")}
                  bgColor="gray"
                  data={workingCapital?.summary?.incomeFormat}
                />
              </div>

              <div className="flex-1 bg-gray-50 rounded-2xl p-4 ">
                <Chart data={workingCapital?.data?.data} />
              </div>
              <div className="mt-6">
                <Table
                  tableHeader={tableHeaders}
                  tableRow={recentTransactions}
                  title={t("LABEL_RECENT_TRANSACTIONS")}
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
                  tableRow={scheduledList}
                  title={t("LABEL_SCHEDULED_TRANFER")}
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
