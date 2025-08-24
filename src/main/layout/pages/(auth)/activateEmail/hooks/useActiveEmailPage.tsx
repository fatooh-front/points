import { toast } from "@/components/ui/use-toast";
import { useActivateEmail } from "@/main/global/api/restful/userManagmentAPI/authManager/useAuthQuery";
import { messageApiInLang } from "@/main/global/api/shared/ApiUtils";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";

const useActiveEmailPage = () => {
  const { t } = useTranslation("auth");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useActivateEmail();
  useEffect(() => {
    const token = searchParams.get("token") || "";
    const handleActiveEmail = async () => {
      try {
        const response = await mutateAsync(token);
        console.log("response", response);
        toast({
          title: `${t("auth.login.form.activeAccountMessage")}`,
          description: messageApiInLang(response?.message),
        });
      } catch (err) {
        navigate("/auth/login", { replace: true });
      }
    };
    handleActiveEmail();
  }, []);
  return { isPending };
};

export default useActiveEmailPage;
