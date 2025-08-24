import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  GetPermissions,
  GetPermissionById,
  // UpdatePermission,
} from "./PermissionsTypes";
import PermissionsManager from "./permissionsManager";
import { ParamsQuery } from "@/main/global/types/CommonTypes";

// Fetch all permissions
export const useGetAllPermissions = (
  params: ParamsQuery,
  active: boolean = true
) => {
  const fetchAllPermissions = async () => {
    if (!active) return null; // If no ID is provided, return null
    return await PermissionsManager.getAllPermissions(params);
  };

  return useQuery<GetPermissions>({
    queryKey: ["permission"],
    queryFn: fetchAllPermissions,
    enabled: !!active,
  });
};

// export const useGetAllPermissionsLookUp = (
//   params: ParamsQuery,
//   active: boolean = true
// ) => {
//   const fetchAllPermissions = async () => {
//     if (!active) return null; // If no ID is provided, return null
//     return await PermissionsManager.getAllPermissionsLookUp(params);
//   };

//   return useQuery<GetPermissionsLookUp>({
//     queryKey: ["permissions", params, active],
//     queryFn: fetchAllPermissions,
//     enabled: !!active,
//   });
// };

// Fetch a single permission
export const useGetPermission = (id: string | undefined) => {
  return useQuery<GetPermissionById>({
    queryKey: ["permission", id],
    queryFn: () => PermissionsManager.getPermission(id),
    enabled: !!id, // Enable query only if id is provided
    retry: false,
  });
};

export const useGetPermissionUserGroup = (
  id?: string,
  type?: string,
  license?: string,
  active: boolean = true
) => {
  return useQuery<GetPermissionById>({
    // queryKey: ["permission", id],
    queryKey: ["screenPermission", id],
    queryFn: () => PermissionsManager.getPermissionUserGroup(id, type, license),
    enabled:
      !!id &&
      id !== "undefined" &&
      id !== "null" &&
      id !== "screens_settings" &&
      id !== "page_settings" &&
      !!type &&
      !!active, // Enable query only if id is provided
    retry: false,
  });
};

// Fetch my permission
export const useGetMyPermission = (
  license?: string,
  enabled: boolean = true
) => {
  return useQuery<GetPermissionById>({
    queryKey: ["myPermission", license],
    enabled: !!license && enabled,
    retry: false,
    staleTime: Infinity, // Keep the data fresh indefinitely
  });
};

export const useGetMyPermissionScreen = (
  license?: string,
  enabled: boolean = true
) => {
  return useQuery<GetPermissionById>({
    queryKey: ["permissionScreen", license],
    // queryKey: ["screenPermission", license],
    enabled: !!license && enabled,
    retry: false,
    staleTime: Infinity, // Keep the data fresh indefinitely
  });
};
// update permission

export const useUpdatePermission = (
  id: string | undefined,
  license?: string
) => {
  const queryClient = useQueryClient();
  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (body: any) =>
      PermissionsManager.updatePermission(id, body, license),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["permissions"] });
      // queryClient.invalidateQueries({ queryKey: ["permission", id] });
      // queryClient.invalidateQueries({ queryKey: ["permission"] });
      queryClient.invalidateQueries({ queryKey: ["screenPermission"] });
      queryClient.invalidateQueries({ queryKey: ["screenPermission", id] });
      queryClient.invalidateQueries({ queryKey: ["screenPermission"] });
    },
    retry: false,
  });
};
