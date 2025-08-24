import { useGQLMutation } from "@/main/global/api/graphql/config/useGQLMutation";
import { useGQLQuery } from "@/main/global/api/graphql/config/useGQLQuery";
import { GET_ALL_LOOKUP } from "@/main/global/api/graphql/lookup/lookupManager";
import { AllLookupData } from "@/main/global/api/graphql/lookup/Lookuptypes";
import { HttpMethodMudation } from "@/main/global/api/shared/ApiTypes";
import { InvalidateQueryFilters, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { ADD_ATTACHMENT, DELETE_ATTACHMENT, GET_ALL_ATTACHMENTS, GET_ATTACHMENT, GET_ATTACHMENT_BY_NAME, UPDATE_ATTACHMENT } from "./attachmentsManager";
import { AddAttachmentVariables, AllAttachmentsData, Attachment, AttachmentByNameVariables, AttachmentData, AttachmentVariables, DeleteAttachmentVariables, UpdateAttachmentVariables } from "./AttachmentsTypes";

// Hooks

export const useGetAllAttachments = (params: any, enabled: boolean = true) => {
  return useGQLQuery<AllAttachmentsData>(["attachments", params], GET_ALL_ATTACHMENTS, { params }, { enabled });
};

export const useGetAllLookUpAttachments = (params: any, enabled: boolean = true) => {
  return useGQLQuery<AllLookupData>(["attachments", params], GET_ALL_LOOKUP, { params: { ...params, resource: "attachments" } }, { enabled });
};

export const useGetAttachment = (id: number) => {
  return useGQLQuery<AttachmentData, AttachmentVariables>(["attachment", id], GET_ATTACHMENT, { id }, { enabled: !!id });
};

export const useGetLazyAttachment = () => {
  return (id: number) => useGQLQuery<AttachmentData, AttachmentVariables>(["attachment", id], GET_ATTACHMENT, { id }, { enabled: !!id });
};

export const useGetAttachmentByName = (name: string) => {
  return useGQLQuery<AttachmentData, AttachmentByNameVariables>(["attachment", name], GET_ATTACHMENT_BY_NAME, { name }, { enabled: !!name });
};

// Mutations
export const useAddAttachment = (options?: Omit<UseMutationOptions<Attachment, Error, AddAttachmentVariables>, "mutationFn">) => {
  const queryClient = useQueryClient();

  return useGQLMutation<Attachment, AddAttachmentVariables>(
    ADD_ATTACHMENT,
    HttpMethodMudation.POST, // Indicate the HTTP method for the success toast
    {
      ...options,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({
          queryKey: ["attachments"],
        } as InvalidateQueryFilters);
        if (options?.onSuccess) {
          options.onSuccess(data, variables, context);
        }
      },
    },
  );
};

export const useUpdateAttachment = (options?: Omit<UseMutationOptions<Attachment, Error, UpdateAttachmentVariables>, "mutationFn">) => {
  const queryClient = useQueryClient();

  return useGQLMutation<Attachment, UpdateAttachmentVariables>(
    UPDATE_ATTACHMENT,
    HttpMethodMudation.PUT, // HTTP method for the success toast
    {
      ...options,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({
          queryKey: ["attachments"],
        } as InvalidateQueryFilters);
        queryClient.invalidateQueries({
          queryKey: ["attachment", data.id],
        } as InvalidateQueryFilters);
        if (options?.onSuccess) {
          options.onSuccess(data, variables, context);
        }
      },
    },
  );
};

export const useDeleteAttachment = (options?: Omit<UseMutationOptions<{ id: number }, Error, DeleteAttachmentVariables>, "mutationFn">) => {
  const queryClient = useQueryClient();

  return useGQLMutation<{ id: number }, DeleteAttachmentVariables>(
    DELETE_ATTACHMENT,
    HttpMethodMudation.DELETE, // HTTP method for the success toast
    {
      ...options,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({
          queryKey: ["attachments"],
        } as InvalidateQueryFilters);
        if (options?.onSuccess) {
          options.onSuccess(data, variables, context);
        }
      },
    },
  );
};
