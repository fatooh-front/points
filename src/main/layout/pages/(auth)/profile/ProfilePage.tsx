import { useTranslation } from "react-i18next";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Pencil, X } from "lucide-react";
import { ProfileEditPasswordDialog } from "./dialogs/ProfileEditPasswordDialog";
import useProfilePage from "./hooks/useProfilePage";
import { toast } from "@/components/ui/use-toast";
import TFileField from "@/main/common/components/TForm/TFileField";
import TReactPhoneSelect from "@/main/common/components/TForm/reactSelect/TReactPhoneSelect";
import { handleKeyDownNumber } from "@/main/global/utils/eventHandlers";
import TReactSelect from "@/main/common/components/TForm/reactSelect/TReactSelect";
import { countryOptions } from "@/main/global/utils/countries/getCountriesCities";
import TButton from "@/main/common/components/TForm/TButton";
import TFormField from "@/main/common/components/TForm/TFormField";

const ProfilePage = () => {
  const { i18n, t } = useTranslation("auth");

  const {
    form,
    onSubmit,
    isPending,
    file,
    setFile,
    StateOptions,
    filterOption,

    type,
    isReadOnly,
    setIsReadOnly,
    picture,
  } = useProfilePage();

  return (
    <div className="box-border w-full flex items-center justify-center min-h-dvh-64px bg-gray-100 py-0 px-3">
      <div className="flex w-full md:h-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg md:max-w-4xl bg-white">
        <div className="relative w-full px-6 py-4 md:px-8">
          {isReadOnly && (
            <div className="flex gap-5">
              <Button
                type="button"
                className="p-0"
                variant="ghost"
                onClick={() => {
                  setIsReadOnly(false);
                  toast({
                    variant: "default",
                    color: "black",
                    title: t("auth.toast.canEdit.title"),
                    // description: t("auth.toast.canEdit.description"),
                  });
                }}
              >
                <Pencil size={25} className="text-yellow-700" />
              </Button>
              <ProfileEditPasswordDialog />
            </div>
          )}
          {!isReadOnly && (
            <Button
              type="button"
              className="p-0"
              variant="ghost"
              onClick={() => {
                setIsReadOnly(true);
                toast({
                  variant: "default",
                  color: "black",
                  title: t("auth.toast.exitEdit.title"),
                  // description: t("auth.toast.exitEdit.description"),
                });
              }}
            >
              <X size={25} />
            </Button>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex justify-center mx-auto">
                {/* <img className="w-auto h-12 sm:h-20" src={logoImg} alt="" /> */}
                <TFileField
                  form={form}
                  name={"picture"}
                  type={"image"}
                  file={file}
                  setFile={setFile}
                  rounded={"full"}
                  label={t("auth.label.picture")}
                  // labelDrag={t("banners.dialog.add.dragActive")}
                  // labelReplace={t("banners.dialog.add.changeImage")}
                  classNameRootProps={"p-1"}
                  containerClassName={"w-[100px] h-[100px]"}
                  readOnly={isReadOnly}
                  existingMedia={picture}
                />
              </div>

              <div className="flex items-center justify-between mt-5">
                <span className="w-1/5 border-b md:w-1/3" />
                <p className="text-xs text-center text-gray-500 uppercase">
                  {t("auth.edit.profile.title")}
                </p>
                <span className="w-1/5 border-b md:w-1/3" />
              </div>
              <div className="flex flex-col gap-2 md:gap-3 mt-4">
                <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-3 w-full">
                  <TFormField
                    typeField="input"
                    form={form}
                    name="firstName"
                    label={t("auth.form.firstName")}
                    labelInput={t("auth.form.firstName")}
                    readOnly={isReadOnly}
                  />
                  <TFormField
                    typeField="input"
                    form={form}
                    name="lastName"
                    label={t("auth.form.lastName")}
                    labelInput={t("auth.form.lastName")}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-3 w-full">
                  <TFormField
                    typeField="input"
                    form={form}
                    name="email"
                    label={t("auth.form.email")}
                    labelInput={t("auth.form.email")}
                    readOnly={isReadOnly}
                  />
                  <div className="flex flex-col gap-2 w-full">
                    <label
                      htmlFor={"phone"}
                      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block`}
                    >
                      {t("auth.form.phone")}
                    </label>
                    <div className="flex gap-1" dir="ltr">
                      <TReactPhoneSelect
                        form={form}
                        name={"phoneCode"}
                        // enableLabelEmpty={true}
                        wrapperClassName="w-28 max-w-24"
                        menuPortalTarget={document.body}
                        isDisabled={isReadOnly}
                      />
                      <TFormField
                        typeField="input"
                        form={form}
                        name="phone"
                        // label={t("auth.form.phone")}
                        labelInput={t("auth.form.phone")}
                        onKeyDown={handleKeyDownNumber}
                        readOnly={isReadOnly}
                        inputMode="decimal"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-3 w-full">
                  <TReactSelect
                    form={form}
                    name={"country"}
                    label={t("auth.form.country")}
                    options={countryOptions(i18n.language as "ar" | "en")}
                    showChecked={false}
                    menuPortalTarget={document.body}
                    filterOption={filterOption}
                    isDisabled={isReadOnly}
                  />
                  {type === "organization" && (
                    <TReactSelect
                      form={form}
                      name={"city"}
                      label={t("auth.form.city")}
                      options={StateOptions}
                      showChecked={false}
                      menuPortalTarget={document.body}
                      isDisabled={isReadOnly}
                    />
                  )}
                </div>
                {type === "organization" && (
                  <>
                    <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-3 w-full">
                      <TFormField
                        typeField="input"
                        form={form}
                        name="orgName"
                        label={t("auth.form.orgName")}
                        labelInput={t("auth.form.orgName")}
                        readOnly={isReadOnly}
                      />
                      <TFormField
                        typeField="input"
                        form={form}
                        name="address"
                        label={t("auth.form.address")}
                        labelInput={t("auth.form.address")}
                        readOnly={isReadOnly}
                      />
                    </div>
                  </>
                )}
              </div>
              {!isReadOnly && (
                <div className="mt-2">
                  <TButton
                    disabled={isPending}
                    type="submit"
                    className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg hover:primary-foreground focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                  >
                    {t("auth.edit.profile.form.button")}
                  </TButton>
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
