import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  GetCarss,
  GetCarsById,
  AddCars,
  GetExtrakmDataByCarId,
  ExtrakmData,
  GetWorkingHours,
  WorkingHours,
  GetCars,
} from "./carsTypes";
import CarssManager from "./carsManager";
import { ParamsQuery } from "@/main/global/types/CommonTypes";

// Fetch all users
export const useGetAllCarss = (
  params: ParamsQuery,
  active: boolean = true,
  searchText: string,

  StaticParams: string = ""
) => {
  const fetchAllCarss = async () => {
    if (!active) return null; // If no ID is provided, return null
    return await CarssManager.getAllCars(params);
  };
  console.log(StaticParams, "StaticParamsssssssssssss");

  return useQuery<GetCarss>({
    queryKey: ["cars", params, StaticParams, active, searchText],
    queryFn: fetchAllCarss,
    enabled: !!active,
    retry: false,
  });
};
export const useGetCarbyName = (params: ParamsQuery, active: boolean) => {
  const fetchAllCarss = async () => {
    // If no ID is provided, return null
    return await CarssManager.getAllCarsbyName(params);
  };

  return useQuery<GetCars[]>({
    queryKey: ["cars_name", params],
    queryFn: fetchAllCarss,
    retry: false,
    enabled: !!active,
  });
};

// Fetch a single cars
export const useGetCars = (id?: string) => {
  return useQuery<GetCarsById>({
    queryKey: ["cars", id],
    queryFn: () => CarssManager.getCars(id),
    enabled: !!id,
    retry: false,
  });
};
export const useGetCarExtrakm = (id?: string) => {
  return useQuery<GetExtrakmDataByCarId>({
    queryKey: ["extrakm ", id],
    queryFn: () => CarssManager.getCarExtrakm(id),
    enabled: !!id,
    retry: false,
  });
};
export const useGetCarBranchbyCar = (id?: string, isFormFormat?: boolean) => {
  return useQuery<any>({
    queryKey: ["CarOnbranchs ", id],
    queryFn: () => CarssManager.getCarBranchbyCar(id, isFormFormat),
    enabled: !!id,
    retry: false,
  });
};
export const useGetWorkinghours = (id?: string | number) => {
  return useQuery<GetWorkingHours>({
    queryKey: ["Workinghours ", id],
    queryFn: () => CarssManager.getWorkinghours(id),
    enabled: !!id,
    retry: false,
  });
};
export const useSetCurrentWorkingDay = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => CarssManager.setCurrentWorkingDay(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Workinghours"] });
    },
    retry: false,
  });
};
// Add a new cars
export const useAddWorkinghours = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: WorkingHours) => CarssManager.addWorkingHours(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Workinghours"] });
    },
    retry: false,
  });
};
export const useAddCarExtrakm = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: ExtrakmData) => CarssManager.addExtrakm(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["extrakm"] });
    },
    retry: false,
  });
};
export const useAddCars = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: AddCars) => CarssManager.addCars(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
    retry: false,
  });
};
export const useCarOnbranchs = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: any) => CarssManager.addCarOnbranchs(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CarOnbranchs"] });
    },
    retry: false,
  });
};
// update cars

// Delete a cars
export const useDeleteCarBranchs = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => CarssManager.deleteCarBranchs(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CarOnbranchs"] });
    },
    retry: false,
  });
};
export const useDeleteCars = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => CarssManager.deleteCars(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
    retry: false,
  });
};
export const useDeleteExtrakm = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => CarssManager.deleteExtrakm(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["extrakm"] });
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
