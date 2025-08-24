import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import { useGetReservation } from "@/main/global/api/restful/userManagmentAPI/BookingManager/BookingQuery";
import BookingManager from "@/main/global/api/restful/userManagmentAPI/BookingManager/BookingManager";

export function UseAddOrEditReservationDataPage() {
  const { id } = useParams();

  const { data: DataOfReservation, refetch, isLoading } = useGetReservation(id);

  const formSchema = z.object({
    reservationStatus: z.number(),
    paymentMethod: z.number(),
    startDate: z.string(),
    endDate: z.string(),
    days: z.number(),
    fromBranchId: z.number(),
    toBranchId: z.number(),
    clientName: z.string(),
    serviceIds: z.record(z.boolean()),

    clientMobile: z.string().nullable(),
    carName: z.string(),
    pickupLongitude: z.number().nullable(),
    pickupLatitude: z.number().nullable(),
    deliveryLongitude: z.number().nullable(),
    deliveryLatitude: z.number().nullable(),
    googleMapUrlDelivery: z.string(),
    googleMapUrlPickup: z.string(),
    deliveryType: z.string(),
    pickupAddress: z.string().nullable(),
    deliveryAddress: z.string().nullable(),
  });

  const defaultValues = {
    reservationStatus: DataOfReservation?.data?.reservationStatus ?? 0,
    paymentMethod: DataOfReservation?.data?.paymentMethod ?? 0,
    startDate: DataOfReservation?.data?.startDate ?? "",
    endDate: DataOfReservation?.data?.endDate ?? "",
    days: DataOfReservation?.data?.days ?? 1,
    fromBranchId: DataOfReservation?.data?.fromBranchId ?? 0,
    toBranchId: DataOfReservation?.data?.toBranchId ?? 0,
    clientName: DataOfReservation?.data?.clientName ?? "",
    clientMobile: DataOfReservation?.data?.clientMobile ?? null,
    carName: DataOfReservation?.data?.carName ?? "",
    pickupLongitude: DataOfReservation?.data?.pickupLongitude ?? null,
    pickupLatitude: DataOfReservation?.data?.pickupLatitude ?? null,
    deliveryLongitude: DataOfReservation?.data?.deliveryLongitude ?? null,
    deliveryLatitude: DataOfReservation?.data?.deliveryLatitude ?? null,
    deliveryAddress: DataOfReservation?.data?.deliveryAddress ?? null,
    pickupAddress: DataOfReservation?.data?.pickupAddress ?? null,
    googleMapUrlDelivery: `https://www.google.com/maps?q=${DataOfReservation?.data?.deliveryLatitude},${DataOfReservation?.data?.deliveryLongitude}`,
    googleMapUrlPickup: `https://www.google.com/maps?q=${DataOfReservation?.data?.pickupLatitude},${DataOfReservation?.data?.pickupLongitude}`,
    deliveryType: DataOfReservation?.data?.deliveryLatitude ? "1" : "0",
    pickupType: DataOfReservation?.data?.pickupLatitude ? "1" : "0",
    serviceIds: DataOfReservation?.data.serviceIds
      ? Object.fromEntries(
          DataOfReservation.data.serviceIds
            .split(",")
            .map((item) => item.trim())
            .map((key) => [key, true])
        )
      : {},
  };
  const statusOptions = [
    { value: 1, label: "قيد الانتظار" },
    { value: 2, label: "مؤكد" },
    { value: 3, label: "نشط الآن" },
    { value: 4, label: "مكتمل" },
    { value: 5, label: "ملغي" },
  ];

  // الحالات المسموح بيها بناءً على الحالة الحالية من السيرفر
  function getAllowedOptions(
    status_server: number = DataOfReservation?.data?.reservationStatus ?? 0
  ) {
    switch (status_server) {
      case 1: // Not Started
        return statusOptions.filter(
          (opt) =>
            opt.value === 3 ||
            opt.value === 5 ||
            opt.value === 1 ||
            opt.value === 2
        ); // Confirmed or Canceled
      case 2: // Not Started
        return statusOptions.filter(
          (opt) => opt.value === 3 || opt.value === 5 || opt.value === 2
        ); // Confirmed or Canceled

      case 3: // Active
        return statusOptions.filter(
          (opt) => opt.value === 4 || opt.value === 3
        ); // Finished
      case 4: // Active
        return statusOptions.filter((opt) => opt.value === 4); // Finished
      case 5: // Active
        return statusOptions.filter((opt) => opt.value === 5); // Finished
      default: // Canceled or Finished
        return []; // لا يمكن تعديل الحالة
    }
  }
  console.log("defaultValues", defaultValues);

  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (DataOfReservation?.data) {
      form.reset(defaultValues as any);
    }
  }, [DataOfReservation?.data]);
  const onChangeStatus = (value: string) => {
    BookingManager.changeStatusReservation(`${id}`, value)
      .then(() => {
        form.reset(defaultValues as any);

        refetch();
      })
      .catch(() => {
        form.reset(defaultValues as any);

        refetch();
      });
  };
  return {
    form,
    data: DataOfReservation?.data,
    onChangeStatus,
    statusOptions,
    isLoading: isLoading,
    getAllowedOptions,
  };
}
