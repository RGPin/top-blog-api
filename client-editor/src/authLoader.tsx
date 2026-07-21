import { redirect } from "react-router";
import { refreshToken } from "./api/refreshToken";
import { useAuthStore } from "./store/useAuthStore";

export const authLoader = async () => {
  try {
    await refreshToken();
  } catch {
    useAuthStore.getState().clearToken();
    throw redirect("/login");
  }

  // check if accessToken not null for protected routes
  return null;
};
