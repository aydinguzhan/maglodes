export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;
};

export type User = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLoginAt: string;
  lastLoginIP: string;
  createdAt: string;
  updatedAt: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
  };
};

export type RegisteredUser = {
  id: string;
  fullName: string;
  email: string;
};

export type RegisterResponse = {
  success: boolean;
  message: string;
  data: RegisteredUser;
};
export type WalletCard = {
  id: string;
  name: string;
  type: "credit" | "debit" | string;
  cardNumber: string;
  bank: string;
  network: string;
  expiryMonth: number;
  expiryYear: number;
  color: string;
  isDefault: boolean;
};

export type WorkingCapitalDataItem = {
  month: string;
  income: number;
  expense: number;
  net: number;
};

export type WorkingCapitalSummary = {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
};

export type WorkingCapitalData = {
  period: string;
  currency: string;
  data: WorkingCapitalDataItem[];
  summary: WorkingCapitalSummary;
};

export type WorkingCapitalResponse = {
  success: boolean;
  message: string;
  data: WorkingCapitalData;
};

export type ScheduledTransferItem = {
  id: string;
  name: string;
  image: string;
  date: string; // ISO tarih string
  amount: number;
  currency: string;
  status: string;
};

export type ScheduledTransferSummary = {
  totalScheduledAmount: number;
  count: number;
};

export type ScheduledTransfersData = {
  transfers: ScheduledTransferItem[];
  summary: ScheduledTransferSummary;
};

export type ScheduledTransfersResponse = {
  success: boolean;
  message: string;
  data: ScheduledTransfersData;
};
