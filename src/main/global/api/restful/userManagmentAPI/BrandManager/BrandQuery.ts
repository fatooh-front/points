import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  GetBrandsById,
  GetBrandsLookUp,
  UpdateBrandsLicense,
  UpdateBrandsPasswordType,
  AddBrands,
  GetBrandsProfile,
  GetBrands,
} from "./BrandTypes.ts";
import BrandsManager from "./BrandManager.tsx";
import { ParamsQuery } from "@/main/global/types/CommonTypes";

// Fetch all users
export const useGetAllBrands = () => {
  const fetchAllBrands = async () => {
    return await BrandsManager.getAllBrands();
  };

  return useQuery<GetBrands>({
    queryKey: ["Brands"],
    queryFn: fetchAllBrands,
    enabled: true,
    retry: false,
  });
};

export const useGetAllBrandsLookUp = (
  params: ParamsQuery,
  active: boolean = true
) => {
  const fetchAllBrands = async () => {
    if (!active) return null; // If no ID is provided, return null
    return await BrandsManager.getAllBrandsLookUp(params);
  };

  return useQuery<GetBrandsLookUp>({
    queryKey: ["Brands", params, active],
    queryFn: fetchAllBrands,
    enabled: !!active,
    retry: false,
  });
};

// Fetch a single Brands
export const useGetBrands = (id?: string, type?: string) => {
  return useQuery<GetBrandsById>({
    queryKey: ["Brands", id],
    queryFn: () => BrandsManager.getBrands(id),
    enabled: !!id && type === "Brands",
    retry: false,
  });
};
export const useGetBrandsOrg = (id?: string, type?: string) => {
  return useQuery<GetBrandsById>({
    queryKey: ["Brands", id],
    queryFn: () => BrandsManager.getAllBrandsLookUp({ organization: id }),
    enabled: !!id && type === "Brands",
    retry: false,
  });
};

// Fetch a single Brands
export const useGetProfile = (type?: string) => {
  return useQuery<GetBrandsProfile>({
    queryKey: ["profileBrands"],
    queryFn: () => BrandsManager.getProfile(),
    enabled: type !== "Brands",
    retry: false,
    staleTime: Infinity,
  });
};

export const useGetDefaultBrands = (type?: string) => {
  return useQuery<GetBrandsProfile>({
    queryKey: ["defaultBrands"],
    queryFn: () => BrandsManager.getDefaultBrands(),
    enabled: type === "default",
    retry: false,
  });
};

// Add a new Brands
export const useAddBrands = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: AddBrands) => BrandsManager.addBrands(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Brands"] });
    },
    retry: false,
  });
};
// update Brands

export const useUpdateBrands = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: FormData) => BrandsManager.updateBrands(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Brands"] });
      queryClient.invalidateQueries({ queryKey: ["Brands", id] });
    },
    retry: false,
  });
};

export const useUpdateBrandsPassword = (id?: string) => {
  return useMutation({
    mutationFn: (body: UpdateBrandsPasswordType) =>
      BrandsManager.updateBrandsPassword(id, body),
    retry: false,
  });
};

// Update a Brands
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: FormData) => BrandsManager.updateProfile(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["Brands"] });
      queryClient.invalidateQueries({ queryKey: ["profileBrands"] });
    },
    retry: false,
  });
};

// Update Brands license
export const useUpdateBrandsLicense = (id?: string) => {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<UpdateBrandsLicense>) =>
      BrandsManager.updateBrandsLicense(id, body),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["users"] });
      // queryClient.invalidateQueries({ queryKey: ["Brands", id] });
    },
    retry: false,
  });
};

// Delete a Brands
export const useDeleteBrands = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => BrandsManager.deleteBrands(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Brands"] });
    },
    retry: false,
  });
};
