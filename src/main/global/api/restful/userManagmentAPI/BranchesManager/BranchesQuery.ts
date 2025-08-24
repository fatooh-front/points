import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  GetBranchesById,
  GetBranchesLookUp,
  UpdateBranchesLicense,
  UpdateBranchesPasswordType,
  AddBranches,
  GetBranchesProfile,
  GetBranches,
  GetBranche,
} from "./BranchesTypes.ts";
import BranchesManager from "./BranchesManager.tsx";
import { ParamsQuery } from "@/main/global/types/CommonTypes";
import { GetCars } from "../carsManager/carsTypes.ts";

// Fetch all users
export const useGetAllBranches = () => {
  const fetchAllBranches = async () => {
    return await BranchesManager.getAllBranches();
  };

  return useQuery<GetBranches>({
    queryKey: ["Branches"],
    queryFn: fetchAllBranches,
    enabled: true,
    retry: false,
  });
};
export const useGetCarsBranche = (id?: string) => {
  const fetchAllBranches = async () => {
    return await BranchesManager.getCarsBranche(id);
  };

  return useQuery<GetCars>({
    queryKey: ["CarsBranche"],
    queryFn: fetchAllBranches,
    enabled: true,
    retry: false,
  });
};

export const useGetAllBranchesLookUp = (
  params: ParamsQuery,
  active: boolean = true
) => {
  const fetchAllBranches = async () => {
    if (!active) return null; // If no ID is provided, return null
    return await BranchesManager.getAllBranchesLookUp(params);
  };

  return useQuery<GetBranchesLookUp>({
    queryKey: ["Branches", params, active],
    queryFn: fetchAllBranches,
    enabled: !!active,
    retry: false,
  });
};

// Fetch a single Branches
export const useGetBranche = (id?: string) => {
  return useQuery<GetBranche>({
    queryKey: ["Branches", id],
    queryFn: () => BranchesManager.getBranche(id),
    enabled: !!id,
    retry: false,
  });
};
export const useGetBranchesOrg = (id?: string, type?: string) => {
  return useQuery<GetBranchesById>({
    queryKey: ["Branches", id],
    queryFn: () => BranchesManager.getAllBranchesLookUp({ organization: id }),
    enabled: !!id && type === "Branches",
    retry: false,
  });
};

// Fetch a single Branches
export const useGetProfile = (type?: string) => {
  return useQuery<GetBranchesProfile>({
    queryKey: ["profileBranches"],
    queryFn: () => BranchesManager.getProfile(),
    enabled: type !== "Branches",
    retry: false,
    staleTime: Infinity,
  });
};

export const useGetDefaultBranches = (type?: string) => {
  return useQuery<GetBranchesProfile>({
    queryKey: ["defaultBranches"],
    queryFn: () => BranchesManager.getDefaultBranches(),
    enabled: type === "default",
    retry: false,
  });
};

// Add a new Branches
export const useAddBranches = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: AddBranches) => BranchesManager.addBranches(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Branches"] });
    },
    retry: false,
  });
};
// update Branches

export const useUpdateBranches = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: FormData) => BranchesManager.updateBranches(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Branches"] });
      queryClient.invalidateQueries({ queryKey: ["Branches", id] });
    },
    retry: false,
  });
};

export const useUpdateBranchesPassword = (id?: string) => {
  return useMutation({
    mutationFn: (body: UpdateBranchesPasswordType) =>
      BranchesManager.updateBranchesPassword(id, body),
    retry: false,
  });
};

// Update a Branches
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: FormData) => BranchesManager.updateProfile(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["Branches"] });
      queryClient.invalidateQueries({ queryKey: ["profileBranches"] });
    },
    retry: false,
  });
};

// Update Branches license
export const useUpdateBranchesLicense = (id?: string) => {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<UpdateBranchesLicense>) =>
      BranchesManager.updateBranchesLicense(id, body),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["users"] });
      // queryClient.invalidateQueries({ queryKey: ["Branches", id] });
    },
    retry: false,
  });
};

// Delete a Branches
export const useDeleteBranches = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => BranchesManager.deleteBranches(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Branches"] });
    },
    retry: false,
  });
};
