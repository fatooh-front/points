import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import SettingsManager from "./SettingsManager";
import { GetSettings, Setting } from "./SettingsTypes";
import { ParamsQuery } from "@/main/global/types/CommonTypes";

// Fetch all settings
export const useGetAllSettings = (params?: ParamsQuery, enabled?: boolean) => {
  return useQuery<GetSettings>({
    queryKey: ["settings", params],
    enabled,
    staleTime: Infinity,
    retry: false,
  });
};

// Fetch a single setting
export const useGetSetting = (id: string) => {
  return useQuery<Setting>({
    queryKey: ["setting", id],
    queryFn: () => SettingsManager.getSetting(id),
    enabled: !!id, // Enable query only if id is provided
    staleTime: Infinity,
    retry: false,
  });
};

export const useGetSettingByName = (name: string) => {
  return useQuery<Setting>({
    queryKey: ["setting", name],
    queryFn: () => SettingsManager.getSettingByName(name),
    enabled: !!name, // Enable query only if name is provided
    staleTime: Infinity,
    retry: false,
  });
};

// Add a new setting
export const useAddSetting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: SettingsManager.addSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    retry: false,
  });
};

// Update a setting
export const useUpdateSetting = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: FormData) => SettingsManager.updateSetting(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      queryClient.invalidateQueries({ queryKey: ["setting", id] });
    },
    retry: false,
  });
};

// Delete a setting
export const useDeleteSetting = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => SettingsManager.deleteSetting(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    retry: false,
  });
};
