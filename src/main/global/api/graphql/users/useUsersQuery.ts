import { useGQLMutation } from "@/main/global/api/graphql/config/useGQLMutation";
import { useGQLQuery } from "@/main/global/api/graphql/config/useGQLQuery";
import { GET_ALL_LOOKUP } from "@/main/global/api/graphql/lookup/lookupManager";
import { HttpMethodMudation } from "@/main/global/api/shared/ApiTypes";
import { InvalidateQueryFilters, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { ADD_USER, DELETE_USER, GET_ALL_USERS, GET_USER, GET_USER_BY_NAME, UPDATE_USER } from "./usersManager";
import { AddUserVariables, AllUsersData, AllUsersLookupData, DeleteUserVariables, UpdateUserVariables, User, UserByNameVariables, UserData, UserVariables } from "./UsersTypes";

// Hooks

export const useGetAllUsers = (params: any, enabled: boolean = true) => {
  return useGQLQuery<AllUsersData>(["users", params], GET_ALL_USERS, { params }, { enabled });
};

export const useGetAllLookUpUsers = (params: any, enabled: boolean = true) => {
  return useGQLQuery<AllUsersLookupData>(["users", params], GET_ALL_LOOKUP, { params: { ...params, resource: "users" } }, { enabled });
};

export const useGetUser = (id: number) => {
  return useGQLQuery<UserData, UserVariables>(["user", id], GET_USER, { id }, { enabled: !!id });
};

export const useGetLazyUser = () => {
  return (id: number) => useGQLQuery<UserData, UserVariables>(["user", id], GET_USER, { id }, { enabled: !!id });
};

export const useGetUserByName = (name: string) => {
  return useGQLQuery<UserData, UserByNameVariables>(["user", name], GET_USER_BY_NAME, { name }, { enabled: !!name });
};

export const useAddUser = (options?: Omit<UseMutationOptions<User, Error, AddUserVariables>, "mutationFn">) => {
  const queryClient = useQueryClient();

  return useGQLMutation<User, AddUserVariables>(
    ADD_USER,
    HttpMethodMudation.POST, // Indicate the HTTP user for the success toast
    {
      ...options,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({
          queryKey: ["users"],
        } as InvalidateQueryFilters);
        if (options?.onSuccess) {
          options.onSuccess(data, variables, context);
        }
      },
    },
  );
};

export const useUpdateUser = (options?: Omit<UseMutationOptions<User, Error, UpdateUserVariables>, "mutationFn">) => {
  const queryClient = useQueryClient();

  return useGQLMutation<User, UpdateUserVariables>(
    UPDATE_USER,
    HttpMethodMudation.PUT, // HTTP user for the success toast
    {
      ...options,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({
          queryKey: ["users"],
        } as InvalidateQueryFilters);
        queryClient.invalidateQueries({
          queryKey: ["user", data.id],
        } as InvalidateQueryFilters);
        if (options?.onSuccess) {
          options.onSuccess(data, variables, context);
        }
      },
    },
  );
};

export const useDeleteUser = (options?: Omit<UseMutationOptions<{ id: number }, Error, DeleteUserVariables>, "mutationFn">) => {
  const queryClient = useQueryClient();

  return useGQLMutation<{ id: number }, DeleteUserVariables>(
    DELETE_USER,
    HttpMethodMudation.DELETE, // HTTP user for the success toast
    {
      ...options,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({
          queryKey: ["users"],
        } as InvalidateQueryFilters);
        if (options?.onSuccess) {
          options.onSuccess(data, variables, context);
        }
      },
    },
  );
};
