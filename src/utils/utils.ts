import type { AxiosError } from "axios";
import { toast, type ToastOptions } from "react-toastify";
import i18n from "../i18n";

class Utils {
  setToken = (token: string) => {
    localStorage.setItem("accessToken", token);
  };

  getToken = (): string | null => {
    return localStorage.getItem("accessToken");
  };

  removeToken = () => {
    localStorage.removeItem("accessToken");
  };

  toastMessageError(err: AxiosError) {
    const baseOptions: ToastOptions = {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    };

    const data = err.response?.data as { message?: string } | undefined;
    const message = data?.message ?? err.message ?? err.message;
    toast.error(message, baseOptions);
  }
  toastMessageSuccess(res: any): void {
    const baseOptions: ToastOptions = {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: {
        backgroundColor: "#16a34a",
        color: "#fff",
        fontWeight: "500",
      },
    };

    toast.success(res?.message ?? res, baseOptions);
  }
  moneyFormatter(amount: number, currency: string = "TRY"): string {
    const localeMap: Record<string, string> = {
      TRY: "tr-TR",
      USD: "en-US",
    };

    const locale = localeMap[currency] || "tr-TRY";

    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }
  changeLan(lng: string, callBack?: Function) {
    i18n.changeLanguage(lng);
    callBack && callBack(lng);
  }
}

export default new Utils();
