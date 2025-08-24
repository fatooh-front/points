import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { getChangedFields } from "@/main/global/utils/objectUtils";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddCity } from "@/main/global/api/restful/userManagmentAPI/CityManager/CityQuery";

type Props = {
  // unitOptions?: Option[];
  unit?: any;
  type?: string;
  refetch: any;
};
export function useUnitFormDialog({
  // unitOptions,
  unit,
  type,
  refetch,
}: Props) {
  const { mutate: mutateAdd } = useAddCity();

  const { t } = useTranslation("cities");
  const { t: toastT } = useTranslation("toast");

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const formSchema = z.object({
    id: z.union([z.number(), z.string()]).optional().nullable(),
    notes: z.string().optional().nullable(),
    nameAr: z.string().min(1, {
      message: t("cities.form.validation.arabicName"),
    }),
    name: z.string().min(1, {
      message: t("cities.form.validation.englishName"),
    }),
    longitude: z.number().optional().nullable(),
    latitude: z.number().optional().nullable(),
  });

  const defaultValues =
    type !== "add"
      ? {
          id: unit?.id,
          notes: unit?.notes,
          nameAr: unit?.nameAr,
          name: unit?.name,
          longitude: unit?.longitude,
          latitude: unit?.latitude,
        }
      : {};
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (unit) {
      form.reset(defaultValues);
    }
  }, [unit, form]);

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
      refetch();
      console.log("Unit edited successfully");
      setOpen(false);
      form.reset({});
    };
    const onError = (error: Error) => {
      console.error("Error editing unit:", error);
    };
    mutateAdd(sendValues, {
      onSuccess,
      onError,
    });
  }

  const fireOnClose = () => {
    form.reset({});
  };

  const getHeaderForm = () => {
    if (type === "add") {
      return t("cities.form.header.add");
    } else if (type === "edit") {
      return t("cities.form.header.edit");
    } else if (type === "view") {
      return t("cities.form.header.view");
    }
  };

  return {
    open,
    setOpen,
    form,
    onSubmit,
    dataUnit: unit,
    error: "",
    isLoading: false,
    fireOnClose,
    // isPending: !!isPendingUpdate || !!isPendingAdd,
    getHeaderForm,
    file,
    setFile,
  };
}
