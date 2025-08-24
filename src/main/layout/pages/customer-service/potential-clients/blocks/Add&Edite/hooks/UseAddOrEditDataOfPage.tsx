import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { getChangedFields } from "@/main/global/utils/objectUtils";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate, useParams } from "react-router-dom";
import {
  useAddLead,
  useGetLead,
} from "@/main/global/api/restful/userManagmentAPI/CustomerServiceManager/CustomerServiceQuery";

export function UseAddOrEditDataOfLead() {
  const { id } = useParams();
  const { data: leadData, isLoading } = useGetLead(id);
  const { t: toastT } = useTranslation("toast");
  const { mutate } = useAddLead();
  const navigate = useNavigate();

  const Lead_Type_Company = 2; // نفس القيمة اللي في الباك إند

  const formSchema = z
    .object({
      leadId: z.union([z.string(), z.number()]).optional().nullable(),
      addedDate: z.string().optional().nullable(),

      leadType: z
        .union([z.string(), z.number()], {
          required_error: "نوع العميل مطلوب",
          invalid_type_error: "نوع العميل غير صالح",
        })
        .refine(
          (val) => {
            const numVal = Number(val);
            return numVal >= 1 && numVal <= 2;
          },
          { message: "نوع العميل غير صالح" }
        ),

      companyName: z
        .string()
        .max(255, { message: "اسم الشركة يجب ألا يزيد عن 255 حرف" })
        .min(3, { message: "اسم الشركة يجب ألا يقل عن 3 أحرف" })
        .nullable()
        .optional(),

      city: z.union([
        z
          .number({
            required_error: "المدينة مطلوبة",
            invalid_type_error: "المدينة غير صالحة",
          })
          .min(1, { message: "المدينة مطلوبة" }),
        z
          .string({
            required_error: "المدينة مطلوبة",
            invalid_type_error: "المدينة غير صالحة",
          })
          .min(1, { message: "المدينة مطلوبة" }),
      ]),

      address: z
        .string({
          required_error: "العنوان مطلوب",
        })
        .min(1, { message: "العنوان مطلوب" }),

      phone: z
        .string({ required_error: "رقم الهاتف مطلوب" })
        .min(1, { message: "رقم الهاتف مطلوب" }),

      mobile1: z
        .string()
        .min(10, { message: "رقم الجوال الأول يجب أن يكون 10 أرقام على الأقل" })
        .max(15, { message: "رقم الجوال الأول يجب ألا يزيد عن 15 رقم" }),

      mobile2: z
        .string()
        .min(10, {
          message: "رقم الجوال الثاني يجب أن يكون 10 أرقام على الأقل",
        })
        .max(15, { message: "رقم الجوال الثاني يجب ألا يزيد عن 15 رقم" })
        .nullable()
        .optional(),

      email: z
        .string()
        .email({ message: "البريد الإلكتروني غير صالح" })
        .nullable()
        .optional(),

      website: z
        .string()
        .url({ message: "رابط الموقع الإلكتروني غير صالح" })
        .max(255, { message: "رابط الموقع الإلكتروني طويل جدًا" })
        .nullable()
        .optional(),

      regNumber: z.string().nullable().optional(),
      vatNumber: z.string().nullable().optional(),

      statusId: z
        .union([z.string(), z.number()], {
          required_error: "الحالة مطلوبة",
          invalid_type_error: "الحالة غير صالحة",
        })
        .refine((val) => Number(val) >= 1, { message: "الحالة غير صالحة" }),

      groupId: z
        .union([z.string(), z.number()], {
          required_error: "المجموعة مطلوبة",
          invalid_type_error: "المجموعة غير صالحة",
        })
        .refine((val) => Number(val) >= 1, { message: "المجموعة غير صالحة" }),

      sourceId: z
        .union([z.string(), z.number()], {
          required_error: "مصدر العميل مطلوب",
          invalid_type_error: "مصدر العميل غير صالح",
        })
        .refine((val) => Number(val) >= 1, { message: "مصدر العميل غير صالح" }),

      notes: z.string().nullable().optional(),
    })
    // تحقق من الحقول المطلوبة لو نوع العميل شركة
    .superRefine((data, ctx) => {
      if (Number(data.leadType) === Lead_Type_Company) {
        if (!data.companyName || data.companyName.trim() === "") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["companyName"],
            message: "اسم الشركة مطلوب",
          });
        }
        if (!data.regNumber || data.regNumber.trim() === "") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["regNumber"],
            message: "رقم السجل مطلوب",
          });
        }
        if (!data.vatNumber || data.vatNumber.trim() === "") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["vatNumber"],
            message: "رقم الضريبة مطلوب",
          });
        }
      }
    });

  const defaultValues = {
    leadId: leadData?.data?.leadId,
    userId: leadData?.data?.userId,
    addedDate: leadData?.data?.addedDate || undefined,
    leadType: leadData?.data?.leadType || undefined,
    companyName: leadData?.data?.companyName || undefined,
    city: leadData?.data?.city || undefined,
    address: leadData?.data?.address || undefined,
    phone: leadData?.data?.phone || undefined,
    mobile1: leadData?.data?.mobile1 || undefined,
    mobile2: leadData?.data?.mobile2 || undefined,
    email: leadData?.data?.email || undefined,
    website: leadData?.data?.website || undefined,
    regNumber: leadData?.data?.regNumber || undefined,
    vatNumber: leadData?.data?.vatNumber || undefined,
    statusId: leadData?.data?.statusId || undefined,
    groupId: leadData?.data?.groupId || undefined,
    sourceId: leadData?.data?.sourceId || undefined,
    notes: leadData?.data?.notes || undefined,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (leadData) {
      form.reset(defaultValues);
    }
  }, [leadData, form]);

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
      navigate(`/customer-service/potential-clients`);
    };
    const onError = (error: Error) => {
      console.error("Error editing lead:", error);
    };

    mutate(sendValues as any, {
      onSuccess,
      onError,
    });
  }

  return {
    form,
    onSubmit,
    isLoading,
  };
}
