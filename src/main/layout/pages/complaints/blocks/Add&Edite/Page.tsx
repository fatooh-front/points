import { useTranslation } from "react-i18next";
import { Form } from "@/components/ui/form";
import TFormField from "@/main/common/components/TForm/TFormField";
import TButton from "@/main/common/components/TForm/TButton";
import { Save } from "lucide-react";
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
                <TFormField
                  typeField="input"
                  type="string"
                  form={form}
                  name="contractNumber"
                  label="رقم العقد"
                  placeholder="5658"
                />
                <TFormField
                  typeField="input"
                  type="string"
                  form={form}
                  name="customerName"
                  label="اسم العميل"
                  placeholder="محمد سالم"
                />
                <TFormField
                  typeField="input"
                  type="string"
                  form={form}
                  name="customerPhone"
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
                  name="carName"
                  label="اسم السيارة"
                  placeholder="مرسيدس c180"
                />{" "}
                <TFormField
                  typeField="input"
                  type="string"
                  form={form}
                  name="carCode"
                  label="كود السيارة"
                  placeholder="54787"
                />
              </div>

              {/* Row 3 */}
              <div className="flex flex-col md:flex-row gap-4">
                <TFormField
                  typeField="input"
                  type="string"
                  form={form}
                  name="carPlateNumber"
                  label="رقم لوحة السيارة"
                  placeholder="524564"
                />
                <TFormField
                  typeField="input"
                  type="string"
                  form={form}
                  name="branch"
                  label="الفرع"
                  placeholder="فرع النزهة - مكة"
                />
              </div>

              {/* Row 4 */}
              <div className="flex flex-col md:flex-row gap-4">
                <TFormField
                  typeField="input"
                  type="string"
                  form={form}
                  name="complainedEmployee"
                  label="اسم الموظف المشكوي منه"
                  placeholder="محمود عبد السلام"
                />{" "}
                <TFormField
                  typeField="input"
                  type="string"
                  form={form}
                  name="responsibleEmployee"
                  label="الموظف المسئول"
                  placeholder="ياسر الدوسري"
                />
              </div>

              {/* Row 5 */}
              <div className="flex flex-col md:flex-row gap-4">
                <TFormField
                  typeField="textarea"
                  form={form}
                  className=" h-[175px]"
                  name="problemDetails"
                  label="تفاصيل المشكلة"
                  placeholder="أكتب التفاصيل هنا"
                />{" "}
                <TFormField
                  typeField="textarea"
                  form={form}
                  name="employeeNotes"
                  className=" h-[175px]"
                  label="ملاحظات الموظف المسئول"
                  placeholder="اكتب ملاحظاتك هنا"
                />
              </div>
            </div>
          </div>
          {type === "edit" && (
            <div className="flex w-full mx-auto rounded-lg shadow-lg mt-4 bg-white">
              <Maseges></Maseges>
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
