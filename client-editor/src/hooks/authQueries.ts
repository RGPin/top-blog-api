import { useMutation } from "@tanstack/react-query";
import {
  clearAccessToken,
  loginUser,
  logoutUser,
  setTokenOnLogin,
  signupUser,
} from "../api/auth";
import { useNavigate } from "react-router";
import { queryClient } from "../main";

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

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login success ", data);
      setTokenOnLogin(data);
      navigate("/");
    },
    onError: (error) => {
      console.error("Login failed: ", error);
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      console.log("Logout success");
    },
    onError: (error) => {
      console.error("Logout failed: ", error);
    },
    onSettled: () => {
      clearAccessToken();
      navigate("/login");
      queryClient.clear();
    },
  });
};
