import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { getChangedFields } from "@/main/global/utils/objectUtils";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddBanner,
  useGetBanner,
} from "@/main/global/api/restful/userManagmentAPI/SiteManager/SiteQuery";

export function useAddOrEditBanner() {
  const [CarNameSearchKey, setCarNameSearchKey] = useState<string>("");

  const { id } = useParams();
  const { data: bannerData } = useGetBanner(id);
  const { mutate, isPending } = useAddBanner();
  const { t: toastT } = useTranslation("toast");
  const navigate = useNavigate();

  const formSchema = z.object({
    bannerId: z.union([z.string(), z.number()]).optional().nullable(),

    bannerName: z.string().min(1, { message: "اسم البانر مطلوب" }),

    title: z.string().min(1, { message: "العنوان باللغة الإنجليزية مطلوب" }),

    arabicTitle: z.string().min(1, { message: "العنوان باللغة العربية مطلوب" }),

    image: z
      .string()
      .min(1, { message: "صورة البانر باللغة الإنجليزية مطلوبة" }),

    arabicImage: z
      .string()
      .min(1, { message: "صورة البانر باللغة العربية مطلوبة" }),

    englishText: z.string().min(1, { message: "النص باللغة الإنجليزية مطلوب" }),

    arabicText: z.string().min(1, { message: "النص باللغة العربية مطلوب" }),

    objType: z.union([z.string(), z.number()], {
      errorMap: () => ({ message: "نوع الكائن مطلوب" }),
    }),

    objId: z.union([z.string(), z.number()], {
      errorMap: () => ({ message: "معرّف الكائن مطلوب" }),
    }),

    notes: z.string().optional().nullable(),
  });

  const defaultValues = {
    bannerId: bannerData?.data?.bannerId,
    bannerName: bannerData?.data?.bannerName || "",
    title: bannerData?.data?.title || "",
    arabicTitle: bannerData?.data?.arabicTitle || "",
    image: bannerData?.data?.image || "",
    arabicImage: bannerData?.data?.arabicImage || "",
    englishText: bannerData?.data?.englishText || "",
    arabicText: bannerData?.data?.arabicText || "",
    objType: bannerData?.data?.objType ?? 1,
    objId: bannerData?.data?.objId ?? undefined,
    objectName: bannerData?.data?.objectName ?? undefined,
    notes: bannerData?.data?.notes || "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (bannerData) {
      form.reset(defaultValues);
      setCarNameSearchKey(defaultValues.objectName || "");
    }
  }, [bannerData, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const originalValues = {}; // ممكن تحط فيه نسخة البيانات الأصلية لو متاحة
    const changedValues = getChangedFields(originalValues, values);
    mutate(values, {
      onSuccess: () => {
        navigate("/website/main-images");
      },
    });
    if (Object.keys(changedValues).length === 0) {
      toast({
        variant: "destructive",
        color: "white",
        title: toastT("toast.noChanges.title"),
        description: toastT("toast.noChanges.description"),
      });
      return;
    }

    // هنا تبعت الداتا للسيرفر باستخدام mutation
    console.log("Submit values:", changedValues);
  }

  return {
    form,
    onSubmit,
    isLoading: false,
    CarNameSearchKey,
    isPending,
    setCarNameSearchKey, // غيرها لو في loading
  };
}
