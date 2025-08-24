import { useTranslation } from "react-i18next";
import { Form } from "@/components/ui/form";
import TFormField from "@/main/common/components/TForm/TFormField";

import TButton from "@/main/common/components/TForm/TButton";
import { Save } from "lucide-react";
import TReactSelect from "@/main/common/components/TForm/reactSelect/TReactSelect";
import { UseAddOrEditDataOfLead } from "./hooks/UseAddOrEditDataOfPage";
import {
  useGetAllGroups,
  useGetAllSources,
  useGetAllStatuses,
} from "@/main/global/api/restful/userManagmentAPI/CRMSettingsManager/CRMSettingsQuery";
import { Status } from "@/main/global/api/restful/userManagmentAPI/CRMSettingsManager/CRMSettingsTypes";
import { useGetAllCity } from "@/main/global/api/restful/userManagmentAPI/CityManager/CityQuery";
import { useNavigate } from "react-router-dom";

// import TSwitchField from "@/main/common/components/TForm/TSwitchField";
function ClientFormSkeleton() {
  return (
    <div className="p-4 w-full bg-white rounded-xl shadow animate-pulse space-y-4">
      {/* Web & Mobile responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
            <div className="h-10 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>

      {/* Notes field (full width) */}
      <div className="space-y-2">
        <div className="h-4 w-24 bg-gray-300 rounded"></div>
        <div className="h-20 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
const Page = () => {
  const { t } = useTranslation("CarBranch");
  const { form, onSubmit, isLoading } = UseAddOrEditDataOfLead();
  const navigate = useNavigate();

  const { data: source } = useGetAllSources({});
  const { data: status } = useGetAllStatuses({});
  const { data: group } = useGetAllGroups({});
  const { data: city } = useGetAllCity();
  const statusOptions = status?.data?.content.map((item: Status) => ({
    value: Number(item.statusId ?? 0),
    label: item.arabicName,
  }));
  const groupOptions = group?.data?.content.map((item) => ({
    value: item.groupId,
    label: item.arabicName,
  }));
  const sourceOptions = source?.data?.content.map((item) => ({
    value: item.sourceId,
    label: item.arabicName,
  }));
  const cityOptions = city?.data?.map((item) => ({
    value: item.id,
    label: item.nameAr,
  }));

  return (
    <div
      onClick={() => console.log(form.formState.errors)}
      className="box-border w-full flex items-center flex-col min-h-dvh-64px"
    >
      {!isLoading ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full mx-auto"
          >
            <div className="flex w-full mx-auto rounded-lg shadow-lg bg-white">
              <div className="w-full px-6 py-4 md:px-8 flex flex-col gap-4">
                {/* Row 1 */}
                <div className="flex flex-col md:flex-row gap-4">
                  <TReactSelect
                    name="leadType"
                    form={form}
                    label="نوع العميل"
                    // placeholder="اختر نوع العميل"
                    options={[
                      { value: "2", label: "شركة" },
                      { value: "1", label: "فرد" },
                    ]}
                  />
                  <TFormField
                    typeField="input"
                    type="string"
                    form={form}
                    name="companyName"
                    label="اسم العميل"
                    // placeholder="معاذ القرشي"
                  />
                  <TFormField
                    typeField="input"
                    type="email"
                    form={form}
                    name="email"
                    label="البريد الإلكتروني"
                    // placeholder="moazqurashi@example.com"
                  />
                </div>

                {/* Row 2 */}
                <div className="flex flex-col md:flex-row gap-4">
                  <TFormField
                    typeField="input"
                    type="string"
                    form={form}
                    name="mobile1"
                    label="الجوال 1"
                    // placeholder="01064569867"
                  />
                  <TFormField
                    typeField="input"
                    type="string"
                    form={form}
                    name="mobile2"
                    label="الجوال 2"
                    // placeholder="رقم إضافي"
                  />
                  <TFormField
                    typeField="input"
                    type="string"
                    form={form}
                    name="phone"
                    label="الهاتف"
                    // placeholder="0123456789"
                  />
                </div>

                {/* Row 3 */}
                <div className="flex flex-col md:flex-row gap-4">
                  <TFormField
                    typeField="input"
                    type="string"
                    form={form}
                    name="address"
                    label="العنوان"
                    // placeholder="الشارع، الحي"
                  />
                  <TReactSelect
                    typeField="input"
                    type="string"
                    form={form}
                    name="city"
                    label="المدينة"
                    // placeholder="مكة"
                    options={cityOptions}
                  />
                </div>

                {/* Row 4 */}
                <div className="flex flex-col md:flex-row gap-4">
                  <TReactSelect
                    name="sourceId"
                    form={form}
                    label="المصدر"
                    // placeholder="اختر المصدر"
                    options={sourceOptions} // استخدم البيانات من الـ CRM Source
                  />
                  <TReactSelect
                    name="groupId"
                    form={form}
                    label="المجموعة"
                    // placeholder="اختر المجموعة"
                    options={groupOptions} // استخدم البيانات من الـ CRM Group
                  />
                </div>

                {/* Row 5 */}
                <div className="flex flex-col md:flex-row gap-4">
                  <TFormField
                    typeField="input"
                    type="string"
                    form={form}
                    name="vatNumber"
                    label="الرقم الضريبي"
                    // placeholder="65987413665"
                  />
                  <TFormField
                    typeField="input"
                    type="string"
                    form={form}
                    name="regNumber"
                    label="السجل التجاري"
                    // placeholder="56888894563221"
                  />
                </div>

                {/* Row 6 */}
                <div className="flex flex-col md:flex-row gap-4">
                  <TFormField
                    typeField="input"
                    type="string"
                    form={form}
                    name="website"
                    label="الموقع الإلكتروني"
                    // placeholder="https://example.com"
                  />
                  <TReactSelect
                    name="statusId"
                    form={form}
                    label="الحالة"
                    // placeholder="اختر الحالة"
                    options={statusOptions} // استخدم البيانات من الـ CRM Status
                  />
                </div>

                {/* Row 7 */}
                <TFormField
                  typeField="textarea"
                  form={form}
                  name="notes"
                  label="ملاحظات"
                  // placeholder="مثال: العميل سوا حادث و طلب رقم السطحة و تم الإرسال"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex w-full justify-end mt-6">
              <TButton
                type="reset"
                onClick={() => {
                  form.reset();
                  navigate(`/customer-service/potential-clients`);
                }}
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
        <ClientFormSkeleton></ClientFormSkeleton>
      )}
    </div>
  );
};

export default Page;
