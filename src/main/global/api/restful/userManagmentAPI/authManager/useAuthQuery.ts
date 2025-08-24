import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ActivatePhoneAuth,
  AddRegisterAuth,
  AuthState,
  LoginAuth,
  RegisterAuth,
  ReSendActivateState,
  SetNewPasswordAuth,
} from "./AuthTypes";
import AuthManager from "./AuthManager";
import { AxiosResponse } from "axios";

// Custom hook for login
export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation<AuthState, unknown, LoginAuth>({
    mutationFn: ({ sendValues, type }) =>
      AuthManager.login({ sendValues, type }),
    onSuccess: (data) => {
      queryClient.setQueryData(["auth"], data);
    },
    retry: false,
  });
};

// Custom hook for register
export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation<AuthState, unknown, AddRegisterAuth>({
    mutationFn: ({ sendValues, type, userType }) =>
      AuthManager.register({ sendValues, type, userType }),
    onSuccess: (data) => {
      queryClient.setQueryData(["auth"], data);
    },
    retry: false,
  });
};

// Custom hook for ReSendActivate
export const useReSendActivate = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<ReSendActivateState>, unknown, RegisterAuth>(
    {
      mutationFn: ({ sendValues, type }) =>
        AuthManager.reSendActivate({ sendValues, type }),
      onSuccess: (data) => {
        queryClient.setQueryData(["auth"], data);
      },
      retry: false,
    }
  );
};

// Custom hook for ActivateEmail
export const useActivateEmail = () => {
  const queryClient = useQueryClient();
  return useMutation<AuthState, unknown, string>({
    mutationFn: (token) => AuthManager.activateEmail(token),
    onSuccess: (data) => {
      queryClient.setQueryData(["auth"], data);
    },
    retry: false,
  });
};

// Custom hook for ActivatePhone
export const useActivatePhone = () => {
  const queryClient = useQueryClient();
  return useMutation<AuthState, unknown, ActivatePhoneAuth>({
    mutationFn: AuthManager.activatePhone,
    onSuccess: (data) => {
      queryClient.setQueryData(["auth"], data);
    },
    retry: false,
  });
};

// Custom hook for Forget Password
export const useForgetPassword = () => {
  const queryClient = useQueryClient();
  return useMutation<AuthState, unknown, LoginAuth>({
    mutationFn: ({ sendValues, type }) =>
      AuthManager.forgetPassword({ sendValues, type }),
    onSuccess: (data) => {
      queryClient.setQueryData(["auth"], data);
    },
    retry: false,
  });
};

// Custom hook for Set New Password
export const useSetNewPassword = () => {
  const queryClient = useQueryClient();
  return useMutation<AuthState, unknown, SetNewPasswordAuth>({
    mutationFn: ({ sendValues, type }) =>
      AuthManager.setNewPassword({ sendValues, type }),
    onSuccess: (data) => {
      queryClient.setQueryData(["auth"], data);
    },
    retry: false,
  });
};
