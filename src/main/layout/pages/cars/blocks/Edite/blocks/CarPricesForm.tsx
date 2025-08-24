import TFormField from "@/main/common/components/TForm/TFormField";
import type { FormType } from "../hooks/UseAddOrEditDataOfCarsForm";

interface CarPricesFormProps {
  form: FormType;
}
export default function CarPricesForm({ form }: CarPricesFormProps) {
  return (
    <div className="flex flex-1  w-full mx-auto overflow-hidden rounded-lg shadow-lg bg-white">
      <div className="relative w-full p-6 md:px-8">
        <div className="flex flex-col gap-2 md:gap-3 ">
          {/* ...الحقول السابقة... */}

          {/* سعر التأمين الشامل */}
          <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-3 w-full">
            <TFormField
              typeField="input"
              form={form}
              type="number"
              name="insurancePrice"
              label="سعر التأمين الشامل"
              labelInput="سعر التأمين الشامل"
            />
            <TFormField
              typeField="input"
              form={form}
              type="number"
              name="extraHoursPrice"
              label="سعر الساعه الاضافية"
              labelInput="سعر الساعه الاضافية"
            />
          </div>

          {/* السعر اليومي */}
          <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-3 w-full">
            <TFormField
              typeField="input"
              form={form}
              type="number"
              name="dailyPrice"
              label="السعر اليومي"
              labelInput="السعر اليومي"
            />
            <TFormField
              typeField="input"
              form={form}
              type="number"
              name="offerDailyPrice"
              label="السعر أثناء العرض (يومي)"
              labelInput="السعر أثناء العرض (يومي)"
            />
          </div>

          {/* السعر الأسبوعي */}
          <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-3 w-full">
            <TFormField
              typeField="input"
              form={form}
              type="number"
              name="weeklyPrice"
              label="السعر الأسبوعي"
              labelInput="السعر الأسبوعي"
            />
            <TFormField
              typeField="input"
              form={form}
              type="number"
              name="offerWeeklyPrice"
              label="السعر أثناء العرض (أسبوعي)"
              labelInput="السعر أثناء العرض (أسبوعي)"
            />
          </div>

          {/* السعر الشهري */}
          <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-3 w-full">
            <TFormField
              typeField="input"
              form={form}
              type="number"
              name="monthlyPrice"
              label="السعر الشهري"
              labelInput="السعر الشهري"
            />
            <TFormField
              typeField="input"
              form={form}
              type="number"
              name="offerMonthlyPrice"
              label="السعر أثناء العرض (شهري)"
              labelInput="السعر أثناء العرض (شهري)"
            />
          </div>

          {/* السعر السنوي */}
          <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-3 w-full">
            <TFormField
              typeField="input"
              form={form}
              type="number"
              name="yearlyPrice"
              label="السعر السنوي"
              labelInput="السعر السنوي"
            />
            <TFormField
              typeField="input"
              form={form}
              type="number"
              name="offerYearlyPrice"
              label="السعر أثناء العرض (سنوي)"
              labelInput="السعر أثناء العرض (سنوي)"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-3 w-full">
            {/* سعر الكيلو الإضافي */}
            <TFormField
              typeField="input"
              form={form}
              type="number"
              name="kmPrice"
              label="سعر الكيلو الإضافي"
              labelInput="سعر الكيلو الإضافي"
            />

            {/* عدد الكيلوميترات المسموح بها */}
            <TFormField
              typeField="input"
              form={form}
              type="number"
              name="maxKm"
              label="عدد الكيلوميترات المسموح بها"
              labelInput="عدد الكيلوميترات المسموح بها"
            />
          </div>

          {/* ...باقي الحقول... */}
        </div>{" "}
        <div
          onClick={() => form.setValue("showHome", !form.getValues("showHome"))}
          className="flex flex-1 border px-4 h-[48px] rounded-[8px] items-center gap-2 mt-4 cursor-pointer"
        >
          <input
            type="checkbox"
            id="offer"
            className="form-checkbox accent-[#CE931A] checked:!bg-[#CE931A] checked:!border-[#CE931A] checked:!text-white"
            checked={form.watch("offer")}
            onChange={() => form.setValue("offer", !form.getValues("offer"))}
          />
          <label htmlFor="offer" className="font-medium">
            قابل لإضافة عروض
          </label>
        </div>{" "}
      </div>
    </div>
  );
}
