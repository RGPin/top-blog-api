import { useAuthStore } from "../store/useAuthStore";

let refreshPromise: Promise<void> | null = null;

export const refreshToken = async () => {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "include",
  })
    .then(async (res) => {
      if (!res.ok) {
        useAuthStore.getState().clearToken();
        throw new Error();
      }
      const data = await res.json();
      if (!data.accessToken) throw new Error("Missing Access Token");
      useAuthStore.getState().setToken(data.accessToken);
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
};
