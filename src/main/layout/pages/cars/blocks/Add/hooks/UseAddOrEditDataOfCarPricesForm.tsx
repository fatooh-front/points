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
  useGetCars,
} from "../../../../../../global/api/restful/userManagmentAPI/carsManager/carsUsersQuery";

type Props = {
  // DataOfcar?.dataOptions?: Option[];
  DataOfcar?: any;
  type?: string;
};
export function UseAddOrEditDataOfPage({}: // DataOfcar?.dataOptions,
Props) {
  const { id } = useParams();

  const { mutate: mutateAdd } = useAddCars();
  const navigate = useNavigate();
  const { data: DataOfcar } = useGetCars(id);
  console.log(DataOfcar, "dfdsfsdfsdf");

  const { t } = useTranslation("carsYear");
  const { t: toastT } = useTranslation("toast");

  const formSchema = z.object({
    carId: z.union([z.string(), z.number()]),
    carStatus: z.union([z.string(), z.number()]),
    carName: z
      .string()
      .min(1, { message: t("carsYear.form.validation.carName") }),
    carCode: z
      .string()
      .min(1, { message: t("carsYear.form.validation.carCode") }),
    plateNumber: z
      .string()
      .min(1, { message: t("carsYear.form.validation.plateNumber") }),
    brandId: z.union([z.string(), z.number()]),
    modelId: z.union([z.string(), z.number()]),
    engineId: z.union([z.string(), z.number()]),
    yearId: z.union([z.string(), z.number()]),
    typeId: z.union([z.string(), z.number()]),
    categoryId: z.union([z.string(), z.number()]),
    image: z.string(),
    cover: z.string(),
    numberOfDoors: z.union([z.string(), z.number()]),
    numberOfPassengers: z.union([z.string(), z.number()]),
    airCondition: z.boolean(),
    showHome: z.boolean(),
    price: z.union([z.string(), z.number()]),
    offer: z.boolean(),
    insurancePrice: z.union([z.string(), z.number()]),
    dailyPrice: z.union([z.string(), z.number()]),
    weeklyPrice: z.union([z.string(), z.number()]),
    monthlyPrice: z.union([z.string(), z.number()]),
    yearlyPrice: z.union([z.string(), z.number()]),
    offerDailyPrice: z.union([z.string(), z.number()]),
    offerWeeklyPrice: z.union([z.string(), z.number()]),
    offerMonthlyPrice: z.union([z.string(), z.number()]),
    offerYearlyPrice: z.union([z.string(), z.number()]),
    kmPrice: z.union([z.string(), z.number()]),
    maxKm: z.union([z.string(), z.number()]),
    systemId: z.string(),
    notes: z.string(),
    brandName: z.string(),
    brandArabicName: z.string(),
    brandLogo: z.string(),
    brandNotes: z.string().nullable(),
    modelEnglishName: z.string(),
    modelArabicName: z.string(),
    modelNotes: z.string(),
    engineEnglishName: z.string(),
    engineArabicName: z.string(),
    engineNotes: z.string(),
    carYear: z.union([z.string(), z.number()]),
    carYearNotes: z.string(),
    typeEnglishName: z.string(),
    typeArabicName: z.string(),
    typeNotes: z.string(),
    categoryEnglishName: z.string(),
    categoryArabicName: z.string(),
    categoryDeliveryPrice: z.union([z.string(), z.number()]),
    categoryNotes: z.string().nullable(),
    finalPrice: z.union([z.string(), z.number()]),
    numOfDays: z.union([z.string(), z.number()]),
    datingType: z.union([z.string(), z.number()]),
    extraKmId: z.union([z.string(), z.number()]),
    extraKm: z.string(),
    extraPrice: z.union([z.string(), z.number()]),
    extraNotes: z.union([z.string(), z.number()]),
  });

  const defaultValues = {
    carId: DataOfcar?.data?.carId ?? "",
    carStatus: DataOfcar?.data?.carStatus ?? "",
    carName: DataOfcar?.data?.carName ?? "",
    carCode: DataOfcar?.data?.carCode ?? "",
    plateNumber: DataOfcar?.data?.plateNumber ?? "",
    brandId: DataOfcar?.data?.brandId ?? "",
    modelId: DataOfcar?.data?.modelId ?? "",
    engineId: DataOfcar?.data?.engineId ?? "",
    yearId: DataOfcar?.data?.yearId ?? "",
    typeId: DataOfcar?.data?.typeId ?? "",
    categoryId: DataOfcar?.data?.categoryId ?? "",
    image: DataOfcar?.data?.image ?? "",
    cover: DataOfcar?.data?.cover ?? "",
    numberOfDoors: DataOfcar?.data?.numberOfDoors ?? "",
    numberOfPassengers: DataOfcar?.data?.numberOfPassengers ?? "",
    airCondition: DataOfcar?.data?.airCondition ?? false,
    showHome: DataOfcar?.data?.showHome ?? false,
    price: DataOfcar?.data?.price ?? "",
    offer: DataOfcar?.data?.offer ?? false,
    insurancePrice: DataOfcar?.data?.insurancePrice ?? "",
    dailyPrice: DataOfcar?.data?.dailyPrice ?? "",
    weeklyPrice: DataOfcar?.data?.weeklyPrice ?? "",
    monthlyPrice: DataOfcar?.data?.monthlyPrice ?? "",
    yearlyPrice: DataOfcar?.data?.yearlyPrice ?? "",
    offerDailyPrice: DataOfcar?.data?.offerDailyPrice ?? "",
    offerWeeklyPrice: DataOfcar?.data?.offerWeeklyPrice ?? "",
    offerMonthlyPrice: DataOfcar?.data?.offerMonthlyPrice ?? "",
    offerYearlyPrice: DataOfcar?.data?.offerYearlyPrice ?? "",
    kmPrice: DataOfcar?.data?.kmPrice ?? "",
    maxKm: DataOfcar?.data?.maxKm ?? "",
    systemId: DataOfcar?.data?.systemId ?? "",
    notes: DataOfcar?.data?.notes ?? "",
    brandName: DataOfcar?.data?.brandName ?? "",
    brandArabicName: DataOfcar?.data?.brandArabicName ?? "",
    brandLogo: DataOfcar?.data?.brandLogo ?? "",
    brandNotes: DataOfcar?.data?.brandNotes ?? null,
    modelEnglishName: DataOfcar?.data?.modelEnglishName ?? "",
    modelArabicName: DataOfcar?.data?.modelArabicName ?? "",
    modelNotes: DataOfcar?.data?.modelNotes ?? "",
    engineEnglishName: DataOfcar?.data?.engineEnglishName ?? "",
    engineArabicName: DataOfcar?.data?.engineArabicName ?? "",
    engineNotes: DataOfcar?.data?.engineNotes ?? "",
    carYear: DataOfcar?.data?.carYear ?? "",
    carYearNotes: DataOfcar?.data?.carYearNotes ?? "",
    typeEnglishName: DataOfcar?.data?.typeEnglishName ?? "",
    typeArabicName: DataOfcar?.data?.typeArabicName ?? "",
    typeNotes: DataOfcar?.data?.typeNotes ?? "",
    categoryEnglishName: DataOfcar?.data?.categoryEnglishName ?? "",
    categoryArabicName: DataOfcar?.data?.categoryArabicName ?? "",
    categoryDeliveryPrice: DataOfcar?.data?.categoryDeliveryPrice ?? "",
    categoryNotes: DataOfcar?.data?.categoryNotes ?? null,
    finalPrice: DataOfcar?.data?.finalPrice ?? "",
    numOfDays: DataOfcar?.data?.numOfDays ?? "",
    datingType: DataOfcar?.data?.datingType ?? "",
    extraKmId: DataOfcar?.data?.extraKmId ?? "",
    extraKm: DataOfcar?.data?.extraKm ?? "",
    extraPrice: DataOfcar?.data?.extraPrice ?? "",
    extraNotes: DataOfcar?.data?.extraNotes ?? "",
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (DataOfcar?.data) {
      form.reset(defaultValues);
    }
  }, [DataOfcar?.data, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const sendValues = {
      ...values,
      notes: values.notes ?? "", // Ensure notes is always a string
      brandNotes: values.brandNotes === undefined ? null : values.brandNotes, // Ensure brandNotes is string or null
      categoryNotes:
        values.categoryNotes === undefined ? null : values.categoryNotes, // Ensure categoryNotes is string or null
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
      console.log("DataOfcar?.data edited successfully");
      form.reset({});
      navigate("/settings/cars");
    };
    const onError = (error: Error) => {
      console.error("Error editing DataOfcar?.data:", error);
    };
    mutateAdd(sendValues, {
      onSuccess,
      onError,
    });
  }

  return {
    form,
    onSubmit,
    isLoading: false,
  };
}

export type FormType = ReturnType<typeof UseAddOrEditDataOfPage>["form"];
