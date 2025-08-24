import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useActivatePhone } from "@/main/global/api/restful/userManagmentAPI/authManager/useAuthQuery";
import { toast } from "@/components/ui/use-toast";
import { messageApiInLang } from "@/main/global/api/shared/ApiUtils";

const useActivePhonePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("auth");
  const {
    mutateAsync: mutateAsyncActivatePhone,
    isPending: isPendingActivatePhone,
  } = useActivatePhone();
  const formSchema = z.object({
    otp: z.union([
      z.string().regex(/^\d{1,6}$/, { message: t("auth.form.validation.otp") }).nullable(),
      z.number().nullable(),
    ]),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });
  console.log("form.formState?.errors", form.formState?.errors);

  const onSubmit = async (values: FieldValues) => {
    const response = await mutateAsyncActivatePhone(values);
    console.log("response", response);
    navigate("/auth/login", { replace: true });
    toast({
      title: `${t("auth.login.form.activeAccountMessage")}`,
      description: messageApiInLang(response?.message),
    });
  };

  return {
    form,
    onSubmit,
    isPendingActivatePhone,
  };
};

export default useActivePhonePage;
