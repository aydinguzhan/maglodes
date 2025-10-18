import { create } from "zustand";

interface FinancialSummary {
  totalBalance: number;
  totalExpense: number;
  totalSavings: number;
}

interface DashboardState {
  summary: FinancialSummary | null;
  setSummary: (data: FinancialSummary) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  summary: null,
  setSummary: (data) => set({ summary: data }),
}));
