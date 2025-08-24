import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  GetcarsYearss,
  GetcarsYearsById,
  GetcarsYearssLookUp,
  UpdatecarsYearsLicense,
  UpdatecarsYearsPasswordType,
  AddcarsYears,
  GetcarsYearsProfile,
} from "./carsYearsTypes";
import carsYearssManager from "./carsYearsManager";
import { ParamsQuery } from "@/main/global/types/CommonTypes";

// Fetch all users
export const useGetAllcarsYears = (
  params: ParamsQuery,
  active: boolean = true,
  StaticParams: string = ""
) => {
  const fetchAllcarsYears = async () => {
    if (!active) return null; // If no ID is provided, return null
    return await carsYearssManager.getAllcarsYears();
  };
  console.log(StaticParams, "StaticParamsssssssssssss");

  return useQuery<GetcarsYearss>({
    queryKey: ["carsYears", params, StaticParams, active],
    queryFn: fetchAllcarsYears,
    enabled: !!active,
    retry: false,
  });
};

export const useGetAllcarsYearsLookUp = (
  params: ParamsQuery,
  active: boolean = true
) => {
  const fetchAllcarsYears = async () => {
    if (!active) return null; // If no ID is provided, return null
    return await carsYearssManager.getAllcarsYearsLookUp(params);
  };

  return useQuery<GetcarsYearssLookUp>({
    queryKey: ["carsYears", params, active],
    queryFn: fetchAllcarsYears,
    enabled: !!active,
    retry: false,
  });
};

// Fetch a single carsYears
export const useGetcarsYears = (id?: string, type?: string) => {
  return useQuery<GetcarsYearsById>({
    queryKey: ["carsYears", id],
    queryFn: () => carsYearssManager.getcarsYears(id),
    enabled: !!id && type === "carsYears",
    retry: false,
  });
};
export const useGetcarsYearssOrg = (id?: string, type?: string) => {
  return useQuery<GetcarsYearsById>({
    queryKey: ["carsYears", id],
    queryFn: () =>
      carsYearssManager.getAllcarsYearsLookUp({ organization: id }),
    enabled: !!id && type === "carsYears",
    retry: false,
  });
};

// Fetch a single carsYears
export const useGetProfile = (type?: string) => {
  return useQuery<GetcarsYearsProfile>({
    queryKey: ["profilecarsYears"],
    queryFn: () => carsYearssManager.getProfile(),
    enabled: type !== "carsYears",
    retry: false,
    staleTime: Infinity,
  });
};

export const useGetDefaultcarsYears = (type?: string) => {
  return useQuery<GetcarsYearsProfile>({
    queryKey: ["defaultcarsYears"],
    queryFn: () => carsYearssManager.getDefaultcarsYears(),
    enabled: type === "default",
    retry: false,
  });
};

// Add a new carsYears
export const useAddcarsYears = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: AddcarsYears) => carsYearssManager.addcarsYears(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carsYears"] });
    },
    retry: false,
  });
};
// update carsYears

export const useUpdatecarsYears = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: FormData) => carsYearssManager.updatecarsYears(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carsYears"] });
      queryClient.invalidateQueries({ queryKey: ["carsYears", id] });
    },
    retry: false,
  });
};

export const useUpdatecarsYearsPassword = (id?: string) => {
  return useMutation({
    mutationFn: (body: UpdatecarsYearsPasswordType) =>
      carsYearssManager.updatecarsYearsPassword(id, body),
    retry: false,
  });
};

// Update a carsYears
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: FormData) => carsYearssManager.updateProfile(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["carsYears"] });
      queryClient.invalidateQueries({ queryKey: ["profilecarsYears"] });
    },
    retry: false,
  });
};

// Update carsYears license
export const useUpdatecarsYearsLicense = (id?: string) => {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<UpdatecarsYearsLicense>) =>
      carsYearssManager.updatecarsYearsLicense(id, body),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["users"] });
      // queryClient.invalidateQueries({ queryKey: ["carsYears", id] });
    },
    retry: false,
  });
};

// Delete a carsYears
export const useDeletecarsYears = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      carsYearssManager.deletecarsYears(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carsYears"] });
    },
    retry: false,
  });
};
