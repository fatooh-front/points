import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { getChangedFields } from "@/main/global/utils/objectUtils";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useClientPointsUse } from "@/main/global/api/restful/userManagmentAPI/clientsManager/clientsQuery";

type Props = {
  // unitOptions?: Option[];
  unit?: any;
  type?: string;
  refetch?: any;
};
export function usePointsFormDialog({
  // unitOptions,
  unit,
  type,
  refetch,
}: Props) {
  const { mutate } = useClientPointsUse(unit.clientId);

  const { t } = useTranslation("carBrands");
  const { t: toastT } = useTranslation("toast");

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const formSchema = z.object({
    amount: z.any(),
    clientId: z.union([z.string(), z.number()]),
    pointsUsed: z
      .number()
      .min(1, { message: t("carBrands.form.validation.name") }),
  });

  const defaultValues =
    type !== "add"
      ? {
          clientId: unit?.clientId,
          pointsUsed: 0,
        }
      : {
          clientId: unit?.clientId,
          pointsUsed: 0,
        };
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
    mutate(sendValues, {
      onSuccess,
      onError,
    });
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
