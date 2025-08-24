import logoImg from "@/main/global/assets/logo/logo.png";
import authPageImg from "@/main/global/assets/auth/auth-page.jpg";
import { useTranslation } from "react-i18next";
import { Form } from "@/components/ui/form";
import useActivePhonePage from "./hooks/useActivePhonePage";
import ChangeLang from "@/main/layout/AppLayout/blocks/appBar/blocks/changeLang/ChangeLang";
import TFormField from "@/main/common/components/TForm/TFormField";
import { handleKeyDownNumberNoCopy } from "@/main/global/utils/eventHandlers";
import TButton from "@/main/common/components/TForm/TButton";

const ActivePhonePage = () => {
  const { t } = useTranslation("auth");

  const { form, onSubmit, isPendingActivatePhone } = useActivePhonePage();

  return (
    <div className="w-full h-dvh flex items-center justify-center bg-gray-100 min-h-screen px-3">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full lg:h-full max-h-[650px] max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg lg:max-w-4xl bg-white"
        >
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
                {t("auth.activePhone.title")}
              </p>
              <span className="w-1/5 border-b lg:w-1/4" />
            </div>
            <div className="flex flex-col gap-4 mt-4">
              <TFormField
                typeField="input"
                form={form}
                name="otp"
                label={t("auth.form.otp")}
                labelInput={t("auth.form.otp")}
                onKeyDown={handleKeyDownNumberNoCopy}
              />
            </div>
            <div className="flex flex-col gap-2 mt-6">
              <TButton
                disabled={isPendingActivatePhone}
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg hover:primary-foreground focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              >
                {t("auth.form.active.button")}
              </TButton>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ActivePhonePage;
