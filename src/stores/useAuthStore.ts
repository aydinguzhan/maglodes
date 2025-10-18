import { create } from "zustand";
import type { User } from "../utils/types";
import utils from "../utils/utils";

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: utils.getToken() || null,
  user: null,

  setAuth: (token: string, user: User) => {
    utils.setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ token, user });
  },

  logout: () => {
    utils.removeToken();
    localStorage.removeItem("user");
    set({ token: null, user: null });
  },

  initialize: () => {
    const token = utils.getToken();
    const userData = localStorage.getItem("user");
    const user = userData ? (JSON.parse(userData) as User) : null;
    set({ token, user });
  },
}));
