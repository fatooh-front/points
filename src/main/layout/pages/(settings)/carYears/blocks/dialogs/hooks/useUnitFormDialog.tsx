import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { getChangedFields } from "@/main/global/utils/objectUtils";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddcarsYears } from "@/main/global/api/restful/userManagmentAPI/carsYearManager/carsYearsQuery";

type Props = {
  // unitOptions?: Option[];
  unit?: any;
  type?: string;
};
export function useUnitFormDialog({
  // unitOptions,
  unit,
  type,
}: Props) {
  const { mutate: mutateAdd } = useAddcarsYears();

  const { t } = useTranslation("carsYear");
  const { t: toastT } = useTranslation("toast");

  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    yearId: z.union([
      z.string().optional().nullable(),
      z.number().optional().nullable(),
    ]),
    year: z.string().min(1, {
      message: t("carsYear.form.validation.englishName"),
    }),

    notes: z.string().optional().nullable(),
  });

  const defaultValues =
    type !== "add"
      ? {
          notes: unit?.notes,
          year: unit?.year,
          yearId: unit?.yearId,
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
      return t("carsYear.form.header.add");
    } else if (type === "edit") {
      return t("carsYear.form.header.edit");
    } else if (type === "view") {
      return t("carsYear.form.header.view");
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
  };
}
