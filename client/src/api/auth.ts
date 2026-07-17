import type { SignupResponse, User } from "../types";

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
