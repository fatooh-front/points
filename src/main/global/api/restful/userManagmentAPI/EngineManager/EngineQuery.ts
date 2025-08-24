import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  GetEnginesById,
  GetEnginesLookUp,
  UpdateEnginesLicense,
  UpdateEnginesPasswordType,
  AddEngines,
  GetEnginesProfile,
  GetEngines,
} from "./EngineTypes.ts";
import EnginesManager from "./EngineManager.tsx";
import { ParamsQuery } from "@/main/global/types/CommonTypes";

// Fetch all users
export const useGetAllEngines = () => {
  const fetchAllEngines = async () => {
    return await EnginesManager.getAllEngines();
  };

  return useQuery<GetEngines>({
    queryKey: ["Engines"],
    queryFn: fetchAllEngines,
    enabled: true,
    retry: false,
  });
};

export const useGetAllEnginesLookUp = (
  params: ParamsQuery,
  active: boolean = true
) => {
  const fetchAllEngines = async () => {
    if (!active) return null; // If no ID is provided, return null
    return await EnginesManager.getAllEnginesLookUp(params);
  };

  return useQuery<GetEnginesLookUp>({
    queryKey: ["Engines", params, active],
    queryFn: fetchAllEngines,
    enabled: !!active,
    retry: false,
  });
};

// Fetch a single Engines
export const useGetEngines = (id?: string, type?: string) => {
  return useQuery<GetEnginesById>({
    queryKey: ["Engines", id],
    queryFn: () => EnginesManager.getEngines(id),
    enabled: !!id && type === "Engines",
    retry: false,
  });
};
export const useGetEnginesOrg = (id?: string, type?: string) => {
  return useQuery<GetEnginesById>({
    queryKey: ["Engines", id],
    queryFn: () => EnginesManager.getAllEnginesLookUp({ organization: id }),
    enabled: !!id && type === "Engines",
    retry: false,
  });
};

// Fetch a single Engines
export const useGetProfile = (type?: string) => {
  return useQuery<GetEnginesProfile>({
    queryKey: ["profileEngines"],
    queryFn: () => EnginesManager.getProfile(),
    enabled: type !== "Engines",
    retry: false,
    staleTime: Infinity,
  });
};

export const useGetDefaultEngines = (type?: string) => {
  return useQuery<GetEnginesProfile>({
    queryKey: ["defaultEngines"],
    queryFn: () => EnginesManager.getDefaultEngines(),
    enabled: type === "default",
    retry: false,
  });
};

// Add a new Engines
export const useAddEngines = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: AddEngines) => EnginesManager.addEngines(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Engines"] });
    },
    retry: false,
  });
};
// update Engines

export const useUpdateEngines = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: FormData) => EnginesManager.updateEngines(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Engines"] });
      queryClient.invalidateQueries({ queryKey: ["Engines", id] });
    },
    retry: false,
  });
};

export const useUpdateEnginesPassword = (id?: string) => {
  return useMutation({
    mutationFn: (body: UpdateEnginesPasswordType) =>
      EnginesManager.updateEnginesPassword(id, body),
    retry: false,
  });
};

// Update a Engines
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: FormData) => EnginesManager.updateProfile(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["Engines"] });
      queryClient.invalidateQueries({ queryKey: ["profileEngines"] });
    },
    retry: false,
  });
};

// Update Engines license
export const useUpdateEnginesLicense = (id?: string) => {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<UpdateEnginesLicense>) =>
      EnginesManager.updateEnginesLicense(id, body),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["users"] });
      // queryClient.invalidateQueries({ queryKey: ["Engines", id] });
    },
    retry: false,
  });
};

// Delete a Engines
export const useDeleteEngines = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => EnginesManager.deleteEngines(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Engines"] });
    },
    retry: false,
  });
};
