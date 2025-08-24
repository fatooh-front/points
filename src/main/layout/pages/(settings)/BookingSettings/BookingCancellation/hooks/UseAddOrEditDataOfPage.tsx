import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { getChangedFields } from "@/main/global/utils/objectUtils";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useAddBookingCancel,
  useDeleteBookingCancel,
  useGetBookingCancel,
} from "@/main/global/api/restful/userManagmentAPI/BookingSettingsManager/bookingSettingsQuery";

type Props = {
  // DataOfBrancheOptions?: Option[];
  DataOfBranche?: any;
  type?: string;
};
export function UseAddOrEditDataOfPage({}: // DataOfBrancheOptions,
Props) {
  const { mutate: mutateAdd } = useAddBookingCancel();
  const { mutate: mutateDelete } = useDeleteBookingCancel();
  const { data: arrayrReason, refetch } = useGetBookingCancel();

  const { t: toastT } = useTranslation("toast");

  const formSchema = z.object({
    reason_id: z.union([z.string(), z.number()]).optional().nullable(),
    englishName: z
      .string({
        message: "الرجاء إدخال اسم السبب باللغة الإنجليزية",
      })
      .min(1, {
        message: "الرجاء إدخال اسم السبب باللغة الإنجليزية",
      }),
    arabicName: z
      .string({
        message: "الرجاء إدخال اسم السبب باللغة العربية",
      })
      .min(1, {
        message: "الرجاء إدخال اسم السبب باللغة العربية",
      }),
    notes: z.string().optional().nullable(),
  });

  const defaultValues = {};
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const sendValues = {
      ...values,
    };

    const originalValues = {};

    const changedValues = getChangedFields(originalValues, sendValues);

    if (Object.keys(changedValues).length === 0) {
      toast({
        variant: "destructive",
        color: "white",
        title: toastT("toast.noChanges.title"),
        description: toastT("toast.noChanges.description"),
      });
      return;
    }
    const onSuccess = () => {
      console.log("DataOfBranche edited successfully");
      form.reset({
        reason_id: "",
        englishName: "",
        arabicName: "",
      });
      refetch();
      // navigate("/settings/branches");
    };
    const onError = (error: Error) => {
      console.error("Error editing DataOfBranche:", error);
    };
    mutateAdd(sendValues, {
      onSuccess,
      onError,
    });
  }

  return {
    form,
    onSubmit,
    arrayrReason,
    isLoading: false,
    mutateDelete,
    refetch,
  };
}
