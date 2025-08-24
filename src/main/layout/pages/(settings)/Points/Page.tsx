import { Form } from "@/components/ui/form";
import TFormField from "@/main/common/components/TForm/TFormField";

import TButton from "@/main/common/components/TForm/TButton";
import { Save } from "lucide-react";
import { useSettingsForm } from "./hooks/UseAddOrEditDataOfPage";
import {
  useAddSettings,
  useGetAllSettings,
} from "@/main/global/api/restful/userManagmentAPI/BookingSettingsManager/bookingSettingsQuery";
import CustomChechBox from "@/components/ui/custom_chech_box";

// import TSwitchField from "@/main/common/components/TForm/TSwitchField";

const Page = () => {
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
    <div className="box-border w-full flex justify-center  ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full mx-auto gap-6 flex flex-col"
        >
          <div className="rounded-lg shadow-lg bg-white  p-6 mb-4 flex-1">
            <div className="font-bold text-lg mb-6 text-[#162A2B]">
              إعدادات النقاط
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <TFormField
                labelClassName="text-base"
                form={form}
                label="النقاط الترحيبية"
                type="number"
                inputProps={{ min: 0 }}
                InputIcon="نقطة"
                name="WELCOME_POINTS"
              />
              <TFormField
                labelClassName="text-base"
                form={form}
                label="النقاط المكتسبة مقابل كل ريال"
                type="number"
                inputProps={{ min: 0 }}
                InputIcon="نقطة"
                name="POINTS_EARNED_PER_SAR"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <TFormField
                labelClassName="text-base"
                form={form}
                label="النقاط المنفقة مقابل كل ريال"
                type="number"
                inputProps={{ min: 0 }}
                InputIcon="نقطة"
                name="POINTS_SPENT_PER_SAR"
              />
              <TFormField
                labelClassName="text-base"
                form={form}
                label="الحد الأقصي للإستفادة من النقاط للمرة الواحدة"
                type="number"
                inputProps={{ min: 0 }}
                InputIcon="نقطة"
                name="MAX_POINTS_PER_USE"
              />
            </div>{" "}
            <TFormField
              labelClassName="text-base"
              form={form}
              label="مدة الإحتفاظ بالنقاط دون إستخدام"
              type="number"
              inputProps={{ min: 0 }}
              InputIcon="يوم"
              name="POINTS_EXPIRATION_DAYS"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className=" mt-8">
                <CustomChechBox
                  form={form}
                  value={{
                    checked:
                      form.watch("REFUND_POINTS_VALUE_AS_A_PROMO") === "true",
                  }}
                  label="انشاء كود خصم في حالة الغاء الحجز"
                  name="REFUND_POINTS_VALUE_AS_A_PROMO"
                  onChange={() => {
                    form.setValue("EXPIRATION_DAYS_FOR_REFUND_PROMO", null);
                    form.setValue(
                      "REFUND_POINTS_VALUE_AS_A_PROMO",
                      form.getValues("REFUND_POINTS_VALUE_AS_A_PROMO") ===
                        "true"
                        ? "false"
                        : "true"
                    );
                  }}
                ></CustomChechBox>
              </div>
              <div>
                {form.watch("REFUND_POINTS_VALUE_AS_A_PROMO") === "true" ? (
                  <TFormField
                    key={form.watch("REFUND_POINTS_VALUE_AS_A_PROMO")}
                    labelClassName="text-base"
                    form={form}
                    label="مدة صلاحية كود الخصم"
                    type="number"
                    className="h-[48px] "
                    inputProps={{ min: 0 }}
                    InputIcon="ايام"
                    name="EXPIRATION_DAYS_FOR_REFUND_PROMO"
                  />
                ) : null}
                {form.watch("REFUND_POINTS_VALUE_AS_A_PROMO") === "true" &&
                !form.watch("EXPIRATION_DAYS_FOR_REFUND_PROMO") ? (
                  <div className=" text-red-500">
                    مدة صلاحية كود الخصم مطلوب
                  </div>
                ) : null}
              </div>
            </div>{" "}
          </div>{" "}
          <div className="flex w-full justify-end mt-6">
            {" "}
            {/* <TButtons
              type="reset"
              onClick={() => form.reset()}
              className="flex items-center mx-4 gap-2 w-[138px] bg-white border border-gray-300 hover:bg-gray-100 text-black"
            >
              إلغاء
            </TButtons> */}
            {form.watch("REFUND_POINTS_VALUE_AS_A_PROMO") === "true" &&
            !form.watch("EXPIRATION_DAYS_FOR_REFUND_PROMO") ? null : (
              <TButton
                type="button"
                className="flex items-center gap-2 w-[138px]"
                onClick={form.handleSubmit(onSubmit)}
              >
                <Save size={16} />
                <p>حفظ</p>
              </TButton>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
