import { Form } from "@/components/ui/form";
import TButton from "@/main/common/components/TForm/TButton";
import { Save } from "lucide-react";
import { UseAddOrEditDataOfPage } from "./hooks/UseAddOrEditDataOfPage";
import TReactSelect from "@/main/common/components/TForm/reactSelect/TReactSelect";
import TFormField from "@/main/common/components/TForm/TFormField";

const whatsAppOptions = [{ value: "whatsapp", label: "Whats App" }];
const complaintOptions = [
  { value: "whatsapp_complaint", label: "Whats App Complaint" },
];
const extendOptions = [{ value: "whatsapp_extend", label: "Whats App Extend" }];
const supportOptions = [
  { value: "whatsapp_support", label: "Whats App Support" },
];
const accidentOptions = [
  { value: "whatsapp_accident", label: "Whats App Accedient" },
];
const groupOptions = [{ value: "new_client", label: "New Client" }];

const Page = () => {
  const { form, onSubmit } = UseAddOrEditDataOfPage({});

  return (
    <div className="box-border w-full flex items-center flex-col min-h-dvh-64px">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mx-auto">
          <div className="flex w-full mx-auto rounded-lg shadow-lg p-6 bg-white">
            <div className="flex flex-col md:flex-row w-full gap-10 mb-4">
              <div className="flex-1 grid grid-cols-3 gap-6">
                {/* Row 1 */}
                <TReactSelect
                  label="مستخدم الواتس اب الرئيسي لارسال الطلبات من خلاله"
                  name="mainWhatsAppUser"
                  form={form}
                  options={whatsAppOptions}
                  placeholder="مستخدم الواتس اب الرئيسي"
                />
                <TReactSelect
                  label="المستخدم الخاص بالشكاوي"
                  name="complaintUser"
                  form={form}
                  options={whatsAppOptions}
                  placeholder="المستخدم الخاص بالشكاوي"
                />
                <TReactSelect
                  label="قسم الشكاوي"
                  name="complaintSection"
                  form={form}
                  options={complaintOptions}
                  placeholder="قسم الشكاوي"
                />
                {/* Row 2 */}
                <TReactSelect
                  label="المستخدم الخاص بالتمديد"
                  name="extendUser"
                  form={form}
                  options={whatsAppOptions}
                  placeholder="المستخدم الخاص بالتمديد"
                />
                <TReactSelect
                  label="قسم تمديد الحجز"
                  name="extendSection"
                  form={form}
                  options={extendOptions}
                  placeholder="قسم تمديد الحجز"
                />
                <TReactSelect
                  label="المستخدم الخاص بالحوادث"
                  name="accidentUser"
                  form={form}
                  options={whatsAppOptions}
                  placeholder="المستخدم الخاص بالحوادث"
                />
                {/* Row 3 */}
                <TReactSelect
                  label="قسم الحوادث"
                  name="accidentSection"
                  form={form}
                  options={accidentOptions}
                  placeholder="قسم الحوادث"
                />
                <TReactSelect
                  label="نوع الدعم"
                  name="supportType"
                  form={form}
                  options={supportOptions}
                  placeholder="نوع الدعم"
                />
                <TReactSelect
                  label="المجموعة"
                  name="group"
                  form={form}
                  options={groupOptions}
                  placeholder="المجموعة"
                />
                {/* Row 4 */}
                <TReactSelect
                  label="المصدر"
                  name="source"
                  form={form}
                  options={whatsAppOptions}
                  placeholder="المصدر"
                />
                <TFormField
                  label="زمن إغلاق المحادثة في حالة الحوادث بالدقيقة"
                  name="accidentCloseTime"
                  form={form}
                  placeholder="زمن إغلاق المحادثة في حالة الحوادث بالدقيقة"
                  type="number"
                />
                <TFormField
                  label="زمن إغلاق المحادثة بالدقيقة"
                  name="closeTime"
                  form={form}
                  placeholder="زمن إغلاق المحادثة بالدقيقة"
                  type="number"
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
              <p>حفظ</p>
            </TButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
