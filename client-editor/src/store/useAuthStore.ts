import { create } from "zustand";
import { queryClient } from "../queryClient";

type AuthState = {
  accessToken: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  setToken: (token: string) => set({ accessToken: token }),
  clearToken: () => set({ accessToken: null }),
}));

export const handleGlobalLogout = () => {
  useAuthStore.getState().clearToken();
  queryClient.clear();
  window.location.replace("/login");
};
