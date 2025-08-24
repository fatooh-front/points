import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  GetCategoriesById,
  GetCategoriesLookUp,
  UpdateCategoriesLicense,
  UpdateCategoriesPasswordType,
  AddCategories,
  GetCategoriesProfile,
  GetCategories,
} from "./CategorieTypes.ts";
import CategoriesManager from "./CategorieManager.tsx";
import { ParamsQuery } from "@/main/global/types/CommonTypes";

// Fetch all users
export const useGetAllCategories = () => {
  const fetchAllCategories = async () => {
    return await CategoriesManager.getAllCategories();
  };

  return useQuery<GetCategories>({
    queryKey: ["Categories"],
    queryFn: fetchAllCategories,
    enabled: true,
    retry: false,
  });
};

export const useGetAllCategoriesLookUp = (
  params: ParamsQuery,
  active: boolean = true
) => {
  const fetchAllCategories = async () => {
    if (!active) return null; // If no ID is provided, return null
    return await CategoriesManager.getAllCategoriesLookUp(params);
  };

  return useQuery<GetCategoriesLookUp>({
    queryKey: ["Categories", params, active],
    queryFn: fetchAllCategories,
    enabled: !!active,
    retry: false,
  });
};

// Fetch a single Categories
export const useGetCategories = (id?: string, type?: string) => {
  return useQuery<GetCategoriesById>({
    queryKey: ["Categories", id],
    queryFn: () => CategoriesManager.getCategories(id),
    enabled: !!id && type === "Categories",
    retry: false,
  });
};
export const useGetCategoriesOrg = (id?: string, type?: string) => {
  return useQuery<GetCategoriesById>({
    queryKey: ["Categories", id],
    queryFn: () =>
      CategoriesManager.getAllCategoriesLookUp({ organization: id }),
    enabled: !!id && type === "Categories",
    retry: false,
  });
};

// Fetch a single Categories
export const useGetProfile = (type?: string) => {
  return useQuery<GetCategoriesProfile>({
    queryKey: ["profileCategories"],
    queryFn: () => CategoriesManager.getProfile(),
    enabled: type !== "Categories",
    retry: false,
    staleTime: Infinity,
  });
};

export const useGetDefaultCategories = (type?: string) => {
  return useQuery<GetCategoriesProfile>({
    queryKey: ["defaultCategories"],
    queryFn: () => CategoriesManager.getDefaultCategories(),
    enabled: type === "default",
    retry: false,
  });
};

// Add a new Categories
export const useAddCategories = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: AddCategories) => CategoriesManager.addCategories(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Categories"] });
    },
    retry: false,
  });
};
// update Categories

export const useUpdateCategories = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: FormData) =>
      CategoriesManager.updateCategories(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Categories"] });
      queryClient.invalidateQueries({ queryKey: ["Categories", id] });
    },
    retry: false,
  });
};

export const useUpdateCategoriesPassword = (id?: string) => {
  return useMutation({
    mutationFn: (body: UpdateCategoriesPasswordType) =>
      CategoriesManager.updateCategoriesPassword(id, body),
    retry: false,
  });
};

// Update a Categories
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: FormData) => CategoriesManager.updateProfile(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["Categories"] });
      queryClient.invalidateQueries({ queryKey: ["profileCategories"] });
    },
    retry: false,
  });
};

// Update Categories license
export const useUpdateCategoriesLicense = (id?: string) => {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<UpdateCategoriesLicense>) =>
      CategoriesManager.updateCategoriesLicense(id, body),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["users"] });
      // queryClient.invalidateQueries({ queryKey: ["Categories", id] });
    },
    retry: false,
  });
};

// Delete a Categories
export const useDeleteCategories = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      CategoriesManager.deleteCategories(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Categories"] });
    },
    retry: false,
  });
};
