import { SessionExpiredError } from "../errors";
import { useAuthStore } from "../store/useAuthStore";
import type {
  AccessToken,
  LoginRefreshResponse,
  SignupResponse,
  User,
} from "../types";
import { refreshToken } from "./refreshToken";

export const signupUser = async (userData: {
  email: string;
  name?: string;
}): Promise<User> => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error(response.statusText);
  const data: SignupResponse = await response.json();
  return data.user;
};

export const loginUser = async (email: string): Promise<AccessToken> => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) throw new Error(response.statusText);
  const data: LoginRefreshResponse = await response.json();
  return data.accessToken;
};

export const clearAccessToken = () => {
  useAuthStore.getState().clearToken();
};

export const setTokenOnLogin = (token: AccessToken) => {
  useAuthStore.getState().setToken(token);
};

// preventing naughty strict mode from calling authFetch multiple times
// let isRefreshing = false;
// let refreshPromise: Promise<any> | null = null;

// export const authFetch = async (url: string, options: RequestInit = {}) => {
//   //first try
//   let response = await fetch(url, {
//     ...options,
//     headers: {
//       ...options.headers,
//       "Content-Type": "application/json",
//       ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
//     },
//   });

//   // if fail, call refresh route
//   if (response.status === 401) {
//     try {
//       if (isRefreshing && refreshPromise) {
//         await refreshPromise;
//       } else {
//         isRefreshing = true;
//         refreshPromise = fetch("/api/auth/refresh", {
//           method: "POST",
//           credentials: "include",
//         })
//           .then(async (res) => {
//             if (!res.ok) throw new Error("Refresh failed");
//             const data = await res.json();
//             accessToken = data.accessToken;
//           })
//           .finally(() => {
//             isRefreshing = false;
//             refreshPromise = null;
//           });

//         await refreshPromise;
//       }

//       // Retry original request with new token
//       response = await fetch(url, {
//         ...options,
//         headers: {
//           ...options.headers,
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//     } catch (error) {
//       clearAccessToken();
//       throw new Error("SESSION_EXPIRED");
//     }
//   }

//   if (!response.ok) throw new Error(response.statusText);
//   return response.json();
// };

export const authFetch = async (url: string, options: RequestInit = {}) => {
  const accessToken = useAuthStore.getState().accessToken;
  let response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      ...options.headers,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });

  if (response.status !== 401) {
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  }

  try {
    await refreshToken();

    const accessToken = useAuthStore.getState().accessToken;

    // Retry original request with new token
    response = await fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        ...options.headers,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    });

    if (response.status === 401) {
      throw new SessionExpiredError();
    }
  } catch (error) {
    clearAccessToken();
    throw new SessionExpiredError(); // check if error instanceof SessionExpiredError
  }

  if (!response.ok) throw new Error(response.statusText);

  const contentType = response.headers.get("Content-Type");
  if (contentType?.includes("application/json")) {
    return response.json();
  }

  return response.text();
};

// logout
export const logoutUser = async (): Promise<void> => {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
  clearAccessToken();
  if (!response.ok) throw new Error(response.statusText);
};
