import { FieldValues, useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CountryList from "country-list-with-dial-code-and-flag";
import { useForgetPassword } from "@/main/global/api/restful/userManagmentAPI/authManager/useAuthQuery";
import { getIsoCode } from "@/main/global/utils/countries/getIsoCodeFromName";
import { getCountry } from "@/main/global/utils/countries/getCountry";
import { removeEmptyFields } from "@/main/global/utils/objectUtils";
import { toast } from "@/components/ui/use-toast";
import { messageApiInLang } from "@/main/global/api/shared/ApiUtils";

const useForgetPasswordPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("auth");
  const { t: toastT } = useTranslation("toast");

  const {
    mutateAsync: mutateAsyncForgetPassword,
    isPending: isPendingForgetPassword,
  } = useForgetPassword();

  const formSchema = z
    .object({
      type: z.string(),
      email: z
        .string()
        .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, {
          message: t("auth.form.validation.email"),
        })
        .optional()
        .nullable()
        .or(z.literal("")),
      phoneCode: z.string().optional().nullable(),
      phone: z.union([
        z
          .string()
          .regex(/^\d{1,14}$/, {
            message: t("auth.form.validation.phone"),
          })
          .optional()
          .nullable()
          .or(z.literal("")),
        z.number(),
      ]),
      // phone: z
      //   .string()
      //   .regex(/^\d{1,14}$/, {
      //     message: t("auth.form.validation.phone"),
      //   })
      //   .optional().nullable()
      //   .or(z.literal("")),
    })
    .refine(
      (data) => {
        if (data.type === "email") {
          return !!data.email;
        }
        return true;
      },
      {
        message: t("auth.form.validation.requiredEmail"),
        path: ["email"],
      }
    )
    .refine(
      (data) => {
        if (data.type === "phone") {
          return !!data.phone && !!data.phoneCode;
        }
        return true;
      },
      {
        message: t("auth.form.validation.requiredPhone"),
        path: ["phone"],
      }
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "email",
      email: "",
      phoneCode: CountryList.findByCountryCode(
        getIsoCode(getCountry()) as any
      )[0]?.dialCode,
      phone: "",
    },
  });

  const typeValue = useWatch({
    control: form?.control,
    name: "type",
  });

  const onSubmit = async (values: FieldValues) => {
    const sendValues = {
      [values.type]: values.type === "phone" ? values?.phone : values?.email,
      phoneCode: values.type === "phone" ? values.phoneCode : "",
    };

    const forgetPasswordResponse = await mutateAsyncForgetPassword({
      sendValues: removeEmptyFields(sendValues),
      type: values.type,
    });
    console.log("forgetPasswordResponse", forgetPasswordResponse);

    values.type === "phone"
      ? navigate("/auth/set_new_password")
      : navigate("/auth/send_active_done");

    toast({
      title: `${toastT("auth.toast.success.welcome")}, ${
        forgetPasswordResponse.data.fullName
      }`,
      description: messageApiInLang(forgetPasswordResponse.message),
    });
  };

  const radioItems = [
    { value: "email", label: t("auth.form.email") },
    { value: "phone", label: t("auth.form.phone") },
  ];

  return {
    form,
    onSubmit,
    isPendingForgetPassword,
    typeValue,
    radioItems,
  };
};

export default useForgetPasswordPage;
