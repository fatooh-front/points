import { DatePicker } from "@/components/ui/date_picker";
import TReactSelect from "@/main/common/components/TForm/reactSelect/TReactSelect";
import TFormField from "@/main/common/components/TForm/TFormField";
import MiniCalendarSVG from "@/main/global/assets/svg/MiniCalendarSVG";
export default function Fullday({
  getAllowedOptions,
  onChangeStatus,
  form,
}: {
  getAllowedOptions: () => any;
  onChangeStatus: (value: string) => any;
  form: any;
}) {
  return (
    <div className="w-full py-4  flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        <DatePicker
          form={form}
          Icon={<MiniCalendarSVG color="#C9972B"></MiniCalendarSVG>}
          className="h-[40px] mt-2"
          name="reservationDate"
          label="تاريخ الإستقبال"
          // placeholder="ادخل التاريخ"
        />
        <TFormField
          readOnly={true}
          Icon={<MiniCalendarSVG color="#C9972B"></MiniCalendarSVG>}
          type="string"
          dr
          className="h-[40px]  flex-1 w-full justify-start flex-row-reverse"
          form={form}
          name="reservationTime"
          label="وقت الإستقبال"
          // placeholder="ادخل الوقت"
        />
        <TFormField
          readOnly={true}
          typeField="input"
          type="number"
          form={form}
          name="days"
          label="عدد الأيام"
          // placeholder=""
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <TReactSelect
          readOnly={true}
          name="fromPlace"
          form={form}
          label="مكان الإستقابل"
          options={[
            { value: 1, label: "مطار جدة" },
            { value: 2, label: " جدة" },
            { value: 3, label: "مكة" },
          ]}
        />

        <TFormField
          readOnly={true}
          typeField="input"
          type="string"
          form={form}
          name="address"
          label="عنوان الاستقبال"
          // placeholder="هنا يكتب العنوان"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className=" w-full flex items-end gap-4">
          {
            <TReactSelect
              // readOnly
              filterOption={(option: any) =>
                option.value !== form.getValues("reservationStatus")
              }
              afterChange={(selectedOption) => {
                onChangeStatus(selectedOption.selectedOption?.value);
              }}
              name="reservationStatus"
              form={form}
              label="حالة الحجز"
              className="h-[40px]"
              isClearable={false}
              options={getAllowedOptions()}
            />
          }
        </div>
        {
          //"latitude": 22.5,
          // "longitude": 23.52,
        }
        <TFormField
          readOnly={true}
          typeField="input"
          type="string"
          form={form}
          name="googleMapUrlFrom"
          label="موقع الأستقبال"
          // placeholder="هنا يكتب العنوان"
        />
      </div>
    </div>
  );
}

// عنوان الاستقبال
// نوع الحجز
// مكان الإستقابل
// تاريخ الإستقبال
// وقت الإستقبال
// عدد الأيام
// الموقع
// حالة الحجز
