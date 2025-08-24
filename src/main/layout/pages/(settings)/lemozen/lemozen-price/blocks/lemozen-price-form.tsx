import { Form } from "@/components/ui/form";
import TFormField from "@/main/common/components/TForm/TFormField";

import TButton from "@/main/common/components/TForm/TButton";
import { Save } from "lucide-react";
import { UseAddOrEditDataOfPage } from "./hooks/UseAddOrEditDataOfPage";
export default function LemozenPriceForm({ car }: any) {
  const { form, onSubmit } = UseAddOrEditDataOfPage(car);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full mx-auto">
        <div className="rounded-lg shadow-lg bg-white p-6 mb-4">
          <h2 className=" border-b pb-2 font-medium text-2xl text-center mb-2">
            {car.brandName} - {car.modelName}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TFormField
              labelClassName=" font-[400] text-[16px] mb-[10px] mt-[24px]"
              form={form}
              label="من المطار الي مكة و العكس"
              type="number"
              inputProps={{ min: 0 }}
              name="airportMakkah"
            />
            <TFormField
              labelClassName=" font-[400] text-[16px] mb-[10px] mt-[24px]"
              form={form}
              label="من المطار إلي داخل جدة و العكس"
              type="number"
              inputProps={{ min: 0 }}
              name="airportJeddah"
            />
          </div>{" "}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TFormField
              labelClassName=" font-[400] text-[16px] mb-[10px] mt-[24px]"
              form={form}
              label="من داخل مكة الي داخل جدة و العكس "
              type="number"
              inputProps={{ min: 0 }}
              name="cityToCity"
            />
            <TFormField
              labelClassName=" font-[400] text-[16px] mb-[10px] mt-[24px]"
              form={form}
              label="من داخل مكة إلي داخل مكة أو من داخل جدة الي داخل جدة و العكس"
              type="number"
              inputProps={{ min: 0 }}
              name="sameCity"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TFormField
              labelClassName=" font-[400] text-[16px] mb-[10px] mt-[24px]"
              form={form}
              label="اول 4 ساعات"
              type="number"
              inputProps={{ min: 0 }}
              name="firstFourHours"
            />
            <TFormField
              labelClassName=" font-[400] text-[16px] mb-[10px] mt-[24px]"
              form={form}
              label="سعر الساعة الزيادة"
              type="number"
              inputProps={{ min: 0 }}
              name="extraHour"
            />
          </div>{" "}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <TFormField
              labelClassName=" font-[400] text-[16px] mb-[10px] mt-[24px]"
              form={form}
              label="عدد ساعات اليوم"
              type="number"
              inputProps={{ min: 0 }}
              name="daysHours"
            />
            <TFormField
              labelClassName=" font-[400] text-[16px] mb-[10px] mt-[24px]"
              form={form}
              label="سعر اليوم "
              type="number"
              inputProps={{ min: 0 }}
              name="dayPrice"
            />
            <TFormField
              labelClassName=" font-[400] text-[16px] mb-[10px] mt-[24px]"
              form={form}
              label="سعر الساعة الزيادة لليوم"
              type="number"
              inputProps={{ min: 0 }}
              name="extraHourDayPrice"
            />
          </div>
          <div className=" w-full flex justify-end mt-6">
            {" "}
            <TButton
              type="reset"
              onClick={() => form.reset()}
              className="flex items-center mx-4 gap-2 w-[138px] bg-white border border-gray-300 hover:bg-gray-100 text-black"
            >
              إلغاء
            </TButton>
            <TButton
              type="submit"
              className="flex items-center  gap-2 w-[138px] "
              // disabled={isPending}
            >
              <Save size={16} />
              <p> حفظ</p>
            </TButton>
          </div>
        </div>{" "}
      </form>
    </Form>
  );
}
