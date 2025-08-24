import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { getChangedFields } from "@/main/global/utils/objectUtils";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetAllPreventedCarOnForeigners,
  usePreventedCarOnForeigners,
} from "@/main/global/api/restful/userManagmentAPI/BookingSettingsManager/bookingSettingsQuery";
import { useGetAllTypes } from "@/main/global/api/restful/userManagmentAPI/TypeManager/TypeQuery";

// type Props = {
//   data?: {
//     name: string;
//     longitude: number;
//     latitude: number;
//     radius: number;
//     price: number;
//   };
//   unit?: any;
//   type?: string;
// };
export function useExtraServices() {
  const { data, refetch } = useGetAllPreventedCarOnForeigners({});
  const { data: Types } = useGetAllTypes();
  const { mutate } = usePreventedCarOnForeigners();

  // const data = type === "add" ? null : type === "edit" ? {} : undefined;
  const { t: toastT } = useTranslation("toast");

  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    banOnForeigners: z.boolean(),
    Id: z.union([z.string(), z.number()], {
      required_error: "الاسم بالعربية مطلوب",
    }),
  });

  const defaultValues = {
    banOnForeigners: true,
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

  return {
    open,
    setOpen,
    form,
    onSubmit,
    data,
    Types,
    error: "",
    isLoading: false,
    fireOnClose,
    mutate,
    refetch,
  };
}
