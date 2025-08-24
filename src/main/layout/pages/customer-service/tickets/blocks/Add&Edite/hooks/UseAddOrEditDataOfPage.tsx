import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { getChangedFields } from "@/main/global/utils/objectUtils";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import {
  useAddTicket,
  useGetTicket,
} from "@/main/global/api/restful/userManagmentAPI/CRMSettingsManager/CRMSettingsQuery";

type Props = {
  type?: string;
};

export function UseAddOrEditDataOfPage({}: Props) {
  const { id } = useParams();
  const { data: ticketData } = useGetTicket(id); // API جديد للتذكرة

  const { t: toastT } = useTranslation("toast");
  const { mutate } = useAddTicket();

  const formSchema = z.object({
    ticketId: z.union([z.string(), z.number()]).optional().nullable(),
    clientType: z.string().min(1, { message: "نوع العميل مطلوب" }),
    clientName: z.string().min(1, { message: "اسم العميل مطلوب" }),
    phoneNumber: z.string().min(1, { message: "رقم الجوال مطلوب" }),
    title: z.string().min(1, { message: "عنوان التذكرة مطلوب" }),
    sourcesName: z.string().optional().nullable(),
    depName: z.string().optional().nullable(),
    typeName: z.string().optional().nullable(),
    ticketDate: z.string().optional().nullable(),
    ticketStatus: z.number().optional().nullable(),
    details: z.string().optional().nullable(),
  });

  const defaultValues = {
    ticketId: ticketData?.data?.ticketId ?? null,
    clientType: ticketData?.data?.clientType ?? "",
    clientName: ticketData?.data?.clientName ?? "",
    phoneNumber: ticketData?.data?.phoneNumber ?? "",
    title: ticketData?.data?.title ?? "",
    // sourcesName: ticketData?.data?.sourcesName ?? "",
    depName: ticketData?.data?.depName ?? "",
    typeName: ticketData?.data?.typeName ?? "",
    ticketDate: ticketData?.data?.ticketDate ?? "",
    ticketStatus: ticketData?.data?.ticketStatus ?? 0,
    // details: ticketData?.data?.details ?? "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (ticketData) {
      form.reset(defaultValues);
    }
  }, [ticketData, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const sendValues = { ...values };
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
    mutate(sendValues as any);
    // هنا هيكون كود الإضافة أو التعديل
  }

  return {
    form,
    onSubmit,
    isLoading: false,
  };
}
