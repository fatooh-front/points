import logoImg from "@/main/global/assets/logo/logo.png";
import authPageImg from "@/main/global/assets/auth/auth-page.jpg";
import { useTranslation } from "react-i18next";
import sendMessageImg from "@/main/global/assets/auth/sendMessage.gif";
import ChangeLang from "@/main/layout/AppLayout/blocks/appBar/blocks/changeLang/ChangeLang";

const SendActiveDonePage = () => {
  const { t } = useTranslation("auth");

  return (
    <div className="w-full h-dvh flex items-center justify-center bg-gray-100 min-h-screen px-3">
      <div className="flex w-full lg:h-full max-h-[650px] max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg lg:max-w-4xl bg-white">
        <div className="hidden bg-cover lg:block lg:w-1/2">
          <img className="w-full h-full" src={authPageImg} alt="" />
        </div>

        <div className="relative w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="absolute top-2 start-2">
            <ChangeLang />
          </div>
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-12 sm:h-20" src={logoImg} alt="" />
          </div>

          <div className="flex items-center justify-between mt-12">
            <span className="w-1/5 border-b lg:w-1/4" />
            <p className="text-xs text-center text-gray-500 uppercase">
              {t("auth.sendActiveDone.title")}
            </p>
            <span className="w-1/5 border-b lg:w-1/4" />
          </div>
          <div className="flex flex-col gap-2 items-center justify-center mt-4">
            <img src={sendMessageImg} alt="send message done" />
            <p className="text-primary-700">
              {t("auth.login.form.sendDoneMessage")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendActiveDonePage;
