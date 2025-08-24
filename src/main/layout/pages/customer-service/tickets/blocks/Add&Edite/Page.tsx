import { useTranslation } from "react-i18next";
import { Form } from "@/components/ui/form";
import TFormField from "@/main/common/components/TForm/TFormField";
import TButton from "@/main/common/components/TForm/TButton";
import { Save } from "lucide-react";
import TReactSelect from "@/main/common/components/TForm/reactSelect/TReactSelect";
import { UseAddOrEditDataOfPage } from "./hooks/UseAddOrEditDataOfPage";
import Maseges from "./blocks/maseges";

const Page = ({ type = "add" }: { type?: string }) => {
  const { t } = useTranslation("CarBranch");
  const { form, onSubmit } = UseAddOrEditDataOfPage({});

  return (
    <div className="box-border w-full flex items-center flex-col min-h-dvh-64px">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mx-auto">
          <div className="flex w-full mx-auto rounded-lg shadow-lg bg-white">
            <div className="w-full px-6 py-4 md:px-8 flex flex-col gap-4">
              {/* Row 1 */}
              <div className="flex flex-col md:flex-row gap-4">
                <TReactSelect
                  name="clientType"
                  form={form}
                  label="نوع العميل"
                  placeholder="عميل محتمل"
                  options={[
                    { value: "LEAD", label: "عميل محتمل" },
                    { value: "EXISTING", label: "عميل قائم" },
                  ]}
                />
                <TFormField
                  typeField="input"
                  type="string"
                  form={form}
                  name="clientName"
                  label="اسم العميل"
                  placeholder="محمد سالم"
                />
                <TFormField
                  typeField="input"
                  type="string"
                  form={form}
                  name="phoneNumber"
                  label="الجوال"
                  placeholder="0122654862"
                />
              </div>

              {/* Row 2 */}
              <div className="flex flex-col md:flex-row gap-4">
                <TFormField
                  typeField="input"
                  type="string"
                  form={form}
                  name="title"
                  label="عنوان التذكرة"
                  placeholder="حادث"
                />
                <TFormField
                  typeField="input"
                  type="string"
                  form={form}
                  name="sourcesName"
                  label="المصدر"
                  placeholder="الموقع الإلكتروني"
                />
              </div>

              {/* Row 3 */}
              <div className="flex flex-col md:flex-row gap-4">
                <TFormField
                  typeField="input"
                  type="string"
                  form={form}
                  name="depName"
                  label="القسم"
                  placeholder="المبيعات"
                />
                <TFormField
                  typeField="input"
                  type="string"
                  form={form}
                  name="typeName"
                  label="نوع الدعم الفني"
                  placeholder="دعم فني سيارات"
                />
              </div>

              {/* Row 4 */}
              <TFormField
                typeField="textarea"
                form={form}
                name="details"
                label="التفاصيل"
                placeholder="اكتب تفاصيل التذكرة هنا..."
              />
            </div>
          </div>

          {type === "edit" && (
            <div className="flex w-full mx-auto rounded-lg shadow-lg mt-4 bg-white">
              <Maseges />
            </div>
          )}

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
    </div>
  );
};

export default Page;
