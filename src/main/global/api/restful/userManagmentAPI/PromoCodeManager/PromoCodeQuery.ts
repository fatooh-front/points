import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Promo } from "./PromoCodeTypes";
import PromosManager from "./PromoCodeManager";
import { ParamsQuery } from "@/main/global/types/CommonTypes";

// Fetch all promos
export const useGetAllPromos = (params: ParamsQuery) => {
  return useQuery<{
    data: {
      totalItems: number;
      totalPages: number;
      size: number;
      content: Promo[];
    };
  }>({
    queryKey: ["Promos", params],
    queryFn: () => PromosManager.getAllPromos(params),
    enabled: true,
    retry: false,
  });
};

// Fetch a single promo by ID
export const useGetPromoById = (id?: string) => {
  return useQuery<{ data: Promo }>({
    queryKey: ["Promos", id],
    queryFn: () => PromosManager.getPromo(id!),
    enabled: !!id,
    retry: false,
  });
};
export const useDeletePromo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => PromosManager.deletePromo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Promos"] });
    },
    retry: false,
  });
};
// Add a new promo
export const useAddPromo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Promo) => PromosManager.addPromo(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Promos"] });
    },
    retry: false,
  });
};
