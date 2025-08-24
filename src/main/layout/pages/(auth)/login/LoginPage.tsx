import logoImg from "@/main/global/assets/logo/logo.png";
import background from "./background.png";
import { useTranslation } from "react-i18next";
import { Form } from "@/components/ui/form";
import { X } from "lucide-react";
import useLoginPage from "./hooks/useLoginPage";

import TFormField from "@/main/common/components/TForm/TFormField";

import TButton from "@/main/common/components/TForm/TButton";
import { Checkbox } from "@/components/ui/checkbox";
// import { useAuth } from "@/main/global/store/auth/useAuth";

const LoginPage = () => {
  const { t } = useTranslation("auth");

  const {
    form,
    onSubmit,
    isPendingLogin,
    rememberValue,
    isNotActivated,
    setIsNotActivated,
    onSendReActive,
    isSendDone,
    setIsSendDone,
    isPendingReSendActivate,
    dataSettingPortal,
  } = useLoginPage();
  // const setLoginData = useAuth((state) => state.setLoginData);

  return (
    <div
      className="w-full h-dvh flex items-center justify-center min-h-screen px-3 bg-cover bg-center"
      style={{
        backgroundImage: `url('${background}')`,
      }}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full  justify-center items-center  min-h-[Hug(611px)] max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg lg:max-w-[785px] bg-white"
        >
          <div
            // onClick={() => {
            //   setLoginData({
            //     token: "response?.data.bearerToken",
            //     message: "response?.message",
            //     user: {
            //       email: "user@email.com",
            //       firstName: "First",
            //       id: "user-id",
            //       type: "user-type",
            //       lastName: "Last",
            //       phone: "123456789",
            //       picture: "picture-url",
            //     },
            //   });
            // }}
            className="relative w-full px-6 py-8 md:px-10 lg:w-full"
          >
            <div className="flex justify-center mx-auto">
              <img
                className="w-[173px] h-auto "
                src={dataSettingPortal?.logo || logoImg}
                alt=""
              />
            </div>

            <div className="flex items-center justify-between mt-12">
              <span className="w-1/5 border-b lg:w-1/4" />

              <span className="w-1/5 border-b lg:w-1/4" />
            </div>
            <div className="flex flex-col gap-4 mt-4">
              <TFormField
                typeField="input"
                form={form}
                className="h-[Hug(62px)]"
                name="username"
                placeholder={t("auth.form.email_placeholder")}
                label={t("auth.form.email")}
                labelInput={t("auth.form.email")}
                autoComplete="new-password"
              />

              <TFormField
                typeField="input"
                type="password"
                form={form}
                placeholder={t("auth.form.password_placeholder")}
                name="password"
                label={t("auth.form.password")}
                className="h-[Hug(62px)]"
                labelInput={t("auth.form.password")}
                linkBelowField={
                  <div className=" flex justify-between w-full mt-[8px]">
                    <p className=" flex items-center gap-2">
                      <Checkbox
                        className="mt-2 md:mt-0"
                        checked={rememberValue}
                        onCheckedChange={() => {
                          form.setValue("remember", !rememberValue);
                        }}
                      />{" "}
                      {t("auth.form.password.remember")}
                    </p>
                    <p className=" text-[#CE931A]">
                      {t("auth.form.password.forgot")}
                    </p>
                  </div>
                }
                autoComplete="new-password"
              />
            </div>
            <div className="flex flex-col gap-2 mt-10">
              {isNotActivated && (
                <div className="relative flex flex-col gap-2 border border-dashed rounded-md p-4">
                  <X
                    role="button"
                    className="absolute top-1 start-1 text-red-500 w-4 h-4 cursor-pointer"
                    onClick={() => setIsNotActivated(false)}
                  />
                  <p className="text-sm text-secondry-800">
                    {t("auth.login.form.reActiveMessage")}
                  </p>
                  <TButton
                    disabled={isPendingReSendActivate}
                    onClick={() => onSendReActive()}
                    type="button"
                    className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary-600 hover:bg-primary-500 rounded-lg hover:primary-foreground focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                  >
                    {t("auth.login.form.sendReActive")}
                  </TButton>
                </div>
              )}
              {isSendDone && (
                <div className="relative flex flex-col gap-2 border border-dashed rounded-md p-4">
                  <X
                    role="button"
                    className="absolute top-1 start-1 text-red-500 w-4 h-4 cursor-pointer"
                    onClick={() => {
                      setIsSendDone(false);
                    }}
                  />
                  <p className="text-sm text-secondry-800">
                    {t("auth.login.form.sendDoneMessage")}
                  </p>
                </div>
              )}
              <div></div>
              {!isNotActivated && (
                <TButton
                  disabled={isPendingLogin}
                  type="submit"
                  className="w-full h-[Hug(54px)] px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg hover:primary-foreground focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                >
                  {t("auth.login.form.button")}
                </TButton>
              )}
            </div>

            {/* <div className="flex items-center justify-between mt-4">
              <a
                href="#"
                className="text-xs text-gray-500 hover:underline"
              >
                {t("auth.form.help")}
              </a>
            </div> */}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;
