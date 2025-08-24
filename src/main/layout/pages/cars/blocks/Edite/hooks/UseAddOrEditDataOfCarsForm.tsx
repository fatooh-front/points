import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { getChangedFields } from "@/main/global/utils/objectUtils";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate, useParams } from "react-router-dom";
import {
  useAddCars,
  useCarOnbranchs,
  useGetCarBranchbyCar,
  useGetCars,
} from "../../../../../../global/api/restful/userManagmentAPI/carsManager/carsUsersQuery";

type Props = {
  // DataOfcar?.dataOptions?: Option[];
  step: string;
  setStep: (step: string) => void;
  type?: string;
};
export function UseAddOrEditDataOfPage({
  step,
  setStep,
}: // DataOfcar?.dataOptions,
Props) {
  const { id } = useParams();
  const { mutate: mutateAddCarOnbranchs } = useCarOnbranchs();

  const { mutate: mutateAdd } = useAddCars();
  const navigate = useNavigate();
  const { data: DataOfCarBranchbyCar, refetch: refetchDataOfCarBranchbyCar } =
    useGetCarBranchbyCar(id, true);
  const { data: DataOfcar } = useGetCars(id);

  console.log(DataOfcar, "dfdsfsdfsdf");

  // const { t } = useTranslation("carsYear")
  const { t: toastT } = useTranslation("toast");

  const formSchema = z.object({
    carId: z.union([z.string(), z.number()]).optional().nullable(),
    carStatus: z.union([z.string(), z.number()]).optional().nullable(),
    carName: z
      .string({ message: "اسم السيارة مطلوب" })
      .min(1, { message: "اسم السيارة مطلوب" }),
    carCode: z
      .string({ message: "كود السيارة مطلوب" })
      .min(1, { message: "كود السيارة مطلوب" }),
    plateNumber: z.string().optional().nullable(),
    brandId: z.union([
      z
        .string({ message: "الماركة مطلوبة" })
        .min(1, { message: "الماركة مطلوبة" }),
      z
        .number({ message: "الماركة مطلوبة" })
        .min(1, { message: "الماركة مطلوبة" }),
    ]),
    modelId: z.union([
      z
        .string({ message: "الموديل مطلوب" })
        .min(1, { message: "الموديل مطلوب" }),
      z
        .number({ message: "الموديل مطلوب" })
        .min(1, { message: "الموديل مطلوب" }),
    ]),
    engineId: z.union([
      z.string({ message: "المحرك مطلوب" }).min(1, { message: "المحرك مطلوب" }),
      z.number({ message: "المحرك مطلوب" }).min(1, { message: "المحرك مطلوب" }),
    ]),
    yearId: z.union([
      z
        .string({ message: "سنة الصنع مطلوبة" })
        .min(1, { message: "سنة الصنع مطلوبة" }),
      z
        .number({ message: "سنة الصنع مطلوبة" })
        .min(1, { message: "سنة الصنع مطلوبة" }),
    ]),
    typeId: z.union([
      z.string({ message: "النوع مطلوب" }).min(1, { message: "النوع مطلوب" }),
      z.number({ message: "النوع مطلوب" }).min(1, { message: "النوع مطلوب" }),
    ]),

    image: z.string().optional().nullable(),
    cover: z.string().optional().nullable(),
    numberOfDoors: z.union([
      z
        .string({ message: "عدد الأبواب مطلوب" })
        .min(1, { message: "عدد الأبواب مطلوب" }),
      z
        .number({ message: "عدد الأبواب مطلوب" })
        .min(1, { message: "عدد الأبواب مطلوب" }),
    ]),
    numberOfPassengers: z.union([
      z
        .string({ message: "عدد الركاب مطلوب" })
        .min(1, { message: "عدد الركاب مطلوب" }),
      z
        .number({ message: "عدد الركاب مطلوب" })
        .min(1, { message: "عدد الركاب مطلوب" }),
    ]),
    airCondition: z.boolean(),
    showHome: z.boolean(),
    price: z.union([z.string(), z.number()]).optional().nullable(),
    offer: z.boolean(),
    insurancePrice: z.union([z.string(), z.number()]).optional().nullable(),
    detailsEnglish: z.string({ message: "تفاصيل السيارة مطلوبة" }).min(2, {
      message: "تفاصيل السيارة مطلوبة",
    }),
    detailsArabic: z.string({ message: "تفاصيل السيارة مطلوبة" }).min(2, {
      message: "تفاصيل السيارة مطلوبة",
    }),
    dailyPrice:
      String(step) === "2"
        ? z
            .string({ message: "سعر اليوم مطلوب" })
            .min(1, { message: "سعر اليوم مطلوب" })
            .or(z.number().min(1, { message: "سعر اليوم مطلوب" }))
        : z.any(),
    extraHoursPrice: z.union([z.string(), z.number()]).optional().nullable(),
    weeklyPrice:
      String(step) === "2"
        ? z
            .string({ message: "سعر الاسبوع مطلوب" })
            .min(1, { message: "سعر الاسبوع مطلوب" })
            .or(z.number().min(1, { message: "سعر الاسبوع مطلوب" }))
        : z.any(),
    monthlyPrice:
      String(step) === "2"
        ? z
            .string({ message: "سعر الشهر مطلوب" })
            .min(1, { message: "سعر الشهر مطلوب" })
            .or(z.number().min(1, { message: "سعر الشهر مطلوب" }))
        : z.any(),
    yearlyPrice:
      String(step) === "2"
        ? z
            .string({ message: "سعر السنة مطلوب" })
            .min(1, { message: "سعر السنة مطلوب" })
            .or(z.number().min(1, { message: "سعر السنة مطلوب" }))
        : z.any(),
    offerDailyPrice: z.union([z.string(), z.number()]).optional().nullable(),
    offerWeeklyPrice: z.union([z.string(), z.number()]).optional().nullable(),
    offerMonthlyPrice: z.union([z.string(), z.number()]).optional().nullable(),
    offerYearlyPrice: z.union([z.string(), z.number()]).optional().nullable(),
    kmPrice: z.union([z.string(), z.number()]).optional().nullable(),
    maxKm: z.union([z.string(), z.number()]).optional().nullable(),
    systemId: z.string().optional().nullable(),
    images: z.array(z.any()).optional().nullable(),

    finalPrice: z.union([z.string(), z.number()]).optional().nullable(),
    numOfDays: z.union([z.string(), z.number()]).optional().nullable(),
    datingType: z.union([z.string(), z.number()]).optional().nullable(),
    extraKmId: z.union([z.string(), z.number()]).optional().nullable(),
    extraKm: z.string().optional().nullable(),
    extraPrice: z.union([z.string(), z.number()]).optional().nullable(),
    branchs: z.any().optional().nullable(),
  });

  const defaultValues = {
    branchs: DataOfCarBranchbyCar || {},
    detailsEnglish: DataOfcar?.data?.detailsEnglish ?? "",
    detailsArabic: DataOfcar?.data?.detailsArabic ?? "",
    carId: DataOfcar?.data?.carId ?? undefined,
    carStatus: DataOfcar?.data?.carStatus ?? undefined,
    carName: DataOfcar?.data?.carName ?? undefined,
    carCode: DataOfcar?.data?.carCode ?? undefined,
    plateNumber: DataOfcar?.data?.plateNumber ?? undefined,
    brandId: DataOfcar?.data?.brandId ?? undefined,
    modelId: DataOfcar?.data?.modelId ?? undefined,
    engineId: DataOfcar?.data?.engineId ?? undefined,
    yearId: DataOfcar?.data?.yearId ?? undefined,
    typeId: DataOfcar?.data?.typeId ?? undefined,
    categoryId: DataOfcar?.data?.categoryId ?? undefined,
    image: DataOfcar?.data?.image ?? undefined,
    images: DataOfcar?.data?.images ?? undefined,
    cover: DataOfcar?.data?.cover ?? undefined,
    numberOfDoors: DataOfcar?.data?.numberOfDoors ?? 4,
    numberOfPassengers: DataOfcar?.data?.numberOfPassengers ?? 5,
    airCondition: DataOfcar?.data?.airCondition ?? false,
    showHome: DataOfcar?.data?.showHome ?? false,
    price: DataOfcar?.data?.price ?? undefined,
    offer: DataOfcar?.data?.offer ?? false,
    insurancePrice: DataOfcar?.data?.insurancePrice ?? undefined,
    dailyPrice: DataOfcar?.data?.dailyPrice ?? undefined,
    weeklyPrice: DataOfcar?.data?.weeklyPrice ?? undefined,
    monthlyPrice: DataOfcar?.data?.monthlyPrice ?? undefined,
    yearlyPrice: DataOfcar?.data?.yearlyPrice ?? undefined,
    offerDailyPrice: DataOfcar?.data?.offerDailyPrice ?? undefined,
    offerWeeklyPrice: DataOfcar?.data?.offerWeeklyPrice ?? undefined,
    offerMonthlyPrice: DataOfcar?.data?.offerMonthlyPrice ?? undefined,
    offerYearlyPrice: DataOfcar?.data?.offerYearlyPrice ?? undefined,
    kmPrice: DataOfcar?.data?.kmPrice ?? undefined,
    maxKm: DataOfcar?.data?.maxKm ?? undefined,
    systemId: DataOfcar?.data?.systemId ?? undefined,
    notes: DataOfcar?.data?.notes ?? undefined,
    // discountPercentage: DataOfcar?.data?.discountPercentage ?? undefined,
    finalPrice: DataOfcar?.data?.finalPrice ?? undefined,
    numOfDays: DataOfcar?.data?.numOfDays ?? undefined,
    datingType: DataOfcar?.data?.datingType ?? undefined,
    extraKmId: DataOfcar?.data?.extraKmId ?? undefined,
    extraKm: DataOfcar?.data?.extraKm ?? undefined,
    extraPrice: DataOfcar?.data?.extraPrice ?? undefined,
    extraNotes: DataOfcar?.data?.extraNotes ?? undefined,
    extraHoursPrice: DataOfcar?.data?.extraHoursPrice ?? undefined,
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (DataOfcar?.data) {
      form.reset(defaultValues);
      setStep(DataOfcar?.data.carId && !DataOfcar?.data.dailyPrice ? "2" : "3");
    }
  }, [DataOfcar, form]);
  useEffect(() => {
    if (DataOfCarBranchbyCar) {
      form.setValue("branchs", DataOfCarBranchbyCar);
    }
  }, [DataOfCarBranchbyCar]);
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Ensure required fields are not undefined
    const sendValues = {
      ...values,
      plateNumber: values.plateNumber ?? "",
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

    const onError = (error: Error) => {
      console.error("Error editing DataOfcar?.data:", error);
    };
    const { branchs, ...restValues } = sendValues;

    mutateAddCarOnbranchs(
      (
        Object.values(form.getValues("branchs")) as Array<
          { branchId: string | number | undefined } | undefined
        >
      )
        .filter((item) => item?.branchId)
        .map((item) => ({ ...item, carId: DataOfcar?.data?.carId })),
      {
        onSuccess: () => {
          refetchDataOfCarBranchbyCar();
          mutateAdd(
            { ...restValues },
            {
              onSuccess: () => {
                navigate(`/cars`);
              },
              onError,
            }
          );
        },
        onError,
      }
    );
  }

  return {
    form,
    onSubmit,
    isLoading: false,
  };
}

export type FormType = ReturnType<typeof UseAddOrEditDataOfPage>["form"];
