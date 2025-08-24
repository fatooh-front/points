import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { getChangedFields } from "@/main/global/utils/objectUtils";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useNavigate,
  //  useNavigate,
  useParams,
} from "react-router-dom";
import {
  useAddPromo,
  useGetPromoById,
} from "@/main/global/api/restful/userManagmentAPI/PromoCodeManager/PromoCodeQuery";

type Props = {
  // data?.dataOptions?: Option[];
  data?: any;
  type?: string;
};
export function UseAddOrEditDataOfPage({}: // data?.dataOptions,
Props) {
  const { id } = useParams();

  const { mutate: mutateAdd, isPending } = useAddPromo();
  const navigate = useNavigate();
  const { data } = useGetPromoById(id);
  console.log(data?.data, "dfdsfsdfsdf");

  const { t: toastT } = useTranslation("toast");
  // إعداد التاريخ الحالي لبداية اليوم (للمقارنة الدقيقة)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const formSchema = z
    .object({
      promoId: z.union([z.string(), z.number()]).optional().nullable(),
      promo: z
        .string()
        .min(3, { message: "الكود يجب أن يكون على الأقل 3 أحرف" })
        .max(50, { message: "الكود يجب ألا يزيد عن 50 حرف" }),
      startDate: z.union([
        z.string({ required_error: "تاريخ البداية مطلوب" }),
        z.date({ required_error: "تاريخ البداية مطلوب" }),
      ]),
      endDate: z.union([
        z.string({ required_error: "تاريخ النهاية مطلوب" }),
        z.date({ required_error: "تاريخ النهاية مطلوب" }),
      ]),

      promoType: z
        .number({ required_error: "نوع الكود مطلوب" })
        .min(1, { message: "نوع الكود يجب أن يكون 1 أو 2" })
        .max(2, { message: "نوع الكود يجب أن يكون 1 أو 2" }),
      promoValue: z
        .number({ required_error: "قيمة الكود مطلوبة" })
        .min(1, { message: "قيمة الكود يجب أن تكون أكبر من 1" }),
      promoStatus: z.any(),
      clientId: z
        .union([z.string(), z.number()])
        .optional()
        .nullable()
        .refine((val) => val == null || Number(val) > 0, {
          message: "رقم العميل يجب أن يكون أكبر من صفر",
        }),
      maxUse: z
        .number({ required_error: "الحد الأقصى للاستخدام مطلوب" })
        .min(1, { message: "الحد الأقصى للاستخدام يجب أن يكون أكبر من صفر" }),
      maxUsePerClient: z
        .number({ required_error: "الحد الأقصى للاستخدام لكل عميل مطلوب" })
        .min(1, {
          message: "الحد الأقصى للاستخدام لكل عميل يجب أن يكون أكبر من صفر",
        }),
      minValue: z
        .number({ required_error: "القيمة الدنيا مطلوبة" })
        .min(0, { message: "القيمة الدنيا يجب أن تكون صفر أو أكثر" }),
      maxValue: z
        .number({ required_error: "القيمة القصوى مطلوبة" })
        .min(1, { message: "القيمة القصوى يجب أن تكون أكبر من صفر" }),
      notes: z.string().optional(),
    })
    .refine((data) => !data.promo.toLocaleLowerCase().startsWith("rf"), {
      message: "الكود يجب أن لا يبدأ بـ 'rf'",
      path: ["promo"],
    })
    .refine(
      (data) => {
        // تحقق أن تاريخ البداية قبل تاريخ النهاية
        if (data.startDate && data.endDate) {
          return new Date(data.startDate) < new Date(data.endDate);
        }
        return true;
      },
      {
        message: "تاريخ البداية يجب أن يكون قبل تاريخ النهاية",
        path: ["startDate"],
      }
    )
    .refine(
      (data) => {
        // تحقق أن تاريخ البداية قبل تاريخ النهاية
        if (data.startDate && data.endDate) {
          const startDate = new Date(data.startDate);
          startDate.setHours(0, 0, 0, 0);
          return startDate >= today;
        }
        return true;
      },
      {
        message: "تاريخ البداية يجب أن لا يكون قبل اليوم",
        path: ["startDate"],
      }
    )
    .refine(
      (data) => {
        // تحقق أن القيمة القصوى أكبر أو تساوي القيمة الدنيا
        if (data.maxValue != null && data.minValue != null) {
          return data.maxValue >= data.minValue;
        }
        return true;
      },
      {
        message: "القيمة القصوى يجب أن تكون أكبر أو تساوي القيمة الدنيا",
        path: ["maxValue"],
      }
    );

  const defaultValues = {
    promoId: data?.data?.promoId || undefined,
    promo: data?.data?.promo || undefined,
    startDate: data?.data?.startDate
      ? data?.data?.startDate + ".000Z"
      : undefined,
    endDate: data?.data?.endDate ? data?.data?.endDate + ".000Z" : undefined,
    promoType: data?.data?.promoType || undefined,
    promoValue: data?.data?.promoValue || undefined,
    promoStatus: data?.data?.promoStatus || 0,
    clientId: data?.data?.clientId || undefined,
    maxUse: data?.data?.maxUse || undefined,
    maxUsePerClient: data?.data?.maxUsePerClient || undefined,
    minValue: data?.data?.minValue || undefined,
    maxValue: data?.data?.maxValue || undefined,
    notes: data?.data?.notes || undefined,
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (data?.data) {
      form.reset(defaultValues);
    }
  }, [data?.data, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const start = new Date(values.startDate);
    start.setHours(0, 0, 0, 0); // أول اليوم

    const end = new Date(values.endDate);
    end.setHours(23, 59, 59, 999); // آخر اليوم

    const sendValues = {
      ...values,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
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
      console.log("data?.data edited successfully");
      form.reset({});
      navigate("/promo-code/famous-codes");
    };
    const onError = (error: Error) => {
      console.error("Error editing data?.data:", error);
    };
    mutateAdd({ ...sendValues, sendValues } as any, {
      onSuccess,
      onError,
    });
  }

  return {
    isPending,
    form,
    onSubmit,
    isLoading: false,
  };
}
