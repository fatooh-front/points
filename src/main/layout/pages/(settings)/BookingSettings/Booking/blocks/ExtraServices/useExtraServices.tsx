import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { getChangedFields } from "@/main/global/utils/objectUtils";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useAddExtraServices,
  useDeleteExtraServices,
  useGetAllExtraServices,
} from "@/main/global/api/restful/userManagmentAPI/BookingSettingsManager/bookingSettingsQuery";

export function useExtraServices() {
  const { data, refetch } = useGetAllExtraServices({});
  const { mutate } = useAddExtraServices();
  const { mutate: mutateDelete } = useDeleteExtraServices();

  // const data = type === "add" ? null : type === "edit" ? {} : undefined;
  const { t: toastT } = useTranslation("toast");

  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    nameEnglish: z.string({
      required_error: "الاسم بالإنجليزية مطلوب",
    }),
    nameArabic: z.string({
      required_error: "الاسم بالعربية مطلوب",
    }),
    serviceAvailability: z.any({
      required_error: "نوع الخدمة مطلوب",
      invalid_type_error: "نوع الخدمة يجب أن يكون رقم",
    }),
    serviceType: z.any({
      required_error: "نوع السعر مطلوب",
      invalid_type_error: "نوع السعر يجب أن يكون رقم",
    }),

    price: z.number({
      required_error: "السعر مطلوب",
      invalid_type_error: "السعر يجب أن يكون رقم",
    }),
  });

  const defaultValues = {
    // serviceType: "1", // Default service type
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const sendValues = {
      ...values,
    };

    const originalValues = {};
    console.log(values, "fghgfhfghfghfghfghfghgfh");

    mutate(sendValues, {
      onSuccess: () => {
        form.reset({
          price: 0,
          serviceType: "",
          nameArabic: "",
          nameEnglish: "",
        });
        refetch();
      },
    });

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
  }

  const fireOnClose = () => {
    form.reset({});
  };

  useEffect(() => {
    console.log("Service type changed:", form.watch("serviceType"));
  }, [form.watch("serviceType")]);
  return {
    open,
    setOpen,
    form,
    onSubmit,
    data,
    error: "",
    isLoading: false,
    fireOnClose,
    mutateDelete,
    refetch,
  };
}
