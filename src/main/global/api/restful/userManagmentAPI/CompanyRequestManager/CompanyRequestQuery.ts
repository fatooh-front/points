import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CompanyRequest } from "./CompanyRequestTypes";
import { ParamsQuery } from "@/main/global/types/CommonTypes";
import CompanyRequestsManager from "./CompanyRequestManager";

// Fetch all Banners
// ===== React Query Hooks =====
export const useGetAllCompanyRequests = (params: ParamsQuery) => {
  return useQuery<{
    data: {
      totalItems: number;
      totalPages: number;
      size: number;
      content: CompanyRequest[];
    };
  }>({
    queryKey: ["CompanyRequests", params],
    queryFn: () => CompanyRequestsManager.getAllCompanyRequests(params),
    enabled: true,
    retry: false,
  });
};

export const useGetCompanyRequest = (id?: string) => {
  return useQuery<{
    data: CompanyRequest;
  }>({
    queryKey: ["CompanyRequest", id],
    queryFn: () => CompanyRequestsManager.getCompanyRequest(id),
    enabled: !!id,
    retry: false,
  });
};

export const useDeleteCompanyRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      CompanyRequestsManager.deleteCompanyRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CompanyRequests"] });
    },
    retry: false,
  });
};

export const useAddCompanyRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CompanyRequest) =>
      CompanyRequestsManager.addCompanyRequest(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CompanyRequests"] });
    },
    retry: false,
  });
};
