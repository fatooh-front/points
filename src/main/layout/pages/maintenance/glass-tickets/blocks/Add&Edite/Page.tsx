import { useTranslation } from "react-i18next";
import { Form } from "@/components/ui/form";
import TFormField from "@/main/common/components/TForm/TFormField";
import TButton from "@/main/common/components/TForm/TButton";
import { Save } from "lucide-react";
import TReactSelect from "@/main/common/components/TForm/reactSelect/TReactSelect";
import { UseAddOrEditDataOfPage } from "./hooks/UseAddOrEditDataOfPage";
import TFormNumberField from "@/main/common/components/TForm/TFormNumberField";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Page = ({ type }: { type?: "edit" | "add" | "viwe" }) => {
  const { t } = useTranslation("CarBranch");
  const { form, onSubmit } = UseAddOrEditDataOfPage({});
  const [tab, setTab] = useState("form");
  console.log(tab);

  return (
    <div className="box-border w-full flex items-center flex-col min-h-dvh-64px">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mx-auto">
          <div className="flex w-full mx-auto rounded-lg shadow-lg bg-white">
            <div className="w-full px-6 py-4 md:px-8 flex flex-col gap-4">
              {/* Row 1: رقم السيارة - رقم التذكرة */}
              <div className="flex flex-col md:flex-row gap-4">
                <TFormField
                  readOnly={type === "viwe" || type === "edit"}
                  className={
                    type === "viwe" || type === "edit" ? "bg-[#EFEFEF]" : ""
                  }
                  typeField="input"
                  type="string"
                  form={form}
                  name="ticketNumber"
                  label="رقم التذكرة"
                  placeholder="مثال: 19"
                />{" "}
                <TFormField
                  readOnly={type === "viwe" || type === "edit"}
                  className={
                    type === "viwe" || type === "edit" ? "bg-[#EFEFEF]" : ""
                  }
                  typeField="input"
                  type="string"
                  form={form}
                  name="carNumber"
                  label="رقم السيارة"
                  placeholder="مثال: د ك ي 4350"
                />
              </div>

              {/* Row 2: تواريخ */}
              <div className="flex flex-col md:flex-row gap-4">
                <TFormField
                  readOnly={type === "viwe" || type === "edit"}
                  className={
                    type === "viwe" || type === "edit" ? "bg-[#EFEFEF]" : ""
                  }
                  typeField="datetime"
                  form={form}
                  name="ticketAddedDate"
                  label="تاريخ إضافة التذكرة"
                  placeholder="2025/02/27 12:29"
                />
                <TFormField
                  readOnly={type === "viwe" || type === "edit"}
                  className={
                    type === "viwe" || type === "edit" ? "bg-[#EFEFEF]" : ""
                  }
                  typeField="datetime"
                  form={form}
                  name="maintenanceStartDate"
                  label="تاريخ بداية الصيانة"
                  placeholder="2025/02/27 12:29"
                />
                <TFormField
                  readOnly={type === "viwe" || type === "edit"}
                  className={
                    type === "viwe" || type === "edit" ? "bg-[#EFEFEF]" : ""
                  }
                  typeField="datetime"
                  form={form}
                  name="maintenanceEndDate"
                  label="تاريخ نهاية الصيانة"
                  placeholder="2025/02/27 12:29"
                />
              </div>

              {/* Row 3: التحمل - نوع الصيانة - موظف */}
              <div className="flex flex-col md:flex-row gap-4">
                <TReactSelect
                  readOnly={type === "viwe"}
                  className={type === "viwe" ? "bg-[#EFEFEF]" : ""}
                  name="deductible"
                  form={form}
                  label="التحمل"
                  placeholder="اختر التحمل"
                  options={[
                    { value: "موظف", label: "موظف" },
                    { value: "شركة", label: "شركة" },
                  ]}
                />
                <TReactSelect
                  readOnly={type === "viwe"}
                  className={type === "viwe" ? "bg-[#EFEFEF]" : ""}
                  name="maintenanceType"
                  form={form}
                  label="نوع الصيانة"
                  placeholder="اختر نوع الصيانة"
                  options={[
                    { value: "زجاج", label: "إصلاح زجاج" },
                    { value: "وكالة", label: "وكالة" },
                  ]}
                />
                <TReactSelect
                  readOnly={type === "viwe"}
                  className={type === "viwe" ? "bg-[#EFEFEF]" : ""}
                  name="maintenanceEmployee"
                  form={form}
                  label="موظف"
                  placeholder="اختر الموظف"
                  options={[
                    { value: "mahmoud", label: "محمود محمد" },
                    { value: "ahmed", label: "أحمد علي" },
                  ]}
                />
              </div>

              {/* Row 4: رقم العقد - المبلغ الإجمالي */}
              <div className="flex flex-col md:flex-row gap-4">
                <TFormNumberField
                  readOnly={type === "viwe"}
                  className={type === "viwe" ? "bg-[#EFEFEF]" : ""}
                  form={form}
                  name="contractNumber"
                  label="رقم العقد"
                  placeholder="19"
                />
                <TFormNumberField
                  readOnly={type === "viwe"}
                  className={type === "viwe" ? "bg-[#EFEFEF]" : ""}
                  form={form}
                  name="totalAmount"
                  label="المبلغ الإجمالي"
                  placeholder="1000.0"
                />
              </div>

              {/* Row 5: التفاصيل - عنوان التذكرة */}
              <div className="flex flex-col md:flex-row gap-4">
                <TFormField
                  readOnly={type === "viwe"}
                  className={type === "viwe" ? "bg-[#EFEFEF] flex-1" : "flex-1"}
                  typeField="input"
                  form={form}
                  name="ticketTitle"
                  label="عنوان التذكرة"
                  placeholder="العنوان يكتب هنا"
                />
                <TFormField
                  typeField="textarea"
                  form={form}
                  name="details"
                  label="التفاصيل"
                  readOnly={type === "viwe"}
                  className={type === "viwe" ? "bg-[#EFEFEF] flex-1" : "flex-1"}
                />
              </div>

              {/* Row 6: الموظف - مركز الصيانة */}
              <div className="flex flex-col md:flex-row gap-4">
                <TFormField
                  typeField="input"
                  form={form}
                  name="employee"
                  label="الموظف"
                  readOnly={type === "viwe"}
                  className={type === "viwe" ? "bg-[#EFEFEF]" : ""}
                  placeholder="محمود محمد"
                />
                <TFormField
                  typeField="input"
                  form={form}
                  readOnly={type === "viwe"}
                  className={type === "viwe" ? "bg-[#EFEFEF]" : ""}
                  name="maintenanceCenter"
                  label="مركز الصيانة"
                  placeholder="مركز 2"
                />
              </div>

              {/* Row 7: صورة الفاتورة - ملاحظات */}
              <div className="flex flex-col md:flex-row gap-4">
                <TFormField
                  typeField="input"
                  form={form}
                  readOnly={type === "viwe"}
                  className={type === "viwe" ? "bg-[#EFEFEF]" : ""}
                  name="invoiceImage"
                  label="صورة الفاتورة"
                  placeholder="img/photo/gallery.jpg"
                />
                <TFormField
                  typeField="textarea"
                  form={form}
                  name="notes"
                  readOnly={type === "viwe"}
                  className={type === "viwe" ? "bg-[#EFEFEF] flex-1" : "flex-1"}
                  label="ملاحظات"
                />
              </div>

              {/* المعرض */}
              <div className="flex">
                <TButton variant="outline" type="button">
                  المعرض 📷
                </TButton>
              </div>
            </div>
          </div>

          {/* زر الحفظ */}
          <div className="flex w-full justify-end mt-6">
            <TButton
              type="reset"
              onClick={() => form.reset()}
              className="flex items-center mx-4 gap-2 w-[138px] bg-white border border-gray-300 hover:bg-gray-100 text-black"
            >
              إلغاء
            </TButton>
            <Button
              onClick={() => setTab("imgs")}
              type="submit"
              className="flex items-center gap-2 w-[138px]"
            >
              <Save size={16} />
              <p>{t("CarBranch.form.save")}</p>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
