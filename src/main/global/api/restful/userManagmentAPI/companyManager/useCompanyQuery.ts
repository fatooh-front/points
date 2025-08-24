import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  GetCompanies,
  GetCompanyById,
  GetCompaniesLookUp,
  UpdateCompanyLicense,
  UpdateCompanyPasswordType,
  AddCompany,
} from "./companyTypes";
import CompaniesManager from "./companyManager";
import { ParamsQuery } from "@/main/global/types/CommonTypes";

// Fetch all categories
export const useGetAllCompanies = (
  params: ParamsQuery,
  active: boolean = true
) => {
  const fetchAllCompanies = async () => {
    if (!active) return null; // If no ID is provided, return null
    return await CompaniesManager.getAllCompanies(params);
  };

  return useQuery<GetCompanies>({
    queryKey: ["categories", params, active],
    queryFn: fetchAllCompanies,
    enabled: !!active,
    retry: false,
  });
};

export const useGetAllCompaniesLookUp = (
  params: ParamsQuery,
  active: boolean = true
) => {
  const fetchAllCompanies = async () => {
    if (!active) return null; // If no ID is provided, return null
    return await CompaniesManager.getAllCompaniesLookUp(params);
  };

  return useQuery<GetCompaniesLookUp>({
    queryKey: ["categories", params, active],
    queryFn: fetchAllCompanies,
    enabled: !!active,
    retry: false,
  });
};

// Fetch a single company
export const useGetCompany = (id?: string, type?: string) => {
  console.log(type);

  return useQuery<GetCompanyById>({
    queryKey: ["company", id],
    queryFn: () => CompaniesManager.getCompany(id),
    enabled: !!id,
    retry: false,
  });
};

// Fetch a single company
export const useGetProfile = (type?: string) => {
  return useQuery<GetCompanyById>({
    queryKey: ["profileCompany"],
    queryFn: () => CompaniesManager.getProfile(),
    enabled: type !== "company",
    retry: false,
    staleTime: Infinity,
  });
};

export const useGetDefaultCompany = (type?: string) => {
  return useQuery<GetCompanyById>({
    queryKey: ["defaultCompany"],
    queryFn: () => CompaniesManager.getDefaultCompany(),
    enabled: type === "default",
    retry: false,
  });
};

// Add a new company
export const useAddCompany = ({ type }: { type: string }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: AddCompany) => CompaniesManager.addCompany(body, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    retry: false,
  });
};
// update company

export const useUpdateCompany = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: FormData) => CompaniesManager.updateCompany(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["company", id] });
    },
    retry: false,
  });
};

export const useUpdateCompanyPassword = (id?: string) => {
  return useMutation({
    mutationFn: (body: UpdateCompanyPasswordType) =>
      CompaniesManager.updateCompanyPassword(id, body),
    retry: false,
  });
};

// Update a company
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: FormData) => CompaniesManager.updateProfile(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["company"] });
      queryClient.invalidateQueries({ queryKey: ["profileCompany"] });
    },
    retry: false,
  });
};

// Update company license
export const useUpdateCompanyLicense = (id?: string) => {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<UpdateCompanyLicense>) =>
      CompaniesManager.updateCompanyLicense(id, body),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["categories"] });
      // queryClient.invalidateQueries({ queryKey: ["company", id] });
    },
    retry: false,
  });
};

// Delete a company
export const useDeleteCompany = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => CompaniesManager.deleteCompany(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
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
