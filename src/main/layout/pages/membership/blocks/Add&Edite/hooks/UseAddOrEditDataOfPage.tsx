import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { getChangedFields } from "@/main/global/utils/objectUtils";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddMembership,
  useGetAllMemberships,
  useGetMembershipById,
} from "@/main/global/api/restful/userManagmentAPI/membershipManager/membershipQuery";
import { useGetAllSettings } from "@/main/global/api/restful/userManagmentAPI/BookingSettingsManager/bookingSettingsQuery";

export function UseAddOrEditMembershipForm() {
  const { id } = useParams();
  const { data: membershipData, refetch, isLoading } = useGetMembershipById(id);
  const { refetch: refetchMembership } = useGetAllMemberships();
  const { mutate } = useAddMembership();
  const { t: toastT } = useTranslation("toast");
  const navigate = useNavigate();
  const { data: defaultData } = useGetAllSettings({});
  const defaultSettings = defaultData?.data.reduce<Record<string, string>>(
    (acc, cur) => {
      acc[cur.setKey] = String(cur.setValue);
      return acc;
    },
    {}
  );
  console.log(defaultSettings, "dsssssssssssssssssssssssss");

  const formSchema = z
    .object({
      memberId: z.union([z.string(), z.number()]).optional().nullable(),
      memberName: z.string().min(1, { message: "اسم العضو مطلوب" }),
      arabicName: z.string().min(1, { message: "اسم العضو مطلوب" }),
      details: z.string().min(1, { message: "التفاصيل مطلوبة" }),
      arabicDetails: z.string().min(1, { message: "التفاصيل بالعربية مطلوبة" }),
      icon: z.string().min(1, { message: "الصورة مطلوبة" }),
      startPoints: z.union([
        z.string().min(1, { message: "عدد النقاط يجب ان يكون رقم" }),
        z.number().min(1, { message: "عدد النقاط يجب ان يكون رقم" }),
      ]),
      endPoints: z.union([
        z.string().min(1, { message: "عدد النقاط يجب ان يكون رقم" }),
        z.number().min(1, { message: "عدد النقاط يجب ان يكون رقم" }),
      ]),
      discountPercentage: z.union([z.string(), z.number()]),
      maxDiscount: z.union([
        z.string().min(1, { message: " الحد الاقصى للخصم يجب ان يكون رقم" }),
        z.number().min(1, { message: " الحد الاقصى للخصم يجب ان يكون رقم" }),
      ]),
      maxLateHours: z.union([z.string(), z.number()]),
      anotherBranch: z.union([z.literal(0), z.literal(1)]),
      preOrderAllowed: z.union([z.literal(0), z.literal(1)]),
      hoursPreOrder: z.union([z.string(), z.number()]),
      freeKm: z.union([z.string(), z.number()]),
      luxuryCars: z.union([z.literal(0), z.literal(1)]),
      luxuryCarsDiscount: z
        .union([z.string(), z.number()])
        .nullable()
        .optional(),
      typeId: z.union([z.string(), z.number()]).nullable().optional(),
      luxuryCarsMaxDiscount: z
        .union([z.string(), z.number()])
        .nullable()
        .optional(),
      maxRentLuxuryCars: z
        .union([z.string(), z.number()])
        .nullable()
        .optional(),
      notes: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.startPoints > data.endPoints) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["startPoints"],
          message:
            "يجب أن يكون عدد النقاط الابتدائية أقل من أو يساوي عدد النقاط النهائية",
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["endPoints"],
          message:
            "يجب أن يكون عدد النقاط النهائية  أكبر من أو يساوي عدد النقاط الابتدائية",
        });
      }
      if (
        defaultSettings?.NUM_HOURS_FOR_START_RESERVATION_FROM_BRANCH &&
        data.hoursPreOrder <
          defaultSettings.NUM_HOURS_FOR_START_RESERVATION_FROM_BRANCH
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["hoursPreOrder"],
          message:
            "يجب ان يكون عدد ساعات الحجز المجانية اكبر من قيمتها في الاعدادات الافتراضيه ",
        });
      }
      if (
        defaultSettings?.NUM_HOURS_FOR_FREE_RESERVATION &&
        data.maxLateHours < defaultSettings.NUM_HOURS_FOR_FREE_RESERVATION
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["maxLateHours"],
          message:
            "يجب ان يكون عدد ساعات الحجز المجانية اكبر من قيمتها في الاعدادات الافتراضيه ",
        });
      }
      if (data.luxuryCars === 1) {
        if (data.luxuryCarsDiscount == null) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["luxuryCarsDiscount"],
            message: "مطلوب عند تفعيل السيارات ",
          });
        }
        if (data.luxuryCarsMaxDiscount == null) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["luxuryCarsMaxDiscount"],
            message: "مطلوب عند تفعيل السيارات ",
          });
        }
        if (data.maxRentLuxuryCars == null) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["maxRentLuxuryCars"],
            message: "مطلوب عند تفعيل السيارات ",
          });
        }
        if (data.typeId == null) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["typeId"],
            message: "مطلوب عند تفعيل السيارات ",
          });
        }
      }
    });

  const defaultValues = {
    memberId: membershipData?.data?.memberId,
    memberName: membershipData?.data?.memberName || "",
    arabicName: membershipData?.data?.arabicName || "",
    details: membershipData?.data?.details || "",
    arabicDetails: membershipData?.data?.arabicDetails || "",
    icon: membershipData?.data?.icon || "",
    startPoints: membershipData?.data?.startPoints || undefined,
    endPoints: membershipData?.data?.endPoints || undefined,
    discountPercentage: membershipData?.data?.discountPercentage || 0,
    maxDiscount: membershipData?.data?.maxDiscount || 0,
    maxLateHours:
      membershipData?.data?.maxLateHours ||
      defaultSettings?.NUM_HOURS_FOR_FREE_RESERVATION ||
      0,

    anotherBranch: membershipData?.data?.anotherBranch || 0,
    preOrderAllowed: membershipData?.data?.preOrderAllowed ?? 0,
    hoursPreOrder:
      membershipData?.data?.hoursPreOrder ||
      defaultSettings?.NUM_HOURS_FOR_START_RESERVATION_FROM_BRANCH ||
      0,
    freeKm: membershipData?.data?.freeKm || 0,
    luxuryCars: membershipData?.data?.luxuryCars || 0,
    typeId: membershipData?.data?.typeId || 0,
    luxuryCarsDiscount: membershipData?.data?.luxuryCarsDiscount || 0,
    luxuryCarsMaxDiscount: membershipData?.data?.luxuryCarsMaxDiscount || 0,
    maxRentLuxuryCars: membershipData?.data?.maxRentLuxuryCars || 0,
  };

  console.log(id, "sddddddddddddddddddddddddddddd");

  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (membershipData || defaultData?.data) {
      form.reset(defaultValues);
    }
  }, [membershipData, form, defaultData]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const sendValues = { ...values };
    if (sendValues.preOrderAllowed === 0) {
      sendValues.hoursPreOrder = 0;
    }
    if (sendValues.luxuryCars === 0) {
      sendValues.maxRentLuxuryCars = 0;
      sendValues.luxuryCarsMaxDiscount = 0;
      sendValues.typeId = undefined;
      sendValues.luxuryCarsDiscount = 0;
    }
    const originalValues = {}; // optionally pass `membershipData?.data` here
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
    console.log(id, "sddddddddddddddddddddddddddddd");

    // Submit logic here...
    console.log("Submit:", sendValues);
    mutate(
      sendValues.luxuryCars
        ? sendValues
        : ({
            ...sendValues,
            maxRentLuxuryCars: 0,
            luxuryCarsMaxDiscount: 0,
            luxuryCarsDiscount: 0,
          } as any),
      {
        onSuccess: () => {
          navigate("/membership");
          id ? refetch() : refetchMembership();
        },
      }
    );
  }

  return {
    form,
    onSubmit,
    isLoading: isLoading,
  };
}
