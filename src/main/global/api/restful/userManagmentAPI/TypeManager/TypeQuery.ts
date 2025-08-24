import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  GetTypesById,
  GetTypesLookUp,
  UpdateTypesLicense,
  UpdateTypesPasswordType,
  AddTypes,
  GetTypesProfile,
  GetTypes,
} from "./TypeTypes.ts";
import TypesManager from "./TypeManager.tsx";
import { ParamsQuery } from "@/main/global/types/CommonTypes";

// Fetch all users
export const useGetAllTypes = () => {
  const fetchAllTypes = async () => {
    return await TypesManager.getAllTypes();
  };

  return useQuery<GetTypes>({
    queryKey: ["Types"],
    queryFn: fetchAllTypes,
    enabled: true,
    retry: false,
  });
};

export const useGetAllTypesLookUp = (
  params: ParamsQuery,
  active: boolean = true
) => {
  const fetchAllTypes = async () => {
    if (!active) return null; // If no ID is provided, return null
    return await TypesManager.getAllTypesLookUp(params);
  };

  return useQuery<GetTypesLookUp>({
    queryKey: ["Types", params, active],
    queryFn: fetchAllTypes,
    enabled: !!active,
    retry: false,
  });
};

// Fetch a single Types
export const useGetTypes = (id?: string, type?: string) => {
  return useQuery<GetTypesById>({
    queryKey: ["Types", id],
    queryFn: () => TypesManager.getTypes(id),
    enabled: !!id && type === "Types",
    retry: false,
  });
};
export const useGetTypesOrg = (id?: string, type?: string) => {
  return useQuery<GetTypesById>({
    queryKey: ["Types", id],
    queryFn: () => TypesManager.getAllTypesLookUp({ organization: id }),
    enabled: !!id && type === "Types",
    retry: false,
  });
};

// Fetch a single Types
export const useGetProfile = (type?: string) => {
  return useQuery<GetTypesProfile>({
    queryKey: ["profileTypes"],
    queryFn: () => TypesManager.getProfile(),
    enabled: type !== "Types",
    retry: false,
    staleTime: Infinity,
  });
};

export const useGetDefaultTypes = (type?: string) => {
  return useQuery<GetTypesProfile>({
    queryKey: ["defaultTypes"],
    queryFn: () => TypesManager.getDefaultTypes(),
    enabled: type === "default",
    retry: false,
  });
};

// Add a new Types
export const useAddTypes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: AddTypes) => TypesManager.addTypes(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Types"] });
    },
    retry: false,
  });
};
// update Types

export const useUpdateTypes = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: FormData) => TypesManager.updateTypes(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Types"] });
      queryClient.invalidateQueries({ queryKey: ["Types", id] });
    },
    retry: false,
  });
};

export const useUpdateTypesPassword = (id?: string) => {
  return useMutation({
    mutationFn: (body: UpdateTypesPasswordType) =>
      TypesManager.updateTypesPassword(id, body),
    retry: false,
  });
};

// Update a Types
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: FormData) => TypesManager.updateProfile(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Types"] });
      queryClient.invalidateQueries({ queryKey: ["Types"] });
      queryClient.invalidateQueries({ queryKey: ["profileTypes"] });
    },
    retry: false,
  });
};

// Update Types license
export const useUpdateTypesLicense = (id?: string) => {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<UpdateTypesLicense>) =>
      TypesManager.updateTypesLicense(id, body),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["users"] });
      // queryClient.invalidateQueries({ queryKey: ["Types", id] });
    },
    retry: false,
  });
};

// Delete a Types
export const useDeleteTypes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => TypesManager.deleteTypes(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Types"] });
    },
    retry: false,
  });
};
