import { FieldValues, useForm, useWatch } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CountryList from "country-list-with-dial-code-and-flag";
import {
  useLogin,
  useReSendActivate,
} from "@/main/global/api/restful/userManagmentAPI/authManager/useAuthQuery";
import { useAuth } from "@/main/global/store/auth/useAuth";
import { getIsoCode } from "@/main/global/utils/countries/getIsoCodeFromName";
import { getCountry } from "@/main/global/utils/countries/getCountry";
import { removeEmptyFields } from "@/main/global/utils/objectUtils";
import { toast } from "@/components/ui/use-toast";
import { messageApiInLang } from "@/main/global/api/shared/ApiUtils";
import { useGetSettingByName } from "@/main/global/api/restful/userManagmentAPI/settingsManager/useSettingsQuery";

const useLoginPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("auth");
  const { t: _toastT } = useTranslation("toast");

  const { mutateAsync: mutateAsyncLogin, isPending: isPendingLogin } =
    useLogin();
  const {
    mutateAsync: mutateAsyncReSendActivate,
    isPending: isPendingReSendActivate,
  } = useReSendActivate();

  const setLoginData = useAuth((state) => state.setLoginData);
  const [isNotActivated, setIsNotActivated] = useState(false);
  const [isSendDone, setIsSendDone] = useState(false);

  const { data: dataSettingPortal, isLoading } = useGetSettingByName("portal");

  const formSchema = z.discriminatedUnion("type", [
    z.object({
      type: z.literal("email"),
      remember: z.boolean(),

      username: z.string(),
      password: z.string().min(1, {
        message: t("auth.form.validation.password"),
      }),
    }),
    z.object({
      type: z.literal("phone"),
      phoneCode: z.string({
        required_error: t("auth.form.validation.requiredPhoneCode"),
      }),
      // phone: z
      // .string()
      // .min(1, {
      //   message: t("auth.form.validation.requiredPhone"),
      // })
      // .regex(/^\d{1,14}$/, {
      //   message: t("auth.form.validation.phone"),
      // }),
      phone: z.union([
        z
          .string()
          .min(1, {
            message: t("auth.form.validation.requiredPhone"),
          })
          .regex(/^\d{1,14}$/, {
            message: t("auth.form.validation.phone"),
          }),
        z.number(),
      ]),
      password: z.string().min(1, {
        message: t("auth.form.validation.password"),
      }),
    }),
  ]);

  // const formSchema = z
  //   .object({
  //     type: z.string(),
  //     email: z
  //       .string()
  //       .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, {
  //         message: t("auth.form.validation.email"),
  //       })
  //       .optional().nullable()
  //       .or(z.literal("")),
  //     phoneCode: z.string().optional().nullable(),
  //     phone: z
  //       .string()
  //       .regex(/^\d{1,14}$/, {
  //         message: t("auth.form.validation.phone"),
  //       })
  //       .optional().nullable()
  //       .or(z.literal("")),
  //     password: z.string().min(1, {
  //       message: t("auth.form.validation.password"),
  //     }),
  //   })
  //   .refine(
  //     (data) => {
  //       if (data.type === "email") {
  //         return !!data.email;
  //       }
  //       return true;
  //     },
  //     {
  //       message: t("auth.form.validation.requiredEmail"),
  //       path: ["email"],
  //     }
  //   )
  //   .refine(
  //     (data) => {
  //       if (data.type === "phone") {
  //         return !!data.phone && !!data.phoneCode;
  //       }
  //       return true;
  //     },
  //     {
  //       message: t("auth.form.validation.requiredPhone"),
  //       path: ["phone"],
  //     }
  //   );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      remember: false,
      type: "email",
      username: "",
      phoneCode: CountryList.findByCountryCode(
        getIsoCode(getCountry()) as any
      )[0]?.dialCode,
      phone: "",
      password: "",
    } as any,
  });

  const rememberValue = useWatch({
    control: form?.control,
    name: "remember",
  });

  const onSubmit = async (values: FieldValues) => {
    setIsNotActivated(false);
    setIsSendDone(false);

    console.log(values, "dfdsfsdfsdfsdfsdf");

    const sendValues = {
      username: values?.username,
      password: values.password,
    };

    try {
      const response = await mutateAsyncLogin({
        sendValues: removeEmptyFields(sendValues),
        type: values.type,
      });
      console.log("response", response);

      setLoginData({
        token: response?.data.bearerToken,
        message: response?.message,
        user: response.data,
      });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.bearerToken}`;

      navigate("/", { replace: true });

      toast({
        title: `${t("auth.toast.success.welcome")}, ${response.data?.fullName}`,
        description: messageApiInLang(response.message),
      });
    } catch (err: any) {
      console.log("err_login", err);
      console.log("err?.response?.status", err?.response?.status);

      err?.response?.status === 403 && setIsNotActivated(true);
    }
  };

  const onSendReActive = async () => {
    const { type, username, phone, phoneCode } = form.getValues() as any;
    const sendValues = type === "phone" ? { phoneCode, phone } : { username };
    const response = await mutateAsyncReSendActivate({
      sendValues,
      type,
    });
    response?.status === 200 && setIsSendDone(true);
    setIsNotActivated(false);
    toast({
      title: t("auth.auth.form.sendDoneMessage"),
      description: messageApiInLang(response?.data?.message),
    });
  };

  const radioItems = [
    { value: "email", label: t("auth.form.email") },
    { value: "phone", label: t("auth.form.phone") },
  ];
  console.log(form.control._formState.errors, "dsafdsfsdfsdf");

  return {
    form,
    onSubmit,
    isPendingLogin,
    rememberValue,
    radioItems,
    isNotActivated,
    setIsNotActivated,
    onSendReActive,
    isSendDone,
    setIsSendDone,
    isPendingReSendActivate,
    dataSettingPortal: dataSettingPortal?.data,
    isLoading,
  };
};

export default useLoginPage;
