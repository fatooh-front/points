import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useAddOffer,
  useGetOffer,
} from "@/main/global/api/restful/userManagmentAPI/SiteManager/SiteQuery";
import { useNavigate, useParams } from "react-router-dom";

export function UseAddOrEditDataOfPage() {
  const { id } = useParams();
  const { mutate, isPending } = useAddOffer();
  const navigate = useNavigate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const { data: dataOffer } = useGetOffer(id);
  console.log(dataOffer?.data);

  const data = dataOffer?.data;
  const formSchema = z
    .object({
      offerId: z.union([z.string(), z.number()]).optional().nullable(),

      title: z.string().min(1, { message: "العنوان مطلوب" }),
      titleArabic: z.string().min(1, { message: "العنوان بالعربي مطلوب" }),
      detailsArabic: z.string().min(1, { message: "الوصف مطلوب" }),
      details: z.string().min(1, { message: "الوصف بالعربي مطلوب" }),
      terms: z.string().min(1, { message: "الشروط مطلوبة" }),
      termsArabic: z.string().min(1, { message: "الشروط بالعربي مطلوبة" }),

      offerStatus: z.number(),
      startDate: z.any(),
      endDate: z.any(),

      image: z.string().min(1, { message: "الصورة مطلوبة" }),

      notes: z.string().optional().nullable(),
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
    );
  const defaultValues: Partial<z.infer<typeof formSchema>> = {
    offerId: data?.offerId ?? null,
    title: data?.title ?? "",
    titleArabic: data?.titleArabic ?? "",
    detailsArabic: data?.detailsArabic ?? "",
    details: data?.details ?? "",
    offerStatus: data?.offerStatus ?? 0,

    terms: data?.terms ?? "",
    termsArabic: data?.termsArabic ?? "",
    startDate: data?.startDate ? data?.startDate + ".000Z" : "",
    endDate: data?.endDate ? data?.endDate + ".000Z" : "",
    image: data?.image ?? "",
    notes: data?.notes ?? "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (data) {
      form.reset(defaultValues);
    }
  }, [data, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const start = new Date(values.startDate);
    // start.setHours(0, 0, 0, 1); // أول اليوم
    const test = start.toLocaleString("sv-SE");
    console.log(test, "easdasdsadasdasd");
    console.log(new Date(test), "easdasdsadasdasd");

    const end = new Date(values.endDate);
    end.setHours(23, 59, 59, 999); // آخر اليوم

    const sendValues = {
      startDate: start,
      endDate: end,
      ...values,
    };

    mutate(sendValues as any, {
      onSuccess: () => {
        navigate("/website/offers");
      },
    });
  }

  // TODO: send to server using mutation

  return {
    form,
    onSubmit,
    isPending,
    isLoading: false,
  };
}
