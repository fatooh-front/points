import { toast } from "@/components/ui/use-toast";
import { getChangedFields, removeEmptyFields } from "@/main/global/utils/objectUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { createDefaultValues } from "../utils/createDefaultValues";
import { createSchema } from "../utils/createSchema";
import { OptionFields } from "../utils/fieldsTypes";

type Props = {
  item?: any;
  type?: string;
  addMutate?: any;
  addIsPending?: boolean;
  updateMutate?: any;
  updateIsPending?: boolean;
  fields: any[];
  label?: string | number;
  isFemale?: boolean;
  optionFields?: OptionFields;
};
export function useCurdFormDialog({ item, type, addMutate, addIsPending, updateMutate, updateIsPending, fields, label, isFemale = false, optionFields }: Props) {
  const { i18n, t } = useTranslation("curd");
  const { t: toastT } = useTranslation("toast");

  const [open, setOpen] = useState(false);

  // const formSchema = z.object({
  //   name_en: z.string().min(1, { message: t("curd.form.name_en.required") }), //note: fields may be different in your API
  //   name_ar: z.string().min(1, { message: t("curd.form.name_ar.required") }), //note: fields may be different in your API
  // });

  const formSchema = createSchema(fields);

  const defaultValues = type !== "add" ? createDefaultValues(fields, item, "update") : createDefaultValues(fields, undefined, "add");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (item) {
      form.reset(defaultValues);
    }
  }, [item, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const sendValues = {
      ...values,
    };

    const onSuccess = () => {
      console.log("Curd edited successfully");
      setOpen(false);
      form.reset({});
    };
    const onError = (error: Error) => {
      console.error("Error editing curd:", error);
    };
    if (type === "add") {
      addMutate(removeEmptyFields(sendValues), {
        onSuccess,
        onError,
      });
    } else if (type === "edit" && item?.[optionFields?.value || "id"]) {
      const originalValues = {
        ...defaultValues,
      };

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

      updateMutate(
        {
          id: item?.[optionFields?.value || "id"],
          ...removeEmptyFields(sendValues),
        },
        {
          onSuccess,
          onError,
        },
      );
    }
  }

  const fireOnClose = () => {
    form.reset({});
  };
  const gender = i18n.language === "ar" && isFemale ? "ة" : "";
  const labelAdd = i18n.language === "ar" && String(label)?.startsWith("ال") ? String(label)?.slice(2) : label;
  const getHeaderForm = () => {
    if (type === "add") {
      return t("curd.form.header.add", {
        label: labelAdd,
        gender,
      });
    } else if (type === "edit") {
      return t("curd.form.header.edit", { label, gender });
    } else if (type === "view") {
      return t("curd.form.header.view", { label, gender });
    }
  };

  return {
    open,
    setOpen,
    form,
    onSubmit,
    dataCurd: item,
    error: "",
    isLoading: false,
    fireOnClose,
    isPending: !!updateIsPending || !!addIsPending,
    getHeaderForm,
  };
}
