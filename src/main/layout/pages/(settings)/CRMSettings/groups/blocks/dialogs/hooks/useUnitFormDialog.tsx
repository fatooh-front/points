import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { getChangedFields } from "@/main/global/utils/objectUtils";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetAllTypes } from "@/main/global/api/restful/userManagmentAPI/TypeManager/TypeQuery";
import { useAddGroup } from "@/main/global/api/restful/userManagmentAPI/CRMSettingsManager/CRMSettingsQuery";

type Props = {
  unit?: any;
  type?: string;
};
export function useUnitFormDialog({ unit, type }: Props) {
  const { mutate: mutateAdd } = useAddGroup();
  const { refetch } = useGetAllTypes();

  const { t: toastT } = useTranslation("toast");

  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    groupId: z.union([
      z.string().optional().nullable(),
      z.number().optional().nullable(),
    ]),

    groupName: z.string().min(1, {
      message: "الرجاء إدخال الاسم باللغة الإنجليزية",
    }),

    arabicName: z.string().min(1, {
      message: "الرجاء إدخال الاسم باللغة العربية",
    }),
  });
  const defaultValues =
    type !== "add"
      ? {
          groupId: unit?.groupId,
          groupName: unit?.groupName,
          arabicName: unit?.arabicName,
        }
      : {};
  const form = useForm<z.infer<typeof formSchema>>({
    reValidateMode: "onChange", // بعد كده تتحدث وقت ما المستخدم يكتب

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
      return "إضافة مجموعة";
    } else if (type === "edit") {
      return "تعديل مجموعة";
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
