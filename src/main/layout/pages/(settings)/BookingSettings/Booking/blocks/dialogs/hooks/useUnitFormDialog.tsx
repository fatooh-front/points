import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { getChangedFields } from "@/main/global/utils/objectUtils";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useAddCustomLocations,
  useGetAllCustomLocations,
} from "@/main/global/api/restful/userManagmentAPI/BookingSettingsManager/bookingSettingsQuery";

type Props = {
  data?: {
    id: string;
    arabicName: string;
    longitude: number;
    latitude: number;
    radiusInMeters: number;
    price: number;
  };
  unit?: any;
  type?: string;
};
export function useUnitFormDialog({ type, data }: Props) {
  const { refetch } = useGetAllCustomLocations({});

  // const data = type === "add" ? null : type === "edit" ? {} : undefined;
  const { t } = useTranslation("carBrands");
  const { t: toastT } = useTranslation("toast");

  const { mutate: mutateAdd } = useAddCustomLocations();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const formSchema = z.object({
    id: z.any(),
    arabicName: z.string(),
    longitude: z.number(),
    latitude: z.number(),
    radiusInMeters: z.number(),
    price: z.number(),
  });

  const defaultValues =
    type !== "add" && data
      ? {
          id: data?.id ?? undefined,
          arabicName: data?.arabicName ?? "",
          longitude: data?.longitude ?? 0,
          latitude: data?.latitude ?? 0,
          radiusInMeters: data?.radiusInMeters ?? 0,
          price: data?.price ?? 0,
        }
      : {
          id: data?.id ?? undefined,

          arabicName: "",
          longitude: 0,
          latitude: 0,
          radiusInMeters: 0,
          price: 0,
        };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (data) {
      form.reset(defaultValues);
    }
  }, [data, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const sendValues = {
      ...values,
    };

    const onSuccess = () => {
      console.log("Unit edited successfully");
      setOpen(false);
      form.reset({});
      refetch();
    };
    const onError = (error: Error) => {
      console.error("Error editing unit:", error);
    };
    mutateAdd(sendValues, {
      onSuccess,
      onError,
    });
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
  }

  const fireOnClose = () => {
    form.reset({});
  };

  const getHeaderForm = () => {
    if (type === "add") {
      return t("carBrands.form.header.add");
    } else if (type === "edit") {
      return t("carBrands.form.header.edit");
    } else if (type === "view") {
      return t("carBrands.form.header.view");
    }
  };

  return {
    open,
    setOpen,
    form,
    onSubmit,
    dataallDays: data,
    error: "",
    isLoading: false,
    fireOnClose,
    // isPending: !!isPendingUpdate || !!isPendingAdd,
    getHeaderForm,
    file,
    setFile,
  };
}
