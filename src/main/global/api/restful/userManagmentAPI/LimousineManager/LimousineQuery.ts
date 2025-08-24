import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Limousine } from "./LimousineTypes";
import LimousinesManager from "./LimousineManager";

// Fetch all memberships
export const useGetAllLimousines = () => {
  return useQuery<{
    totalItems: number;
    totalPages: number;
    size: number;
    content: Limousine[];
  }>({
    queryKey: ["Limousines"],
    queryFn: LimousinesManager.getAllLimousines,
    enabled: true,
    retry: false,
  });
};

// Fetch a single membership by ID
export const useGetLimousineById = (id?: string) => {
  return useQuery<Limousine>({
    queryKey: ["Limousines", id],
    queryFn: () => LimousinesManager.getLimousine(id!),
    enabled: !!id,
    retry: false,
  });
};
export const useDeleteLimousines = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      LimousinesManager.deleteLimousine(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Limousines"] });
    },
    retry: false,
  });
};
// Add a new membership
export const useEditLimousine = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Limousine) => LimousinesManager.editLimousine(body, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Limousines"] });
    },
    retry: false,
  });
};
export const useAddLimousine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Limousine) => LimousinesManager.addLimousine(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Limousines"] });
    },
    retry: false,
  });
};
export const useAddLimousinePrice = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Limousine) =>
      LimousinesManager.addLimousinePricing(body, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Limousines"] });
    },
    retry: false,
  });
};
