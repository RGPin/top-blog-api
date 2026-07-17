import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../api/auth";

export const useSignUp = () => {
  return useMutation({
    mutationFn: signupUser,
    onSuccess: (data, variables) => {
      console.log(data, variables);
    },
    onError: (error) => {
      console.error("Signup failed: ", error);
    },
  });
};
