import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { getChangedFields } from "@/main/global/utils/objectUtils";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useAddLimousine,
  useEditLimousine,
  useGetLimousineById,
} from "@/main/global/api/restful/userManagmentAPI/LimousineManager/LimousineQuery";
import { useNavigate, useParams } from "react-router-dom";

export function UseAddOrEditLimousine() {
  const { id } = useParams();
  const { mutate: mutateAdd } = useAddLimousine();
  const { mutate: mutateEdit } = useEditLimousine(`${id}`);
  const navigate = useNavigate();
  const { data: DataOfBranche, isLoading, isError } = useGetLimousineById(id);

  const { t: toastT } = useTranslation("toast");

  const formSchema = z.object({
    brandId: z.union([z.string(), z.number()]),
    modelId: z.union([z.string(), z.number()]),
    yearId: z.union([z.string(), z.number()]),
    typeId: z.union([z.string(), z.number()]),
    image: z.string().nullable().optional(),
    notes: z.string().nullable().optional(),
  });

  const defaultValues = {
    brandId: DataOfBranche?.brandId || "",
    modelId: DataOfBranche?.modelId || "",
    yearId: DataOfBranche?.yearId || 0,
    typeId: DataOfBranche?.typeId || 0,
    image: DataOfBranche?.image || "",
    notes: DataOfBranche?.notes || "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (DataOfBranche) {
      form.reset(defaultValues);
    }
  }, [DataOfBranche, form]);

  function onSubmit(values: any) {
    const sendValues = { ...values };
    const originalValues = {};
    const changedValues = getChangedFields(originalValues, sendValues);

    if (Object.keys(changedValues).length === 0) {
      toast({
        variant: "destructive",
        title: toastT("toast.noChanges.title"),
        description: toastT("toast.noChanges.description"),
      });
      return;
    }

    const onSuccess = () => {
      toast({
        title: toastT("toast.success.title"),
        description: toastT("toast.success.description"),
      });
      form.reset({});
      navigate("/settings/lemozen/add-lemozen");
    };

    const onError = (error: Error) => {
      console.error("Error editing Limousine:", error);
    };
    !id
      ? mutateAdd(sendValues, {
          onSuccess,
          onError,
        })
      : mutateEdit(sendValues, {
          onSuccess,
          onError,
        });
  }

  return {
    form,
    onSubmit,
    isLoading,
    isError,
  };
}
