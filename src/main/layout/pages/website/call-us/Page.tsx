import { useTranslation } from "react-i18next";
import { Form } from "@/components/ui/form";
import TFormField from "@/main/common/components/TForm/TFormField";
import TButton from "@/main/common/components/TForm/TButton";
import { Save } from "lucide-react";
import { UseAddOrEditContact } from "./hooks/UseAddOrEditDataOfPage";
import { FormSkeleton } from "./blocks/FormSkeleton";

const Page = ({ type = "add" }: { type?: string }) => {
  const { t } = useTranslation("CarBranch");
  const { form, onSubmit, isLoading } = UseAddOrEditContact({});

  return (
    <div className="box-border w-full flex items-center  flex-col min-h-dvh-64px">
      {!isLoading ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full mx-auto"
          >
            <div className="flex w-full  mx-auto rounded-lg shadow-lg p-6 bg-white">
              {/* Row 0: Membership Card Image */}
              <div className="flex flex-col md:flex-row w-full gap-10 mb-4">
                <div className="flex-1 grid grid-cols-2 gap-6">
                  {/* Row 1: الجوال | الهاتف */}
                  <TFormField
                    labelClassName="text-base"
                    typeField="input"
                    type="string"
                    form={form}
                    name="phone"
                    label="الهاتف"
                    placeholder="+966 920006435"
                    readOnly={type === "view"}
                  />{" "}
                  <TFormField
                    labelClassName="text-base"
                    typeField="input"
                    type="string"
                    form={form}
                    name="mobile"
                    label="الجوال"
                    placeholder="+966 920006435"
                    readOnly={type === "view"}
                  />
                  {/* Row 2: واتساب | الموقع الألكتروني | البريد الإلكتروني */}
                  <div className="grid grid-cols-3 gap-6 col-span-2">
                    <TFormField
                      labelClassName="text-base"
                      typeField="input"
                      type="string"
                      form={form}
                      name="email"
                      label="البريد الإلكتروني"
                      placeholder="rent@alghazal.sa"
                      readOnly={type === "view"}
                    />{" "}
                    <TFormField
                      labelClassName="text-base"
                      typeField="input"
                      type="string"
                      form={form}
                      name="website"
                      label="الموقع الألكتروني"
                      placeholder="http://web.com"
                      readOnly={type === "view"}
                    />
                    <TFormField
                      labelClassName="text-base"
                      typeField="input"
                      type="string"
                      form={form}
                      name="twitter"
                      label="واتساب"
                      placeholder="http://web.com"
                      readOnly={type === "view"}
                    />
                  </div>
                  {/* Row 3: تويتر | صفحة الفيسبوك */}
                  <TFormField
                    labelClassName="text-base"
                    typeField="input"
                    type="string"
                    form={form}
                    name="facebook"
                    label="صفحة الفيسبوك"
                    placeholder="http://web.com"
                    readOnly={type === "view"}
                  />{" "}
                  <TFormField
                    labelClassName="text-base"
                    typeField="input"
                    type="string"
                    form={form}
                    name="twitter"
                    label="تويتر"
                    placeholder="http://web.com"
                    readOnly={type === "view"}
                  />
                  {/* Row 4: لينكيدان | الإنستاغرام */}
                  <TFormField
                    labelClassName="text-base"
                    typeField="input"
                    type="string"
                    form={form}
                    name="instagram"
                    label="الإنستاغرام"
                    placeholder="http://web.com"
                    readOnly={type === "view"}
                  />{" "}
                  <TFormField
                    labelClassName="text-base"
                    typeField="input"
                    type="string"
                    form={form}
                    name="linkedin"
                    label="لينكيدان"
                    placeholder="http://web.com"
                    readOnly={type === "view"}
                  />
                  {/* Row 5: رابط الاندرويد | رابط ال اي او اس */}
                  <TFormField
                    labelClassName="text-base"
                    typeField="input"
                    type="string"
                    form={form}
                    name="iosLink"
                    label="رابط ال اي او اس"
                    placeholder="http://web.com"
                    readOnly={type === "view"}
                  />{" "}
                  <TFormField
                    labelClassName="text-base"
                    typeField="input"
                    type="string"
                    form={form}
                    name="androidLink"
                    label="رابط الاندرويد"
                    placeholder="http://web.com"
                    readOnly={type === "view"}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex w-full justify-end mt-6">
              <TButton
                type="reset"
                onClick={() => form.reset()}
                className="flex items-center mx-4 gap-2 w-[138px] bg-white border border-gray-300 hover:bg-gray-100 text-black"
              >
                إلغاء
              </TButton>
              <TButton
                type="submit"
                className="flex items-center gap-2 w-[138px]"
              >
                <Save size={16} />
                <p>{t("CarBranch.form.save")}</p>
              </TButton>
            </div>
          </form>
        </Form>
      ) : (
        <FormSkeleton></FormSkeleton>
      )}
    </div>
  );
};

export default Page;
