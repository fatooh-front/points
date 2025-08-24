import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { getChangedFields } from "@/main/global/utils/objectUtils";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";

import {
  useAddLimousine,
  useEditLimousine,
} from "@/main/global/api/restful/userManagmentAPI/LimousineManager/LimousineQuery";
import { useGetMaintenanceRequest } from "@/main/global/api/restful/userManagmentAPI/BookingManager/BookingQuery";

// 🔄 Replace "Limousine" with your real query/mutation methods for maintenance requests if needed.

const formSchema = z.object({
  reqId: z.number().optional(),
  carName: z.string().min(1, "Car name is required"),
  clientName: z.string().min(1, "Client name is required"),
  clientPhone: z.string().min(1, "Client phone is required"),
  rqDate: z.string(), // Should be validated as a date string
  reqStatus: z.number(),
  reservationId: z.number(),
  reqComments: z.string(),
  finishDate: z.string().nullable(),
  finishComments: z.string().nullable(),
  notes: z.string(),
});

export function UseAddOrEditMaintenanceRequest() {
  const { id } = useParams();
  const { mutate: mutateAdd } = useAddLimousine(); // Change this if needed
  const { mutate: mutateEdit } = useEditLimousine(`${id}`); // Change this if needed
  const {
    data: DataOfRequest,
    isLoading,
    isError,
    refetch,
  } = useGetMaintenanceRequest(id); // Change if needed
  const { t: toastT } = useTranslation("toast");
  const navigate = useNavigate();

  const defaultValues: z.infer<typeof formSchema> = {
    reqId: DataOfRequest?.reqId || undefined,
    carName: DataOfRequest?.carName || "",
    clientName: DataOfRequest?.clientName || "",
    clientPhone: DataOfRequest?.clientPhone || "",
    rqDate: DataOfRequest?.rqDate?.split("T")?.[0] || "",
    reqStatus: DataOfRequest?.reqStatus ?? 1,
    reservationId: DataOfRequest?.reservationId ?? 0,
    reqComments: DataOfRequest?.reqComments || "",
    finishDate: DataOfRequest?.finishDate?.split("T")?.[0] || null,
    finishComments: DataOfRequest?.finishComments || null,
    notes: DataOfRequest?.notes || "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (DataOfRequest) {
      form.reset(defaultValues);
    }
  }, [DataOfRequest]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const sendValues = { ...values };
    const originalValues = {}; // Optionally replace with `DataOfRequest` if you want diffing
    const changedValues = getChangedFields(originalValues, sendValues);

    if (Object.keys(changedValues).length === 0) {
      toast({
        variant: "destructive",
        title: toastT("toast.noChanges.title"),
        description: toastT("toast.noChanges.description"),
      });
      return;
    }

    const onSuccess = () => {
      toast({
        title: toastT("toast.success.title"),
        description: toastT("toast.success.description"),
      });
      form.reset();
      navigate("/maintenance/requests"); // Update route as needed
    };

    const onError = (error: Error) => {
      console.error("Error submitting request:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "حدث خطأ أثناء الحفظ، حاول مرة أخرى.",
      });
    };

    if (!id) {
      mutateAdd(sendValues, { onSuccess, onError });
    } else {
      mutateEdit(sendValues, { onSuccess, onError });
    }
  }

  const onReset = () => {
    form.reset(defaultValues);
  };
  return {
    form,
    onSubmit,
    isLoading,
    refetch,
    isError,
    onReset,
  };
}
