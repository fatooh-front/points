import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { getChangedFields } from "@/main/global/utils/objectUtils";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { WorkingHours } from "@/main/global/api/restful/userManagmentAPI/carsManager/carsTypes";
import { useAddWorkinghours } from "@/main/global/api/restful/userManagmentAPI/carsManager/carsUsersQuery";

type Props = {
  allDays: WorkingHours;
  unit?: any;
  type?: string;
  refetch?: any;
};
export function useUnitFormDialog({ allDays, type, unit, refetch }: Props) {
  const { mutate: mutateAdd } = useAddWorkinghours();

  const { t } = useTranslation("carBrands");
  const { t: toastT } = useTranslation("toast");

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const formSchema = z.object({
    current: z.any(),

    hourName: z.string(),
    hourId: z.union([z.number(), z.string()]).optional().nullable(),
    objId: z.union([z.number(), z.string()]),
    sun: z.union([z.number(), z.string()]).optional().nullable(),
    mon: z.union([z.number(), z.string()]).optional().nullable(),
    tues: z.union([z.number(), z.string()]).optional().nullable(),
    wed: z.union([z.number(), z.string()]).optional().nullable(),
    thurs: z.union([z.number(), z.string()]).optional().nullable(),
    fri: z.union([z.number(), z.string()]).optional().nullable(),
    sat: z.union([z.number(), z.string()]).optional().nullable(),
    sunOpenHour: z.union([z.number(), z.string()]).optional().nullable(),
    sunOpenMin: z.union([z.number(), z.string()]).optional().nullable(),
    monOpenHour: z.union([z.number(), z.string()]).optional().nullable(),
    monOpenMin: z.union([z.number(), z.string()]).optional().nullable(),
    tuesOpenHour: z.union([z.number(), z.string()]).optional().nullable(),
    tuesOpenMin: z.union([z.number(), z.string()]).optional().nullable(),
    wedOpenHour: z.union([z.number(), z.string()]).optional().nullable(),
    wedOpenMin: z.union([z.number(), z.string()]).optional().nullable(),
    thursOpenHour: z.union([z.number(), z.string()]).optional().nullable(),
    thursOpenMin: z.union([z.number(), z.string()]).optional().nullable(),
    friOpenHour: z.union([z.number(), z.string()]).optional().nullable(),
    friOpenMin: z.union([z.number(), z.string()]).optional().nullable(),
    satOpenHour: z.union([z.number(), z.string()]).optional().nullable(),
    satOpenMin: z.union([z.number(), z.string()]).optional().nullable(),
    sunCloseHour: z.union([z.number(), z.string()]).optional().nullable(),
    sunCloseMin: z.union([z.number(), z.string()]).optional().nullable(),
    monCloseHour: z.union([z.number(), z.string()]).optional().nullable(),
    monCloseMin: z.union([z.number(), z.string()]).optional().nullable(),
    tuesCloseHour: z.union([z.number(), z.string()]).optional().nullable(),
    tuesCloseMin: z.union([z.number(), z.string()]).optional().nullable(),
    wedCloseHour: z.union([z.number(), z.string()]).optional().nullable(),
    wedCloseMin: z.union([z.number(), z.string()]).optional().nullable(),
    thursCloseHour: z.union([z.number(), z.string()]).optional().nullable(),
    thursCloseMin: z.union([z.number(), z.string()]).optional().nullable(),
    friCloseHour: z.union([z.number(), z.string()]).optional().nullable(),
    friCloseMin: z.union([z.number(), z.string()]).optional().nullable(),
    satCloseHour: z.union([z.number(), z.string()]).optional().nullable(),
    satCloseMin: z.union([z.number(), z.string()]).optional().nullable(),
    notes: z.string().nullable().optional().nullable(),
  });

  const defaultValues =
    type !== "add" && allDays
      ? {
          current: allDays.current,
          hourId: allDays.hourId,
          hourName: allDays.hourName || "",
          objId: allDays.objId || "",
          sun: allDays.sun,
          mon: allDays.mon,
          tues: allDays.tues,
          wed: allDays.wed,
          thurs: allDays.thurs,
          fri: allDays.fri,
          sat: allDays.sat,
          sunOpenHour: allDays.sunOpenHour,
          sunOpenMin: allDays.sunOpenMin,
          monOpenHour: allDays.monOpenHour,
          monOpenMin: allDays.monOpenMin,
          tuesOpenHour: allDays.tuesOpenHour,
          tuesOpenMin: allDays.tuesOpenMin,
          wedOpenHour: allDays.wedOpenHour,
          wedOpenMin: allDays.wedOpenMin,
          thursOpenHour: allDays.thursOpenHour,
          thursOpenMin: allDays.thursOpenMin,
          friOpenHour: allDays.friOpenHour,
          friOpenMin: allDays.friOpenMin,
          satOpenHour: allDays.satOpenHour,
          satOpenMin: allDays.satOpenMin,
          sunCloseHour: allDays.sunCloseHour,
          sunCloseMin: allDays.sunCloseMin,
          monCloseHour: allDays.monCloseHour,
          monCloseMin: allDays.monCloseMin,
          tuesCloseHour: allDays.tuesCloseHour,
          tuesCloseMin: allDays.tuesCloseMin,
          wedCloseHour: allDays.wedCloseHour,
          wedCloseMin: allDays.wedCloseMin,
          thursCloseHour: allDays.thursCloseHour,
          thursCloseMin: allDays.thursCloseMin,
          friCloseHour: allDays.friCloseHour,
          friCloseMin: allDays.friCloseMin,
          satCloseHour: allDays.satCloseHour,
          satCloseMin: allDays.satCloseMin,
          notes: allDays.notes ?? null,
        }
      : {
          current: allDays.current,

          hourName: null,

          objId: allDays?.objId || 0,
          sun: 0,
          mon: 0,
          tues: 0,
          wed: 0,
          thurs: 0,
          fri: 0,
          sat: 0,
          sunOpenHour: 0,
          sunOpenMin: 0,
          monOpenHour: 0,
          monOpenMin: 0,
          tuesOpenHour: 0,
          tuesOpenMin: 0,
          wedOpenHour: 0,
          wedOpenMin: 0,
          thursOpenHour: 0,
          thursOpenMin: 0,
          friOpenHour: 0,
          friOpenMin: 0,
          satOpenHour: 0,
          satOpenMin: 0,
          sunCloseHour: 0,
          sunCloseMin: 0,
          monCloseHour: 0,
          monCloseMin: 0,
          tuesCloseHour: 0,
          tuesCloseMin: 0,
          wedCloseHour: 0,
          wedCloseMin: 0,
          thursCloseHour: 0,
          thursCloseMin: 0,
          friCloseHour: 0,
          friCloseMin: 0,
          satCloseHour: 0,
          satCloseMin: 0,
          notes: null,
        };
  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    console.log(defaultValues, allDays, unit, "fdgdgdfgdfgdfgdfg");

    if (allDays) {
      form.reset(defaultValues);
    }
  }, [allDays, form]);

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
      console.log("allDays edited successfully");
      refetch();
      setOpen(false);
      form.reset({});
    };
    const onError = (error: Error) => {
      console.error("Error editing allDays:", error);
    };
    mutateAdd(sendValues, {
      onSuccess,
      onError,
    });
  }

  const fireOnClose = () => {
    form.reset({});
  };

  const getHeaderForm = () => {
    if (type === "add") {
      return t("carBrands.form.header.add");
    } else if (type === "edit") {
      return t("carBrands.form.header.edit");
    } else if (type === "view") {
      return t("carBrands.form.header.view");
    }
  };

  return {
    open,
    setOpen,
    form,
    onSubmit,
    dataallDays: allDays,
    error: "",
    isLoading: false,
    fireOnClose,
    // isPending: !!isPendingUpdate || !!isPendingAdd,
    getHeaderForm,
    file,
    setFile,
  };
}
