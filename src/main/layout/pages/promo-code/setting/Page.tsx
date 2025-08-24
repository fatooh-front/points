import { useTranslation } from "react-i18next";
import { Form } from "@/components/ui/form";
import TFormField from "@/main/common/components/TForm/TFormField";
import TButton from "@/main/common/components/TForm/TButton";
import { Save } from "lucide-react";
import { useSettingsForm } from "./UseAddOrEditDataOfPage";
import {
  useAddSettings,
  useGetAllSettings,
} from "@/main/global/api/restful/userManagmentAPI/BookingSettingsManager/bookingSettingsQuery";

const Page = () => {
  const { t } = useTranslation("CarBranch");
  const { data: defaultData } = useGetAllSettings({});
  const { mutate: mutateAdd } = useAddSettings();
  const { form, onSubmit } = useSettingsForm({
    data: defaultData?.data || [],
    onSave: (data) =>
      mutateAdd(data, {
        onSuccess: () => {},
      }),
  });
  return (
    <div className="box-border w-full flex items-center flex-col min-h-dvh-64px">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mx-auto">
          <div className="flex w-full p-4 mx-auto rounded-lg shadow-lg bg-white">
            <div className="flex flex-1 flex-col md:flex-row gap-4">
              {/* Left Column */}
              <div className="flex-1 flex flex-col gap-4">
                <TFormField
                  typeField="input"
                  type="number"
                  form={form}
                  name="REFERRAL_POINTS_FOR_CONSUMER"
                  label="عدد نقاط الهدايا للمستخدم الجديد"
                  // placeholder="1000"
                  suffix="نقطة"
                />
                {/* <TFormField
                  typeField="input"
                  type="number"
                  form={form}
                  name="newUserDiscountPercent"
                  label="نسبة الخصم للمستخدم الجديد"
                  // placeholder="50"
                  suffix="%"
                />
                <TFormField
                  typeField="input"
                  type="number"
                  form={form}
                  name="maxDiscount"
                  label="الحد الأقصي للخصم"
                  // placeholder="800"
                  suffix="ر.س"
                /> */}
              </div>
              {/* Right Column */}
              <div className="flex-1 flex flex-col gap-4">
                <TFormField
                  typeField="input"
                  type="number"
                  form={form}
                  name="REFERRAL_POINTS_FOR_OWNER"
                  label="عدد نقاط الهدايا لصاحب الكود"
                  // placeholder="300"
                  suffix="نقطة"
                />
                {/* <TFormField
                  typeField="input"
                  type="number"
                  form={form}
                  name="codeOwnerDiscountPercent"
                  label="نسبة الخصم لصاحب الكود"
                  // placeholder="30"
                  suffix="%"
                />
                <TFormField
                  typeField="input"
                  type="number"
                  form={form}
                  name="minDiscount"
                  label="الحد الأدني للخصم"
                  // placeholder="200"
                  suffix="ر.س"
                /> */}
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
    </div>
  );
};

export default Page;
