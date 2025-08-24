import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { getChangedFields } from "@/main/global/utils/objectUtils";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddBrands } from "@/main/global/api/restful/userManagmentAPI/BrandManager/BrandQuery";

type Props = {
  // unitOptions?: Option[];
  unit?: any;
  type?: string;
};
export function useUnitPaymentLinkFormDialog({
  // unitOptions,
  unit,
  type,
}: Props) {
  const { mutate: mutateAdd } = useAddBrands();

  const { t } = useTranslation("carBrands");
  const { t: toastT } = useTranslation("toast");

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const formSchema = z.object({
    logo: z.string({ message: t("carBrands.form.validation.logo") }),
    brandName: z.string().min(1, {
      message: t("carBrands.form.validation.englishName"),
    }),
    arabicName: z.string().min(1, {
      message: t("carBrands.form.validation.arabicName"),
    }),
    notes: z.string().optional().nullable(),
  });

  const defaultValues =
    type !== "add"
      ? {
          logo: "unit?.logo",
          carBrandsId: unit?.carBrandsId,
          carBrandId: unit?.carBrandId,
          brandName: unit?.brandName,
          arabicName: unit?.arabicName,
          notes: unit?.notes,
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
