import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { getChangedFields } from "@/main/global/utils/objectUtils";

import {
  useAddContact,
  useGetAllContacts,
} from "@/main/global/api/restful/userManagmentAPI/SiteManager/SiteQuery";
import { Contact } from "@/main/global/api/restful/userManagmentAPI/SiteManager/SiteTypes";

type Props = {
  type?: "add" | "edit";
};

export function UseAddOrEditContact({ type }: Props) {
  const { data, refetch, isLoading } = useGetAllContacts({});
  const { mutate } = useAddContact();
  console.log(data?.data, "sdfadsasdasd");

  const contactData = data?.data?.[0];
  const { t: toastT } = useTranslation("toast");

  const formSchema = z.object({
    contactId: z.number().optional().nullable(),

    phone: z.string().min(1, { message: "رقم الهاتف الأرضي مطلوب" }),

    mobile: z.string().min(1, { message: "رقم الجوال مطلوب" }),

    email: z
      .string()
      .min(1, { message: "البريد الإلكتروني مطلوب" })
      .email({ message: "البريد الإلكتروني غير صالح" }),

    website: z
      .string()
      .min(1, { message: "الموقع الإلكتروني مطلوب" })
      .url({ message: "رابط الموقع غير صالح" }),

    facebook: z
      .string()
      .min(1, { message: "رابط فيسبوك مطلوب" })
      .url({ message: "رابط فيسبوك غير صالح" }),

    instagram: z
      .string()
      .min(1, { message: "رابط إنستجرام مطلوب" })
      .url({ message: "رابط إنستجرام غير صالح" }),

    linkedin: z
      .string()
      .min(1, { message: "رابط لينكدإن مطلوب" })
      .url({ message: "رابط لينكدإن غير صالح" }),

    twitter: z
      .string()
      .min(1, { message: "رابط تويتر مطلوب" })
      .url({ message: "رابط تويتر غير صالح" }),

    snapchat: z
      .string()
      .min(1, { message: "رابط سناب شات مطلوب" })
      .url({ message: "رابط سناب شات غير صالح" }),

    tiktok: z
      .string()
      .min(1, { message: "رابط تيك توك مطلوب" })
      .url({ message: "رابط تيك توك غير صالح" }),

    whatsapp: z
      .string()
      .min(1, { message: "رابط واتساب مطلوب" })
      .url({ message: "رابط واتساب غير صالح" }),

    androidLink: z
      .string()
      .min(1, { message: "رابط تطبيق أندرويد مطلوب" })
      .url({ message: "رابط تطبيق أندرويد غير صالح" }),

    iosLink: z
      .string()
      .min(1, { message: "رابط تطبيق iOS مطلوب" })
      .url({ message: "رابط تطبيق iOS غير صالح" }),

    notes: z.any(),
  });

  const defaultValues: Partial<Contact> = {
    contactId: contactData?.contactId,
    phone: contactData?.phone ?? "",
    mobile: contactData?.mobile ?? "",
    email: contactData?.email ?? "",
    website: contactData?.website ?? "",
    facebook: contactData?.facebook ?? "",
    instagram: contactData?.instagram ?? "",
    linkedin: contactData?.linkedin ?? "",
    twitter: contactData?.twitter ?? "",
    snapchat: contactData?.snapchat ?? "",
    tiktok: contactData?.tiktok ?? "",
    whatsapp: contactData?.whatsapp ?? "",
    androidLink: contactData?.androidLink ?? "",
    iosLink: contactData?.iosLink ?? "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (contactData) {
      form.reset(defaultValues);
    }
  }, [contactData, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const sendValues = { ...values };

    // لو Edit بنقارن بين القيم القديمة والجديدة
    const originalValues = contactData ?? {};
    const changedValues = getChangedFields(originalValues, sendValues);

    if (type === "edit" && Object.keys(changedValues).length === 0) {
      toast({
        variant: "destructive",
        title: toastT("noChanges.title"),
        description: toastT("noChanges.description"),
      });
      return;
    }
    mutate(sendValues as any, {
      onSuccess: () => {
        refetch();
      },
    });

    // هنا تستدعي الـ mutation المناسب
    // if (type === "add") {
    //   mutateAdd(sendValues, { onSuccess, onError });
    // } else {
    //   mutateUpdate(sendValues, { onSuccess, onError });
    // }
  }

  return {
    form,
    onSubmit,
    isLoading,
  };
}
