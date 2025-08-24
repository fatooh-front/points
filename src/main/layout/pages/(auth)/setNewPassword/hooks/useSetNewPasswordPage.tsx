import { FieldValues, useForm, useWatch } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSetNewPassword } from "@/main/global/api/restful/userManagmentAPI/authManager/useAuthQuery";
import { useAuth } from "@/main/global/store/auth/useAuth";
import { removeEmptyFields } from "@/main/global/utils/objectUtils";
import { toast } from "@/components/ui/use-toast";
import { messageApiInLang } from "@/main/global/api/shared/ApiUtils";

const useSetNewPasswordPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("auth");
  const { t: toastT } = useTranslation("toast");
  const [searchParams] = useSearchParams();

  const {
    mutateAsync: mutateAsyncSetNewPassword,
    isPending: isPendingSetNewPassword,
  } = useSetNewPassword();
  const setLoginData = useAuth((state) => state.setLoginData);

  const formSchema = z
    .object({
      type: z.string(),
      token: z.string().optional().nullable().or(z.literal("")),
      otp: z.union([
        z.string().regex(/^\d{1,6}$/, {
          message: t("auth.form.validation.otp"),
        }),
        z.number(),
      ]),
      password: z.string().min(1, {
        message: t("auth.form.validation.password"),
      }),
      passwordConfirm: z.string().min(1, {
        message: t("auth.form.validation.passwordConfirm"),
      }),
    })
    .refine(
      (data) => {
        if (data.type === "email") {
          return !!data.token;
        }
        return true;
      },
      {
        path: ["token"],
      }
    )
    .refine(
      (data) => {
        if (data.type === "phone") {
          return !!data.otp;
        }
        return true;
      },
      {
        message: t("auth.form.validation.otp"),
        path: ["otp"],
      }
    )
    .refine((data) => data.password === data.passwordConfirm, {
      message: t("auth.form.validation.passwordMismatch"),
      path: ["passwordConfirm"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: searchParams.get("token") ? "email" : "phone",
      token: searchParams.get("token") || "",
      otp: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const typeValue = useWatch({
    control: form?.control,
    name: "type",
  });

  const onSubmit = async (values: FieldValues) => {
    const response = await mutateAsyncSetNewPassword({
      sendValues: removeEmptyFields(values),
      type: values.type,
    });
    console.log("response", response);

    setLoginData({
      token: response.data.bearerToken,
      message: response.message,
      user: response.data,
    });

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.bearerToken}`;

    navigate("/", { replace: true });

    toast({
      title: `${toastT("auth.toast.success.welcome")}, ${
        response.data.fullName
      }`,
      description: messageApiInLang(response?.message),
    });
  };

  const radioItems = [
    { value: "email", label: t("auth.form.email") },
    { value: "phone", label: t("auth.form.phone") },
  ];

  return {
    form,
    onSubmit,
    isPendingSetNewPassword,
    radioItems,
    typeValue,
  };
};

export default useSetNewPasswordPage;
