import { useQuery } from "@tanstack/react-query";
import {
  LimousineReservation,
  MaintenanceRequest,
  Reservation,
  ReservationDetails,
} from "./BookingTypes";
import BookingManager from "./BookingManager";
import { ParamsQuery } from "@/main/global/types/CommonTypes";

// Fetch all Reservation
export const useGetAllReservation = (params: ParamsQuery) => {
  console.log(params, "ggggs");

  return useQuery<{
    data: {
      totalItems: number;
      totalPages: number;
      size: number;
      content: Reservation[];
    };
  }>({
    queryKey: ["Reservation", params],
    queryFn: () => BookingManager.getAllReservation(params),
    enabled: true,
    retry: false,
  });
};
export const useGetAllLimousineReservation = (params: ParamsQuery) => {
  console.log(params, "ggggs");

  return useQuery<{
    totalItems: number;
    totalPages: number;
    size: number;
    content: LimousineReservation[];
  }>({
    queryKey: ["Limousine", params],
    queryFn: () => BookingManager.getAllLimousineReservation(params),
    enabled: true,
    retry: false,
  });
};
export const useGetReservationLimousineDetails = (id?: string) => {
  return useQuery<ReservationDetails>({
    queryKey: ["Limousine", id],
    queryFn: () => BookingManager.getLimousineReservationDetails(id),
    enabled: !!id,
    retry: false,
  });
};
export const useGetReservation = (id?: string) => {
  return useQuery<{
    data: Reservation;
  }>({
    queryKey: ["Reservation", id],
    queryFn: () => BookingManager.getReservation(id),
    enabled: !!id,
    retry: false,
  });
};
export const useGetAllMaintenanceRequest = (params: ParamsQuery) => {
  console.log(params, "ggggs");

  return useQuery<{
    totalItems: number;
    totalPages: number;
    size: number;
    content: MaintenanceRequest[];
  }>({
    queryKey: ["MaintenanceRequest", params],
    queryFn: () => BookingManager.getAllMaintenanceRequests(params),
    enabled: true,
    retry: false,
  });
};
export const useGetMaintenanceRequest = (id?: string) => {
  return useQuery<MaintenanceRequest>({
    queryKey: ["MaintenanceRequest", id],
    queryFn: () => BookingManager.getMaintenanceRequests(id),
    enabled: !!id,
    retry: false,
  });
};
