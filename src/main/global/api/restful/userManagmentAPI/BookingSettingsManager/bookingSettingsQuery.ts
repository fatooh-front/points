import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import BookingSettingsManager from "./bookingSettingsManager";
import { ParamsQuery } from "@/main/global/types/CommonTypes";
import {
  BookingCancel,
  ExtraServices,
  Setting,
  WorkingDay,
} from "./bookingSettingsTypes";

export const useGetAllCustomLocations = (params: ParamsQuery) => {
  return useQuery<{ data: any }>({
    queryKey: ["customLocations", params],
    queryFn: () => BookingSettingsManager.getCustomLocations(params),
    retry: false,
  });
};

export const useAddCustomLocations = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: {
      name?: string;
      longitude?: number;
      latitude?: number;
      radius?: number;
      price?: number;
    }) => BookingSettingsManager.addCustomLocations(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customLocations"] });
    },
    retry: false,
  });
};

export const useDeleteCustomLocations = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string | number }) =>
      BookingSettingsManager.deleteCustomLocations(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customLocations"] });
    },
    retry: false,
  });
};

// ----------- Settings ----------
export const useGetAllSettings = (params: ParamsQuery) => {
  return useQuery<{ data: Setting[] }>({
    queryKey: ["Settings", params],
    queryFn: () => BookingSettingsManager.getAllSettings(params),
    retry: false,
  });
};
export const useGetAllSettingsByKey = (params: ParamsQuery) => {
  return useQuery<{ data: Setting }>({
    queryKey: ["Settings", params],
    queryFn: () => BookingSettingsManager.getAllSettingsByKey(params),
    retry: false,
  });
};

export const useAddSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Setting[]) => BookingSettingsManager.addSettings(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Settings"] });
    },
    retry: false,
  });
};
// ----------- PreventedCarOnForeigners ----------
export const useGetAllPreventedCarOnForeigners = (params: ParamsQuery) => {
  return useQuery<{ data: any }>({
    queryKey: ["PreventedCarOnForeigners", params],
    queryFn: () => BookingSettingsManager.getPreventedCarOnForeigners(params),
    retry: false,
  });
};

export const usePreventedCarOnForeigners = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: { banOnForeigners: boolean; Id: string | number }) =>
      BookingSettingsManager.PreventedCarOnForeigners(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["PreventedCarOnForeigners"] });
    },
    retry: false,
  });
};
// ----------- الحجز ----------
export const useGetAllExtraServices = (params: ParamsQuery) => {
  return useQuery<{ data: ExtraServices[] }>({
    queryKey: ["ExtraServices", params],
    queryFn: () => BookingSettingsManager.getAllExtraServices(params),
    retry: false,
  });
};

export const useAddExtraServices = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: ExtraServices) =>
      BookingSettingsManager.addExtraServices(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ExtraServices"] });
    },
    retry: false,
  });
};

export const useDeleteExtraServices = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) =>
      BookingSettingsManager.deleteExtraServices(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ExtraServices"] });
    },
    retry: false,
  });
};

// ----------- إلغاء الحجز ----------
export const useGetAllBookingCancels = (params: ParamsQuery) => {
  return useQuery({
    queryKey: ["bookingCancels", params],
    queryFn: () => BookingSettingsManager.getAllBookingCancels(params),
    retry: false,
  });
};

export const useGetBookingCancel = () => {
  return useQuery<{ data: BookingCancel[] }>({
    queryKey: ["bookingCancel"],
    queryFn: () => BookingSettingsManager.getBookingCancel(),
    enabled: true,
    retry: false,
  });
};

export const useAddBookingCancel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: BookingCancel) =>
      BookingSettingsManager.addBookingCancel(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookingCancels"] });
    },
    retry: false,
  });
};

export const useDeleteBookingCancel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) =>
      BookingSettingsManager.deleteBookingCancel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookingCancels"] });
    },
    retry: false,
  });
};

// ----------- أيام العمل الخاصة ----------
export const useGetPrivateWorkingDays = (branchId?: string | number) => {
  return useQuery({
    queryKey: ["privateWorkingDays", branchId],
    queryFn: () => BookingSettingsManager.getPrivateWorkingDays(branchId!),
    enabled: !!branchId,
    retry: false,
  });
};

export const useAddPrivateWorkingDay = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: WorkingDay) =>
      BookingSettingsManager.addPrivateWorkingDay(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["privateWorkingDays"] });
    },
    retry: false,
  });
};

export const useDeletePrivateWorkingDay = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      BookingSettingsManager.deletePrivateWorkingDay(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["privateWorkingDays"] });
    },
    retry: false,
  });
};
export const useSetCurrentWorkingDay = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      BookingSettingsManager.useSetCurrentWorkingDay(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["privateWorkingDays"] });
    },
    retry: false,
  });
};

// ----------- أيام العمل العادية ----------
export const useGetNormalWorkingDays = (branchId?: string | number) => {
  return useQuery({
    queryKey: ["normalWorkingDays", branchId],
    queryFn: () => BookingSettingsManager.getNormalWorkingDays(branchId!),
    enabled: !!branchId,
    retry: false,
  });
};

export const useAddNormalWorkingDay = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: WorkingDay) =>
      BookingSettingsManager.addNormalWorkingDay(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["normalWorkingDays"] });
    },
    retry: false,
  });
};

export const useDeleteNormalWorkingDay = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      BookingSettingsManager.deleteNormalWorkingDay(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["normalWorkingDays"] });
    },
    retry: false,
  });
};
