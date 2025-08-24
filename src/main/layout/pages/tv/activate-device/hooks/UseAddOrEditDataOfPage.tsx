import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { getChangedFields } from "@/main/global/utils/objectUtils";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  // useAddBranches,
  useGetBranche,
} from "@/main/global/api/restful/userManagmentAPI/BranchesManager/BranchesQuery";
import {
  // useNavigate,
  useParams,
} from "react-router-dom";

type Props = {
  // DataOfBrancheOptions?: Option[];
  DataOfBranche?: any;
  type?: string;
};
export function UseAddOrEditDataOfPage({}: // DataOfBrancheOptions,
Props) {
  const { id } = useParams();

  // const { mutate: mutateAdd } = useAddBranches();
  // const navigate = useNavigate();
  const { data: DataOfBranche } = useGetBranche(id);
  console.log(DataOfBranche, "dfdsfsdfsdf");

  const { t } = useTranslation("carsYear");
  const { t: toastT } = useTranslation("toast");

  const formSchema = z.object({
    branchId: z.union([z.string(), z.number()]).optional().nullable(),
    cityId: z.union([z.string(), z.number()]),
    whId: z.union([z.string(), z.number()]).optional().nullable(),
    branchName: z.string().min(1, {
      message: t("carsYear.form.validation.branchName"),
    }),
    bookingType: z.string().min(1, {
      message: t("carsYear.form.validation.branchArName"),
    }),
    latitude: z.number({
      required_error: t("carsYear.form.validation.latitude"),
      invalid_type_error: t("carsYear.form.validation.latitude"),
    }),
    longitude: z.number({
      required_error: t("carsYear.form.validation.longitude"),
      invalid_type_error: t("carsYear.form.validation.longitude"),
    }),
    mobile: z.string().min(1, {
      message: t("carsYear.form.validation.mobile"),
    }),
    email: z.string().email({
      message: t("carsYear.form.validation.email"),
    }),
    phone1: z
      .union([z.string(), z.number()])
      .refine(
        (val) =>
          (typeof val === "string" && val.length >= 1) ||
          (typeof val === "number" && val.toString().length >= 1),
        {
          message: t("carsYear.form.validation.phone1"),
        }
      ),
    phone2: z.union([z.string(), z.number()]).optional().nullable(),
    workingHoures: z.string({
      message: "carsYear.form.validation.phone2",
    }),
    notes: z.string().optional().nullable(),
  });

  const defaultValues = {
    branchId: DataOfBranche?.branchId,
    cityId: DataOfBranche?.cityId,
    whId: DataOfBranche?.whId,
    branchName: DataOfBranche?.branchName,
    branchArName: DataOfBranche?.branchArName,
    latitude: DataOfBranche?.latitude,
    longitude: DataOfBranche?.longitude,
    mobile: DataOfBranche?.mobile,
    email: DataOfBranche?.email,
    phone1: DataOfBranche?.phone1,
    phone2: DataOfBranche?.phone2,
    workingHoures: DataOfBranche?.workingHoures,
    notes: DataOfBranche?.notes,
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (DataOfBranche) {
      form.reset(defaultValues);
    }
  }, [DataOfBranche, form]);

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
    // const onSuccess = () => {
    //   console.log("DataOfBranche edited successfully");
    //   form.reset({});
    //   navigate("/settings/branches");
    // };
    // const onError = (error: Error) => {
    //   console.error("Error editing DataOfBranche:", error);
    // };
    // mutateAdd(sendValues, {
    //   onSuccess,
    //   onError,
    // });
  }

  return {
    form,
    onSubmit,
    isLoading: false,
  };
}
