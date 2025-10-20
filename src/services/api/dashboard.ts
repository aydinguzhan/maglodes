import type {
  ScheduledTransferItem,
  ScheduledTransfersResponse,
} from "../../utils/types";
import utils from "../../utils/utils";
import Client from "./client";
import moment from "moment";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default class DashboardService {
  private client: Client;

  constructor(token?: string) {
    this.client = new Client(BASE_URL, token);
  }

  async getSummary() {
    return await this.client.get("/financial/summary");
  }

  async getWorkingCapital() {
    const capital: any = await this.client.get("/financial/working-capital");

    const { totalIncome, totalExpense, netBalance } = capital.data.summary;
    const { currency } = capital.data;

    const formattedData = {
      ...capital,
      summary: {
        ...capital.data.summary,
        incomeFormat: utils.moneyFormatter(totalIncome, currency),
        expenseFormat: utils.moneyFormatter(totalExpense, currency),
        netFormat: utils.moneyFormatter(netBalance, currency),
      },
    };

    return formattedData;
  }

  async getWallet() {
    return await this.client.get("/financial/wallet");
  }
  async getRecentTransactions() {
    const data: any = await this.client.get("/financial/transactions/recent");

    const transactions = data?.data?.transactions ?? [];

    const formattedTransactions = transactions.map((transaction: any) => ({
      ...transaction,
      date: moment(transaction?.date).format("DD/MM/YYYY - HH:mm"),
      amountFormat: utils.moneyFormatter(
        transaction?.amount,
        transaction?.currency
      ),
    }));

    return {
      ...data,
      data: {
        ...data.data,
        transactions: formattedTransactions,
      },
    };
  }

  async getScheduledTransfers() {
    const res = (await this.client.get(
      "/financial/transfers/scheduled"
    )) as any;
    const { transfers } = res?.data;
    transfers.forEach((transfer: any) => {
      transfer.date = moment(transfer?.date).format("dd/mm/YYYY-HH:mm");
      transfer.amountFormat = [transfer?.amount, transfer?.currency].join("");
    });
    return res;
  }
}
