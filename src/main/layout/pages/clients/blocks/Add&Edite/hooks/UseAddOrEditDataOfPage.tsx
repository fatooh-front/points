import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { getChangedFields } from "@/main/global/utils/objectUtils";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate, useParams } from "react-router-dom";
import {
  useAddOrUpdateClient,
  useGetClient,
} from "@/main/global/api/restful/userManagmentAPI/clientsManager/clientsQuery";

type Props = {
  DataOfClient?: any;
  type?: string;
};

export function UseAddOrEditDataOfPage({}: Props) {
  const { id } = useParams();

  const { mutate: mutateAdd } = useAddOrUpdateClient();
  const navigate = useNavigate();
  const { data: DataOfClient } = useGetClient(id);

  const { t } = useTranslation("clients");
  const { t: toastT } = useTranslation("toast");

  const formSchema = z.object({
    firstName: z
      .string()
      .min(1, { message: t("clients.form.validation.firstName") }),
    lastName: z
      .string()
      .min(1, { message: t("clients.form.validation.lastName") }),
    clientType: z.any(),
    clientStatus: z.any(),
    mobile: z.string().optional().nullable(),
    email: z.string().email({ message: t("clients.form.validation.email") }),
    gender: z.string().email({ message: t("clients.form.validation.email") }),
    image: z.any(),
    nationality: z.any(),

    nationalId: z.any(),
    copyNum: z.any(),
    cityId: z.any(),
    address: z.any(),
    membershipName: z.any(),
    membership: z.any(),
    birthdate: z.any(),
    licenseExpiration: z.any(),
  });

  const defaultValues = {
    firstName: DataOfClient?.data?.firstName,
    lastName: DataOfClient?.data?.lastName,
    clientType: DataOfClient?.data?.clientType,
    clientStatus: DataOfClient?.data?.clientStatus,
    mobile: DataOfClient?.data?.mobile ?? undefined,
    email: DataOfClient?.data?.email,
    image: DataOfClient?.data?.image,
    nationality: DataOfClient?.data?.nationality,
    nationalId: DataOfClient?.data?.nationalId,
    copyNum: DataOfClient?.data?.copyNum,
    cityName: DataOfClient?.data?.cityName,
    cityId: DataOfClient?.data?.cityId,
    address: DataOfClient?.data?.address,
    gender: DataOfClient?.data?.gender === 1 ? "ذكر" : "انثى ",
    membershipName: DataOfClient?.data?.membershipName,
    birthdate: DataOfClient?.data?.birthdate,
    licenseExpiration: DataOfClient?.data?.licenseExpiration,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (DataOfClient) {
      form.reset(defaultValues);
    }
  }, [DataOfClient, form]);

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
    const onSuccess = () => {
      form.reset({});
      navigate("/settings/clients");
    };
    const onError = (error: Error) => {
      console.error("Error editing DataOfClient:", error);
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
