import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { getChangedFields } from "@/main/global/utils/objectUtils";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { Limousine } from "@/main/global/api/restful/userManagmentAPI/LimousineManager/LimousineTypes";
import { useAddLimousinePrice } from "@/main/global/api/restful/userManagmentAPI/LimousineManager/LimousineQuery";

export function UseAddOrEditDataOfPage(car: Limousine) {
  const { t: toastT } = useTranslation("toast");

  console.log("car", car);

  const { mutate: mutateAdd } = useAddLimousinePrice(`${car.id}`);

  const formSchema = z.object({
    daysHours: z.number().optional().nullable(),
    airportMakkah: z.number().optional().nullable(),
    airportJeddah: z.number().optional().nullable(),
    cityToCity: z.number().optional().nullable(),
    sameCity: z.number().optional().nullable(),
    firstFourHours: z.number().optional().nullable(),
    extraHour: z.number().optional().nullable(),
    dayPrice: z.number().optional().nullable(),
    extraHourDayPrice: z.number().optional().nullable(),
  });

  const defaultValues = {
    daysHours: car?.daysHours ?? null,
    airportMakkah: car?.airportMakkah ?? null,
    airportJeddah: car?.airportJeddah ?? null,
    cityToCity: car?.cityToCity ?? null,
    sameCity: car?.sameCity ?? null,
    firstFourHours: car?.firstFourHours ?? null,
    extraHour: car?.extraHour ?? null,
    dayPrice: car?.dayPrice ?? null,
    extraHourDayPrice: car?.extraHourDayPrice ?? null,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (car) {
      form.reset(defaultValues);
    }
  }, [car, form]);

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

    mutateAdd(sendValues, {
      onSuccess: () => {
        console.log("Data saved successfully");
        form.reset({});
      },
      onError: (error: Error) => {
        console.error("Error saving data:", error);
      },
    });
  }

  return {
    form,
    onSubmit,
    isLoading: false,
  };
}
