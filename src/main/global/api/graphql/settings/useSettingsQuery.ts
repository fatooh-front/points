import {
  InvalidateQueryFilters,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

import { HttpMethodMudation } from "../../shared/ApiTypes";
import { useGQLMutation } from "../config/useGQLMutation";
import { useGQLQuery } from "../config/useGQLQuery";
import {
  ADD_SETTING,
  DELETE_SETTING,
  GET_ALL_SETTINGS,
  GET_SETTING,
  GET_SETTING_BY_NAME,
  UPDATE_SETTING,
} from "./settingsManager";
import {
  AddSettingVariables,
  AllSettingsData,
  DeleteSettingVariables,
  Setting,
  SettingByNameVariables,
  SettingData,
  SettingVariables,
  UpdateSettingVariables,
} from "./SettingsTypes";

// Hooks
export const useGetAllSettings = () => {
  return useGQLQuery<AllSettingsData>(
    ["settings"],
    GET_ALL_SETTINGS,
    undefined,
    { enabled: false }
  );
};

export const useGetSetting = (id: string) => {
  return useGQLQuery<SettingData, SettingVariables>(
    ["setting", id],
    GET_SETTING,
    { id },
    { enabled: false }
  );
};

export const useGetLazySetting = () => {
  return (id: string) =>
    useGQLQuery<SettingData, SettingVariables>(
      ["setting", id],
      GET_SETTING,
      { id },
      { enabled: false }
    );
};

export const useGetSettingByName = (name: string) => {
  return useGQLQuery<SettingData, SettingByNameVariables>(
    ["setting", name],
    GET_SETTING_BY_NAME,
    { name },
    { enabled: false }
  );
};

export const useAddSetting = (
  options?: Omit<
    UseMutationOptions<Setting, Error, AddSettingVariables>,
    "mutationFn"
  >
) => {
  const queryClient = useQueryClient();

  return useGQLMutation<Setting, AddSettingVariables>(
    ADD_SETTING,
    HttpMethodMudation.POST, // Indicate the HTTP method for the success toast
    {
      ...options,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({
          queryKey: ["settings"],
        } as InvalidateQueryFilters);
        if (options?.onSuccess) {
          options.onSuccess(data, variables, context);
        }
      },
    }
  );
};

export const useUpdateSetting = (
  options?: Omit<
    UseMutationOptions<Setting, Error, UpdateSettingVariables>,
    "mutationFn"
  >
) => {
  const queryClient = useQueryClient();

  return useGQLMutation<Setting, UpdateSettingVariables>(
    UPDATE_SETTING,
    HttpMethodMudation.PUT, // HTTP method for the success toast
    {
      ...options,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({
          queryKey: ["settings"],
        } as InvalidateQueryFilters);
        queryClient.invalidateQueries({
          queryKey: ["setting", data.id],
        } as InvalidateQueryFilters);
        if (options?.onSuccess) {
          options.onSuccess(data, variables, context);
        }
      },
    }
  );
};

export const useDeleteSetting = (
  options?: Omit<
    UseMutationOptions<{ id: string }, Error, DeleteSettingVariables>,
    "mutationFn"
  >
) => {
  const queryClient = useQueryClient();

  return useGQLMutation<{ id: string }, DeleteSettingVariables>(
    DELETE_SETTING,
    HttpMethodMudation.DELETE, // HTTP method for the success toast
    {
      ...options,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({
          queryKey: ["settings"],
        } as InvalidateQueryFilters);
        if (options?.onSuccess) {
          options.onSuccess(data, variables, context);
        }
      },
    }
  );
};
