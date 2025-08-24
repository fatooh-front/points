// ----------- Clients Management ----------

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ClientsManager from "./clientsManager";
import { ParamsQuery } from "@/main/global/types/CommonTypes";
import { Client } from "./clientsTypes";

export const useGetAllClients = (
  params: ParamsQuery,
  enabled: boolean = true
) => {
  return useQuery<{
    totalItems: number;
    totalPages: number;
    size: number;
    content: Client[];
  }>({
    enabled: enabled,
    queryKey: ["clients", params],
    queryFn: () => ClientsManager.getAllClients(params),
    retry: false,
  });
};
export const useGetAllLookUpClients = (params: ParamsQuery) => {
  return useQuery<{
    data: Client[];
  }>({
    queryKey: ["clients", params],
    queryFn: () => ClientsManager.getAllLookUpClients(params),
    retry: false,
  });
};

export const useGetClient = (id?: string | number) => {
  return useQuery<{ data: Client }>({
    queryKey: ["client", id],
    queryFn: () => ClientsManager.getClient(id),
    enabled: !!id,
    retry: false,
  });
};
export const useGetClientPoints = (id?: string | number) => {
  return useQuery<{ data: number }>({
    queryKey: ["ClientPoints ", id],
    queryFn: () => ClientsManager.getClientPoint(id),
    enabled: !!id,
    retry: false,
  });
};

export const useClientPointsUse = (clientId: number | string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: { clientId: number | string; pointsUsed: number }) =>
      ClientsManager.ClientPointsUse(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ClientPoints", clientId] });
    },
    retry: false,
  });
};
export const useAddOrUpdateClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: any) => ClientsManager.addOrUpdateClient(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
    retry: false,
  });
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => ClientsManager.deleteClient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
    retry: false,
  });
};
