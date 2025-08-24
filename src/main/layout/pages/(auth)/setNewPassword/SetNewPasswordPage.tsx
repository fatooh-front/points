import logoImg from "@/main/global/assets/logo/logo.png";
import authPageImg from "@/main/global/assets/auth/auth-page.jpg";
import { useTranslation } from "react-i18next";
import { Form } from "@/components/ui/form";
import useSetNewPasswordPage from "./hooks/useSetNewPasswordPage";
import ChangeLang from "@/main/layout/AppLayout/blocks/appBar/blocks/changeLang/ChangeLang";
import TRadioGroup from "@/main/common/components/TForm/TRadioGroup";
import TFormField from "@/main/common/components/TForm/TFormField";
import { handleKeyDownNumber } from "@/main/global/utils/eventHandlers";
import TButton from "@/main/common/components/TForm/TButton";
import { Link } from "react-router-dom";

const SetNewPasswordPage = () => {
  const { t } = useTranslation("auth");

  const { form, onSubmit, isPendingSetNewPassword, radioItems, typeValue } =
    useSetNewPasswordPage();

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
                {t("auth.setNewPassword.title")}
              </p>
              <span className="w-1/5 border-b lg:w-1/4" />
            </div>
            <div className="flex flex-col gap-4 mt-4">
              <TRadioGroup
                form={form}
                name={"type"}
                radioItems={radioItems}
                outerfromItemClassName="hidden"
              />
              {typeValue === "phone" && (
                <TFormField
                  typeField="input"
                  form={form}
                  name="otp"
                  label={t("auth.form.otp")}
                  labelInput={t("auth.form.phone")}
                  onKeyDown={handleKeyDownNumber}
                  inputMode="decimal"
                />
              )}
              <TFormField
                typeField="input"
                type="password"
                form={form}
                name="password"
                label={t("auth.form.password")}
                labelInput={t("auth.form.password")}
                autoComplete="new-password"
              />
              <TFormField
                typeField="input"
                type="password"
                form={form}
                name="passwordConfirm"
                label={t("auth.form.passwordConfirm")}
                labelInput={t("auth.form.passwordConfirm")}
                autoComplete="new-password"
              />
            </div>
            <div className="flex flex-col gap-2 mt-6">
              <TButton
                disabled={isPendingSetNewPassword}
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg hover:primary-foreground focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              >
                {t("auth.setNewPassword.form.button")}
              </TButton>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-end gap-1 text-xs text-center mx-auto w-fit text-gray-500">
                <span className="leading-none">{t("auth.form.remember")}</span>
                <Link
                  to="/auth/login"
                  className="text-primary-600 text-sm leading-none hover:underline"
                >
                  {t("auth.form.login")}
                </Link>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SetNewPasswordPage;
