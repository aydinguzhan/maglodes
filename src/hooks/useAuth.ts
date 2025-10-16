import { useMutation } from "@tanstack/react-query";
import AuthService from "../services/api/auth";
import { toast } from "react-toastify";

export const useLogin = () => {
  const authService = new AuthService();
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      toast.success(data.message || "Login successful!");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Login failed");
    },
  });
};
