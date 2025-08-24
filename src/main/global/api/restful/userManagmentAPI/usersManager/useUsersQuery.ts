import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  GetUsers,
  GetUserById,
  GetUsersLookUp,
  UpdateUserLicense,
  UpdateUserPasswordType,
  AddUser,
  GetUserProfile,
} from "./UsersTypes";
import UsersManager from "./usersManager";
import { ParamsQuery } from "@/main/global/types/CommonTypes";

// Fetch all users
export const useGetAllUsers = (
  params: ParamsQuery,
  active: boolean = true,
  StaticParams: string = ""
) => {
  const fetchAllUsers = async () => {
    if (!active) return null; // If no ID is provided, return null
    return await UsersManager.getAllUsers(params, StaticParams);
  };
  console.log(StaticParams, "StaticParamsssssssssssss");

  return useQuery<GetUsers>({
    queryKey: ["users", params, StaticParams, active],
    queryFn: fetchAllUsers,
    enabled: !!active,
    retry: false,
  });
};

export const useGetAllUsersLookUp = (
  params: ParamsQuery,
  active: boolean = true
) => {
  const fetchAllUsers = async () => {
    if (!active) return null; // If no ID is provided, return null
    return await UsersManager.getAllUsersLookUp(params);
  };

  return useQuery<GetUsersLookUp>({
    queryKey: ["users", params, active],
    queryFn: fetchAllUsers,
    enabled: !!active,
    retry: false,
  });
};

// Fetch a single user
export const useGetUser = (id?: string, type?: string) => {
  return useQuery<GetUserById>({
    queryKey: ["user", id],
    queryFn: () => UsersManager.getUser(id),
    enabled: !!id && type === "user",
    retry: false,
  });
};
export const useGetUsersOrg = (id?: string, type?: string) => {
  return useQuery<GetUserById>({
    queryKey: ["user", id],
    queryFn: () => UsersManager.getAllUsersLookUp({ organization: id }),
    enabled: !!id && type === "user",
    retry: false,
  });
};

// Fetch a single user
export const useGetProfile = (type?: string) => {
  return useQuery<GetUserProfile>({
    queryKey: ["profileUser"],
    enabled: type !== "user",
    retry: false,
    staleTime: Infinity,
  });
};

export const useGetDefaultUser = (type?: string) => {
  return useQuery<GetUserProfile>({
    queryKey: ["defaultUser"],
    queryFn: () => UsersManager.getDefaultUser(),
    enabled: type === "default",
    retry: false,
  });
};

// Add a new user
export const useAddUser = ({
  type,
  LeaveTheEndpointUnchanged,
}: {
  type: string;
  LeaveTheEndpointUnchanged?: boolean;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: AddUser) =>
      UsersManager.addUser(body, type, LeaveTheEndpointUnchanged),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    retry: false,
  });
};
// update user

export const useUpdateUser = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: FormData) => UsersManager.updateUser(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
    retry: false,
  });
};

export const useUpdateUserPassword = (id?: string) => {
  return useMutation({
    mutationFn: (body: UpdateUserPasswordType) =>
      UsersManager.updateUserPassword(id, body),
    retry: false,
  });
};

// Update a user
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: FormData) => UsersManager.updateProfile(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["profileUser"] });
    },
    retry: false,
  });
};

// Update user license
export const useUpdateUserLicense = (id?: string) => {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<UpdateUserLicense>) =>
      UsersManager.updateUserLicense(id, body),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["users"] });
      // queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
    retry: false,
  });
};

// Delete a user
export const useDeleteUser = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => UsersManager.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    retry: false,
  });
};

// {
//   enabled,
//   // Clear cache when size changes
//   onSuccess: () => {
//     if (params.size) {
//       const previousData = queryClient.getQueryData(queryKeys.list({ ...params, size: params.size - 1 }));
//       if (previousData) {
//         queryClient.removeQueries({
//           queryKey: queryKeys.all,
//           exact: false
//         });
//       }
//     }
//   }
// }
