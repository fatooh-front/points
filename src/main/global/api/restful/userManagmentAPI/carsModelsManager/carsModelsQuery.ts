import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  GetCarsModelss,
  GetCarsModelsById,
  GetCarsModelssLookUp,
  UpdateCarsModelsLicense,
  UpdateCarsModelsPasswordType,
  AddCarsModels,
  GetCarsModelsProfile,
} from "./carsModelsTypes";
import CarsModelssManager from "./carsModelsManager";
import { ParamsQuery } from "@/main/global/types/CommonTypes";

// Fetch all users
export const useGetAllCarsModels = (
  params: ParamsQuery,
  active: boolean = true,
  StaticParams: string = ""
) => {
  const fetchAllCarsModels = async () => {
    if (!active) return null; // If no ID is provided, return null
    return await CarsModelssManager.getAllCarsModels();
  };
  console.log(StaticParams, "StaticParamsssssssssssss");

  return useQuery<GetCarsModelss>({
    queryKey: ["carsModels", params, StaticParams, active],
    queryFn: fetchAllCarsModels,
    enabled: !!active,
    retry: false,
  });
};

export const useGetAllCarsModelssLookUp = (
  params: ParamsQuery,
  active: boolean = true
) => {
  const fetchAllCarsModels = async () => {
    if (!active) return null; // If no ID is provided, return null
    return await CarsModelssManager.getAllCarsModelsLookUp(params);
  };

  return useQuery<GetCarsModelssLookUp>({
    queryKey: ["carsModels", params, active],
    queryFn: fetchAllCarsModels,
    enabled: !!active,
    retry: false,
  });
};

// Fetch a single carsModels
export const useGetCarsModels = (id?: string, type?: string) => {
  return useQuery<GetCarsModelsById>({
    queryKey: ["carsModels", id],
    queryFn: () => CarsModelssManager.getCarsModels(id),
    enabled: !!id && type === "carsModels",
    retry: false,
  });
};
export const useGetCarsModelssOrg = (id?: string, type?: string) => {
  return useQuery<GetCarsModelsById>({
    queryKey: ["carsModels", id],
    queryFn: () =>
      CarsModelssManager.getAllCarsModelsLookUp({ organization: id }),
    enabled: !!id && type === "carsModels",
    retry: false,
  });
};

// Fetch a single carsModels
export const useGetProfile = (type?: string) => {
  return useQuery<GetCarsModelsProfile>({
    queryKey: ["profileCarsModels"],
    queryFn: () => CarsModelssManager.getProfile(),
    enabled: type !== "carsModels",
    retry: false,
    staleTime: Infinity,
  });
};

export const useGetDefaultCarsModels = (type?: string) => {
  return useQuery<GetCarsModelsProfile>({
    queryKey: ["defaultCarsModels"],
    queryFn: () => CarsModelssManager.getDefaultCarsModels(),
    enabled: type === "default",
    retry: false,
  });
};

// Add a new carsModels
export const useAddCarsModels = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: AddCarsModels) => CarsModelssManager.addCarsModels(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carsModels"] });
    },
    retry: false,
  });
};
// update carsModels

export const useUpdateCarsModels = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: FormData) =>
      CarsModelssManager.updateCarsModels(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carsModels"] });
      queryClient.invalidateQueries({ queryKey: ["carsModels", id] });
    },
    retry: false,
  });
};

export const useUpdateCarsModelsPassword = (id?: string) => {
  return useMutation({
    mutationFn: (body: UpdateCarsModelsPasswordType) =>
      CarsModelssManager.updateCarsModelsPassword(id, body),
    retry: false,
  });
};

// Update a carsModels
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: FormData) => CarsModelssManager.updateProfile(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["carsModels"] });
      queryClient.invalidateQueries({ queryKey: ["profileCarsModels"] });
    },
    retry: false,
  });
};

// Update carsModels license
export const useUpdateCarsModelsLicense = (id?: string) => {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<UpdateCarsModelsLicense>) =>
      CarsModelssManager.updateCarsModelsLicense(id, body),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["users"] });
      // queryClient.invalidateQueries({ queryKey: ["carsModels", id] });
    },
    retry: false,
  });
};

// Delete a carsModels
export const useDeleteCarsModels = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      CarsModelssManager.deleteCarsModels(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carsModels"] });
    },
    retry: false,
  });
};
