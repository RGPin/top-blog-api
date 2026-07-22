import { useAuthStore } from "../store/useAuthStore";
import type { TokenPayload } from "../types";
import { extractPayload } from "../utils/extractPayload";

export const useTokenPayload = (): TokenPayload | null => {
  const token = useAuthStore.getState().accessToken;

  if (!token) return null;

  return extractPayload(token);
};
