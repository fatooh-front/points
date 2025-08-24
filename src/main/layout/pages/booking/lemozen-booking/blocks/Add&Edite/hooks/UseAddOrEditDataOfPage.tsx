import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { getChangedFields } from "@/main/global/utils/objectUtils";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import { ReservationDetails } from "@/main/global/api/restful/userManagmentAPI/BookingManager/BookingTypes";
import { useGetReservationLimousineDetails } from "@/main/global/api/restful/userManagmentAPI/BookingManager/BookingQuery";
import BookingManager from "@/main/global/api/restful/userManagmentAPI/BookingManager/BookingManager";

export function UseAddOrEditReservationDetails() {
  const { id } = useParams();
  const { data: reservationDetails, refetch } =
    useGetReservationLimousineDetails(id); // تأكد من hook موجود
  const { t } = useTranslation("limousine");
  console.log(reservationDetails, "reservationDetails");

  const formSchema = z.object({
    reservationDate: z.string(),
    reservationType: z.string(),
    fromPlace: z.union([z.string(), z.number()]),
    toPlace: z.union([z.string(), z.number()]),
    flightNumber: z.string(),
    cityId: z.union([z.string(), z.number()]),
    latitude: z.union([z.string(), z.number()]),
    longitude: z.union([z.string(), z.number()]),
    toCityId: z.union([z.string(), z.number()]).nullable(),
    toLatitude: z.union([z.string(), z.number()]).nullable(),
    toLongitude: z.union([z.string(), z.number()]).nullable(),
    hours: z.union([z.string(), z.number()]).nullable(),
    days: z.union([z.string(), z.number()]).nullable(),
    total: z.union([z.string(), z.number()]),
    promoId: z.union([z.string(), z.number()]).nullable(),
    discount: z.union([z.string(), z.number()]),
    memberDiscount: z.union([z.string(), z.number()]),
    pointsDiscount: z.union([z.string(), z.number()]),
    vat: z.union([z.string(), z.number()]),
    finalAmount: z.union([z.string(), z.number()]),
    paymentType: z.string().nullable(),
    paymentAmount: z.union([z.string(), z.number()]).nullable(),
    notes: z.string().nullable(),
    address: z.string().nullable(),
    toAddress: z.string().nullable(),
    mobile: z.any(),
    reservationStatus: z.any(),
    googleMapUrlFrom: z.any(),
    googleMapUrlTo: z.any(),
  });

  function formatTimeOnly(dateString: any) {
    if (!dateString) return "—"; // لو مفيش تاريخ
    const date = new Date(dateString);

    // لو التاريخ مش صالح (Invalid Date)
    if (isNaN(date.getTime())) return "—";

    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }
  const defaultValues: Partial<ReservationDetails> & {
    googleMapUrlFrom: string;
    googleMapUrlTo: string;
    reservationTime: string;
  } = {
    clientFirstName: reservationDetails?.clientFirstName || "",
    mobile: reservationDetails?.mobile || "",
    carName: reservationDetails?.carName || "",
    reservationDate: reservationDetails?.reservationDate || "",
    reservationType: reservationDetails?.reservationType || "",
    addedServicesTotalPrice: reservationDetails?.addedServicesTotalPrice || 0,
    fromPlace: reservationDetails?.fromPlace
      ? reservationDetails?.fromPlace
      : reservationDetails?.reservationType === "AIRPORT"
      ? "مطار الملك عبد العزيز الدولي"
      : "",
    toPlace: reservationDetails?.toPlace
      ? reservationDetails?.toPlace
      : reservationDetails?.reservationType === "AIRPORT"
      ? "مطار الملك عبد العزيز الدولي"
      : "",
    cityId: reservationDetails?.cityId || "",
    latitude: reservationDetails?.latitude || "",
    longitude: reservationDetails?.longitude || "",
    toCityId: reservationDetails?.toCityId || null,
    toLatitude: reservationDetails?.toLatitude || null,
    toLongitude: reservationDetails?.toLongitude || null,
    hours: reservationDetails?.hours || null,
    days: reservationDetails?.days || null,
    total: reservationDetails?.total || 0,
    promoId: reservationDetails?.promoId || null,
    discount: reservationDetails?.discount || 0,
    memberDiscount: reservationDetails?.memberDiscount || 0,
    pointsDiscount: reservationDetails?.pointsDiscount || 0,
    vat: reservationDetails?.vat || 0,
    finalAmount: reservationDetails?.finalAmount || 0,
    paymentType: reservationDetails?.paymentType || null,
    reservationStatus: reservationDetails?.reservationStatus || "",
    paymentAmount: reservationDetails?.paymentAmount || null,
    notes: reservationDetails?.notes || null,
    address:
      reservationDetails?.address ||
      reservationDetails?.reservationType === "AIRPORT"
        ? "مطار الملك عبد العزيز الدولي"
        : "",
    toAddress:
      reservationDetails?.toAddress ||
      reservationDetails?.reservationType === "AIRPORT"
        ? "مطار الملك عبد العزيز الدولي"
        : "",
    flightNumber: reservationDetails?.flightNumber || "",
    googleMapUrlFrom:
      reservationDetails?.latitude && reservationDetails?.latitude
        ? `https://www.google.com/maps?q=${reservationDetails?.latitude},${reservationDetails?.latitude}`
        : reservationDetails?.reservationType === "AIRPORT"
        ? "مطار الملك عبد العزيز الدولي"
        : "",
    googleMapUrlTo:
      reservationDetails?.toLatitude && reservationDetails?.toLongitude
        ? `https://www.google.com/maps?q=${reservationDetails?.toLatitude},${reservationDetails?.toLongitude}`
        : reservationDetails?.reservationType === "AIRPORT"
        ? "مطار الملك عبد العزيز الدولي"
        : "",
    reservationTime: formatTimeOnly(reservationDetails?.reservationDate),
  };
  const statusOptions = [
    { value: "PAYMENT_PENDING", label: "انتظار الدفع" },
    { value: "NOT_STARTED", label: "لم يبدأ" },
    { value: "APPROVED", label: "مؤكد" },
    { value: "ACTIVE", label: "نشط الآن" },
    { value: "FINISHED", label: "مكتمل" },
    { value: "CANCELLED", label: "ملغي" },
  ];

  function getAllowedOptions(
    status_server: string = reservationDetails?.reservationStatus ?? ""
  ) {
    switch (status_server) {
      case "APPROVED  ": // Not Started
        return statusOptions.filter(
          (opt) =>
            opt.value === "NOT_STARTED" ||
            opt.value === "ACTIVE" ||
            opt.value === "CANCELLED"
        ); // Confirmed or Canceled
      case "NOT_STARTED": // Not Started
        return statusOptions.filter(
          (opt) =>
            opt.value === "NOT_STARTED" ||
            opt.value === "ACTIVE" ||
            opt.value === "CANCELLED"
        ); // Confirmed or Canceled
      case "ACTIVE": // Active
        return statusOptions.filter(
          (opt) => opt.value === "ACTIVE" || opt.value === "FINISHED"
        ); // Finished
      case "FINISHED": // Active
        return statusOptions.filter((opt) => opt.value === "FINISHED"); // Finished
      case "CANCELLED": // Active
        return statusOptions.filter((opt) => opt.value === "CANCELLED"); // Finished
      case "PAYMENT_PENDING": // Active
        return statusOptions.filter((opt) => opt.value === "PAYMENT_PENDING"); // Finished
      default: // Canceled or Finished
        return []; // لا يمكن تعديل الحالة
    }
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (reservationDetails) {
      form.reset(defaultValues);
    }
  }, [reservationDetails, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const changedValues = getChangedFields({}, values);

    if (Object.keys(changedValues).length === 0) {
      toast({
        variant: "destructive",
        title: t("toast.noChanges.title"),
        description: t("toast.noChanges.description"),
      });
      return;
    }

    // TODO: replace with mutation
    console.log("Send updated values", changedValues);
  }
  const onChangeStatus = (value: string) => {
    BookingManager.changeStatusLimousineReservation(`${id}`, value)
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
    onSubmit,
    onChangeStatus,
    getAllowedOptions,
    isLoading: false,
  };
}
