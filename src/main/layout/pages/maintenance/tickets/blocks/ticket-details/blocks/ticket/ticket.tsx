import TFormField from "@/main/common/components/TForm/TFormField";
import TReactSelect from "@/main/common/components/TForm/reactSelect/TReactSelect";
import { UseAddOrEditDataOfPage } from "./hooks/UseAddOrEditDataOfPage";
import TFormNumberField from "@/main/common/components/TForm/TFormNumberField";
import { Form } from "@/components/ui/form";

export default function Ticket() {
  const { form, onSubmit } = UseAddOrEditDataOfPage({});

  return (
    <div className="flex w-full mx-auto rounded-lg shadow-lg bg-white">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mx-auto">
          <div className="w-full px-6 py-4 md:px-8 flex flex-col gap-4">
            {/* Row 1: التذكرة - السيارة - رقم التذكرة */}
            <div className="flex flex-col md:flex-row gap-4">
              <TFormField
                typeField="input"
                type="string"
                form={form}
                name="ticketNumber"
                label="رقم التذكرة"
                placeholder="ادخل رقم التذكرة"
              />{" "}
              <TReactSelect
                name="car"
                form={form}
                label="السيارة"
                placeholder="اختر السيارة"
                options={[
                  { value: "Toyota Yaris 2020", label: "Toyota Yaris 2020" },
                  { value: "car2", label: "سيارة 2" },
                ]}
              />
            </div>

            {/* Row 2: عنوان التذكرة */}
            <div className="flex flex-col md:flex-row gap-4">
              {" "}
              <TFormField
                typeField="input"
                type="string"
                form={form}
                name="carNumber"
                label="رقم السيارة"
                placeholder="ادخل رقم السيارة"
              />
              <TFormField
                typeField="input"
                type="string"
                form={form}
                name="ticketTitle"
                label="عنوان التذكرة"
                placeholder="ادخل عنوان التذكرة"
                className="flex-1"
              />
            </div>

            {/* Row 3: تفاصيل التذكرة */}
            <div className="flex flex-col md:flex-row gap-4">
              <TFormField
                typeField="textarea"
                form={form}
                name="details"
                label="تفاصيل التذكرة"
                placeholder=""
                className="flex-1 h-[80px]"
              />
            </div>

            {/* Row 4: صورة السيارة */}
            <div className="flex flex-col md:flex-row gap-4">
              <TFormField
                typeField="file"
                form={form}
                name="carImage"
                label="صورة السيارة"
                placeholder=""
                accept="image/*"
              />
            </div>

            {/* Row 5: التواريخ */}
            <div className="flex   flex-col md:flex-row gap-4">
              <TFormField
                typeField="input"
                type="datetime-local"
                form={form}
                className="justify-end"
                name="ticketAddedDate"
                label="تاريخ إضافة التذكرة"
              />
              <TFormField
                typeField="input"
                type="datetime-local"
                form={form}
                className="justify-end"
                name="maintenanceStartDate"
                label="تاريخ بداية الصيانة"
              />
              <TFormField
                typeField="input"
                type="datetime-local"
                form={form}
                className="justify-end"
                name="maintenanceEndDate"
                label="تاريخ نهاية الصيانة"
              />
            </div>

            {/* Row 6: نوع الصيانة - قراءة العداد */}
            <div className="flex flex-col md:flex-row gap-4">
              <TReactSelect
                name="maintenanceType"
                form={form}
                label="نوع الصيانة"
                placeholder="اختر نوع الصيانة"
                options={[
                  { value: "periodic", label: "دورية" },
                  { value: "agency", label: "وكالة" },
                  { value: "accident", label: "حادث" },
                ]}
              />
              <TFormNumberField
                form={form}
                name={
                  form.watch("maintenanceType") !== "accident"
                    ? "odometer"
                    : "accidentNumber"
                }
                label={
                  form.watch("maintenanceType") !== "accident"
                    ? "قراءة العداد"
                    : "رقم الحادث"
                }
                placeholder="0"
              />
              <TFormField
                typeField="input"
                type="string"
                form={form}
                name="accidentType"
                label="نوع الحادث"
                placeholder=""
              />
            </div>

            {/* Row 7: نوع الحادث - نوع التقرير */}
            <div className="flex flex-col md:flex-row gap-4">
              <TFormField
                typeField="input"
                type="string"
                form={form}
                name="reportType"
                label="نوع التقرير"
                placeholder=""
              />
              <TFormField
                typeField="input"
                type="string"
                form={form}
                name="reportType"
                label="إجمالي تقديرات قطع الغيار الرسمية"
                placeholder=""
              />
              <TFormField
                typeField="input"
                type="string"
                form={form}
                name="reportType"
                label="إجمالي تقديرات النقليات الرسمية"
                placeholder=""
              />
            </div>

            {/* Row 8: الفواتير وتكاليف الصيانة */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TFormNumberField
                form={form}
                name="otherCosts"
                label="إجمالي تقديرات المصنعية الرسمية"
                placeholder="0.0"
              />
              <TFormNumberField
                form={form}
                name="maintenanceCenterCosts"
                label="إجمالي تقديرات التكاليف الأخرى الرسمية"
                placeholder="0.0"
              />
              <TFormNumberField
                form={form}
                name="إجمالي التقديرات الرسمية"
                label="النقليات"
                placeholder="0.0"
              />
            </div>

            {/* Row 9: إجمالي التقديرات الرسمية */}
            <div className="flex flex-col md:flex-row gap-4">
              <TFormNumberField
                form={form}
                name="insuranceCompanyEstimation"
                label="إجمالي شركة التامين"
                placeholder="0.0"
              />{" "}
              <TFormNumberField
                form={form}
                name="totalOfficialEstimation"
                label="رقم الحادث"
                placeholder="0.0"
              />
            </div>

            {/* Row 10: موظف الصيانة - مركز الصيانة */}
            <div className="flex flex-col md:flex-row gap-4">
              <TReactSelect
                name="maintenanceCenter"
                form={form}
                label="مركز الصيانة"
                placeholder="اختر مركز الصيانة"
                options={[
                  { value: "center1", label: "مركز 1" },
                  { value: "center2", label: "مركز 2" },
                ]}
              />
              <TReactSelect
                name="maintenanceEmployee"
                form={form}
                label="موظف الصيانة"
                placeholder="اختر الموظف"
                options={[
                  { value: "emp1", label: "موظف 1" },
                  { value: "emp2", label: "موظف 2" },
                ]}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Row 11: ملاحظات */}
              <TFormField
                typeField="textarea"
                className="h-[80px]"
                form={form}
                name="notes"
                label="ملاحظات"
                placeholder=""
              />

              {/* Row 12: تفاصيل الحادث */}
              <TFormField
                typeField="textarea"
                className="h-[80px]"
                form={form}
                name="accidentDetails"
                label="تفاصيل الحادث"
                placeholder=""
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
