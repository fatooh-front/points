import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CRMManager from "./CustomerServiceManager";
import { ParamsQuery } from "@/main/global/types/CommonTypes";
import { Lead } from "./CustomerServiceTypes";

export const useGetAllLeads = (params: ParamsQuery) => {
  return useQuery<{
    data: {
      totalItems: number;
      totalPages: number;
      size: number;
      content: Lead[];
    };
  }>({
    queryKey: ["Lead", params],
    queryFn: () => CRMManager.getAllLeads(params),
    enabled: true,
    retry: false,
  });
};

export const useGetLead = (id?: string) => {
  return useQuery<{
    data: Lead;
  }>({
    queryKey: ["Lead", id],
    queryFn: () => CRMManager.getLead(id),
    enabled: !!id,
    retry: false,
  });
};

export const useDeleteLead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => CRMManager.deleteLead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Lead"] });
    },
    retry: false,
  });
};

export const useAddLead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Lead) => CRMManager.addLead(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Lead"] });
    },
    retry: false,
  });
};
