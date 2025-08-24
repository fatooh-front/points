"use client";

import TFormField from "@/main/common/components/TForm/TFormField";
import { UseAddOrEditReservationDetails } from "./hooks/UseAddOrEditDataOfPage";
import { Form } from "@/components/ui/form";
import TButton from "@/main/common/components/TForm/TButton";
import CompanyRequestsManager from "@/main/global/api/restful/userManagmentAPI/CompanyRequestManager/CompanyRequestManager";
import TReactSelect from "@/main/common/components/TForm/reactSelect/TReactSelect";

export default function CompanyRequestDetailsPage() {
  const {
    form,
    onReset,
    refetch,
    isLoading: isLoading,
  } = UseAddOrEditReservationDetails();
  if (isLoading) return <div>جار التحميل...</div>;

  return (
    <Form {...form}>
      <form className="p-6 space-y-4 bg-white rounded-xl shadow-sm">
        <h1 className="text-xl font-bold">تفاصيل طلب الشركة</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TFormField
            readOnly
            typeField="input"
            type="string"
            form={form}
            name="companyName"
            label="اسم الشركة"
          />
          <TFormField
            readOnly
            typeField="input"
            type="string"
            form={form}
            name="activity"
            label="النشاط"
          />
          <TFormField
            readOnly
            typeField="input"
            type="string"
            form={form}
            name="city"
            label="المدينة"
          />
          <TFormField
            readOnly
            typeField="input"
            type="string"
            form={form}
            name="responsibleName"
            label="اسم المسؤول"
          />
          <TFormField
            readOnly
            typeField="input"
            type="string"
            form={form}
            name="mobile"
            label="رقم الجوال"
          />
          <TFormField
            readOnly
            typeField="input"
            type="string"
            form={form}
            name="email"
            label="البريد الإلكتروني"
          />
          <TFormField
            readOnly
            typeField="input"
            type="string"
            form={form}
            name="carsNumber"
            label="عدد السيارات"
          />
          <TFormField
            readOnly
            typeField="input"
            type="string"
            form={form}
            name="months"
            label="عدد الأشهر"
          />
          <TFormField
            readOnly
            typeField="input"
            type="string"
            form={form}
            name="addedDate"
            label="تاريخ الإضافة"
          />

          <TReactSelect
            readOnly
            form={form}
            name="requestStatus"
            label="حالة الطلب"
            className={` ${
              form.watch("requestStatus") === 2
                ? "border-[#7AAA81]"
                : form.watch("requestStatus") === 3
                ? "border-[#E52B2E]"
                : "border-gray-300"
            } `}
            options={[
              { value: 1, label: "قيد الانتظار" },
              { value: 2, label: "مؤكد" },
              { value: 3, label: "مرفوض" },
            ]}
          />
          <TFormField
            readOnly
            typeField="input"
            type="string"
            form={form}
            name="brandsCount"
            label="عدد الماركات"
          />
        </div>

        <div className="space-y-2">
          <h2 className="font-semibold text-lg text-gray-800">الماركات</h2>
          <div className="flex flex-wrap gap-2">
            {form.watch("brands")?.map((brand) => (
              <span
                key={brand.brandId}
                className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full shadow-sm hover:bg-primary-200 transition-colors"
              >
                {brand.arabicName || brand.brandName}
              </span>
            ))}
          </div>
        </div>
      </form>
      {form.watch("requestStatus") === 1 && (
        <div className="flex w-full justify-end mt-6">
          {" "}
          <TButton
            type="reset"
            onClick={() =>
              CompanyRequestsManager.addCompanyRequestsReject(
                form.getValues("requestId")?.toString() ?? ""
              ).then(() => {
                refetch();
                onReset();
              })
            }
            className="flex  text-[#E52B2E] items-center mx-4 gap-2 w-[138px] bg-white border border-[#E52B2E] hover:bg-gray-100 "
          >
            رفض الطلب
          </TButton>
          <TButton
            onClick={() =>
              CompanyRequestsManager.addCompanyRequestsApprove(
                form.getValues("requestId")?.toString() ?? ""
              ).then(() => {
                refetch();
                onReset();
              })
            }
            type="reset"
            className="flex items-center bg-[#7AAA81]  hover:bg-[#7AAA81] hover:opacity-75  gap-2 w-[138px] "
            // disabled={isPending}
          >
            <p> قبول الطلب</p>
          </TButton>
          {/* <TButton
                  type="submit"
                  className="flex items-center  gap-2 w-[138px] "
                  // disabled={isPending}
                >
                  <Save size={16} />
                  <p> {t("carsYear.form.save")}</p>
                </TButton> */}
        </div>
      )}
    </Form>
  );
}
