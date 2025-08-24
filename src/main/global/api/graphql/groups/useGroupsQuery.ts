import { useGQLMutation } from "@/main/global/api/graphql/config/useGQLMutation";
import { useGQLQuery } from "@/main/global/api/graphql/config/useGQLQuery";
import { GET_ALL_LOOKUP } from "@/main/global/api/graphql/lookup/lookupManager";
import { HttpMethodMudation } from "@/main/global/api/shared/ApiTypes";
import { InvalidateQueryFilters, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { ADD_GROUP, DELETE_GROUP, GET_ALL_GROUPS, GET_GROUP, GET_GROUP_BY_NAME, UPDATE_GROUP } from "./groupsManager";
import { AddGroupVariables, AllGroupsData, AllGroupsLookupData, DeleteGroupVariables, Group, GroupByNameVariables, GroupData, GroupVariables, UpdateGroupVariables } from "./GroupsTypes";

// Hooks

export const useGetAllGroups = (params: any, enabled: boolean = true) => {
  return useGQLQuery<AllGroupsData>(["groups", params], GET_ALL_GROUPS, { params }, { enabled });
};

export const useGetAllLookUpGroups = (params: any, enabled: boolean = true) => {
  return useGQLQuery<AllGroupsLookupData>(["groups", params], GET_ALL_LOOKUP, { params: { ...params, resource: "groups" } }, { enabled });
};

export const useGetGroup = (id: number) => {
  return useGQLQuery<GroupData, GroupVariables>(["group", id], GET_GROUP, { id }, { enabled: !!id });
};

export const useGetLazyGroup = () => {
  return (id: number) => useGQLQuery<GroupData, GroupVariables>(["group", id], GET_GROUP, { id }, { enabled: !!id });
};

export const useGetGroupByName = (name: string) => {
  return useGQLQuery<GroupData, GroupByNameVariables>(["group", name], GET_GROUP_BY_NAME, { name }, { enabled: !!name });
};

export const useAddGroup = (options?: Omit<UseMutationOptions<Group, Error, AddGroupVariables>, "mutationFn">) => {
  const queryClient = useQueryClient();

  return useGQLMutation<Group, AddGroupVariables>(
    ADD_GROUP,
    HttpMethodMudation.POST, // Indicate the HTTP group for the success toast
    {
      ...options,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({
          queryKey: ["groups"],
        } as InvalidateQueryFilters);
        if (options?.onSuccess) {
          options.onSuccess(data, variables, context);
        }
      },
    },
  );
};

export const useUpdateGroup = (options?: Omit<UseMutationOptions<Group, Error, UpdateGroupVariables>, "mutationFn">) => {
  const queryClient = useQueryClient();

  return useGQLMutation<Group, UpdateGroupVariables>(
    UPDATE_GROUP,
    HttpMethodMudation.PUT, // HTTP group for the success toast
    {
      ...options,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({
          queryKey: ["groups"],
        } as InvalidateQueryFilters);
        queryClient.invalidateQueries({
          queryKey: ["group", data.id],
        } as InvalidateQueryFilters);
        if (options?.onSuccess) {
          options.onSuccess(data, variables, context);
        }
      },
    },
  );
};

export const useDeleteGroup = (options?: Omit<UseMutationOptions<{ id: number }, Error, DeleteGroupVariables>, "mutationFn">) => {
  const queryClient = useQueryClient();

  return useGQLMutation<{ id: number }, DeleteGroupVariables>(
    DELETE_GROUP,
    HttpMethodMudation.DELETE, // HTTP group for the success toast
    {
      ...options,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({
          queryKey: ["groups"],
        } as InvalidateQueryFilters);
        if (options?.onSuccess) {
          options.onSuccess(data, variables, context);
        }
      },
    },
  );
};
