import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GetCity, GetCitys } from "./CityTypes.ts";
import CityManager from "./CityManager.tsx";

// Fetch all users
export const useGetAllCity = () => {
  const fetchAllCity = async () => {
    return await CityManager.getAllCity();
  };

  return useQuery<GetCitys>({
    queryKey: ["City"],
    queryFn: fetchAllCity,
    enabled: true,
    retry: false,
  });
};

// Add a new City
export const useAddCity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: GetCity) => CityManager.addCity(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["City"] });
    },
    retry: false,
  });
};
// update City

// Delete a City
export const useDeleteCity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => CityManager.deleteCity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["City"] });
    },
    retry: false,
  });
};
