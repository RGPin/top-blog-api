import type {
  AccessToken,
  LoginRefreshResponse,
  SignupResponse,
  User,
} from "../types";

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

// for refresh token
let accessToken: string | null = null;

export const clearAccessToken = () => {
  accessToken = null;
};

export const setTokenOnLogin = (token: AccessToken) => {
  accessToken = token;
};

// preventing naughty strict mode from calling authFetch multiple times
let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;

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
  let response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });

  if (response.status !== 401) {
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  }

  try {
    if (isRefreshing && refreshPromise) {
      await refreshPromise;
    } else {
      isRefreshing = true;
      refreshPromise = fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      })
        .then(async (res) => {
          if (!res.ok) throw new Error("Refresh failed");
          const data = await res.json();
          accessToken = data.accessToken;
        })
        .finally(() => {
          isRefreshing = false;
          refreshPromise = null;
        });
      await refreshPromise;
    }

    // Retry original request with new token
    response = await fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    clearAccessToken();
    throw new Error("SESSION_EXPIRED"); // check if error.message is this then navigate to logout
  }

  if (!response.ok) throw new Error(response.statusText);
  return response.json();
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
