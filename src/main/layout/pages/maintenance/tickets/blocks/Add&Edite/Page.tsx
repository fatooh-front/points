import { useTranslation } from "react-i18next";
import { Form } from "@/components/ui/form";
import TFormField from "@/main/common/components/TForm/TFormField";
import TButton from "@/main/common/components/TForm/TButton";
import { Save } from "lucide-react";
import TReactSelect from "@/main/common/components/TForm/reactSelect/TReactSelect";
import { UseAddOrEditDataOfPage } from "./hooks/UseAddOrEditDataOfPage";
import TFormNumberField from "@/main/common/components/TForm/TFormNumberField";
import { Tabs } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import UplodeImges from "./blocks/uplode-imges";

const Page = () => {
  const { t } = useTranslation("CarBranch");
  const { form, onSubmit } = UseAddOrEditDataOfPage({});
  const [tab, setTab] = useState("form");
  return (
    <div className="box-border w-full flex items-center flex-col min-h-dvh-64px">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mx-auto">
          <Tabs dir="rtl" value={tab} defaultValue="form" className="">
            <TabsContent value="form">
              <div className="flex w-full mx-auto rounded-lg shadow-lg bg-white">
                <div className="w-full px-6 py-4 md:px-8 flex flex-col gap-4">
                  {/* Row 1: السيارة - رقم التذكرة */}
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
                        { value: "car1", label: "سيارة 1" },
                        { value: "car2", label: "سيارة 2" },
                      ]}
                    />
                  </div>

                  {/* Row 2: قراءة العداد - نوع الصيانة */}
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
                    />{" "}
                    <TFormNumberField
                      form={form}
                      name={
                        form.watch("maintenanceType") != "accident"
                          ? "odometer"
                          : "accidentnum"
                      }
                      label={
                        form.watch("maintenanceType") != "accident"
                          ? "قراءة العداد"
                          : "رقم الحادث"
                      }
                      placeholder="0"
                    />
                  </div>

                  {form.watch("maintenanceType") === "accident" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* رقم التقدير */}
                      <TFormField
                        typeField="input"
                        type="string"
                        form={form}
                        name="estimationNumber"
                        label="رقم التقدير"
                        placeholder="ادخل رقم التقدير"
                      />
                      {/* تفاصيل الحادث */}
                      <TFormField
                        typeField="textarea"
                        form={form}
                        name="accidentDetails"
                        label="تفاصيل الحادث"
                        placeholder=""
                        className=" h-[146px]"
                      />
                      {/* إجمالي تقديرات قطع الغيار الرسمية */}
                      <TFormNumberField
                        form={form}
                        name="officialPartsEstimation"
                        label="إجمالي تقديرات قطع الغيار الرسمية"
                        placeholder="0.0"
                      />{" "}
                      {/* إجمالي تقديرات النقليات الرسمية */}
                      <TFormNumberField
                        form={form}
                        name="officialTransportEstimation"
                        label="إجمالي تقديرات النقليات الرسمية"
                        placeholder="0.0"
                      />
                      {/* إجمالي تقديرات المصنعية الرسمية */}
                      <TFormNumberField
                        form={form}
                        name="officialLaborEstimation"
                        label="إجمالي تقديرات المصنعية الرسمية"
                        placeholder="0.0"
                      />
                      {/* إجمالي تقديرات التكاليف الأخرى الرسمية */}
                      <TFormNumberField
                        form={form}
                        name="officialOtherCostsEstimation"
                        label="إجمالي تقديرات التكاليف الأخرى الرسمية"
                        placeholder="0.0"
                      />
                      {/* إجمالي التقديرات الرسمية */}
                      <TFormNumberField
                        form={form}
                        name="totalOfficialEstimation"
                        label="إجمالي التقديرات الرسمية"
                        placeholder="0.0"
                      />
                      {/* إجمالي شركة التامين */}
                      <TFormNumberField
                        form={form}
                        name="insuranceCompanyEstimation"
                        label="إجمالي شركة التامين"
                        placeholder="0.0"
                      />
                      {/* عنوان التذكرة */}
                      <TFormField
                        typeField="input"
                        type="string"
                        form={form}
                        name="ticketTitle"
                        label="عنوان التذكرة"
                        placeholder="ادخل عنوان التذكرة"
                      />{" "}
                      {/* التفاصيل */}
                      <TFormField
                        typeField="textarea"
                        className=" h-[146px]"
                        form={form}
                        name="details"
                        label="التفاصيل"
                        placeholder=""
                      />
                      {/* مركز الصيانة */}
                      <TReactSelect
                        name="maintenanceCenter"
                        form={form}
                        label="مركز الصيانة"
                        placeholder="اختر مركز الصيانة"
                        options={[
                          { value: "center1", label: "مركز 1" },
                          { value: "center2", label: "مركز 2" },
                        ]}
                      />{" "}
                      {/* موظف الصيانة */}
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
                  ) : (
                    <div>
                      {" "}
                      {/* Row 3: التفاصيل - عنوان التذكرة */}
                      <div className="flex flex-col md:flex-row gap-4">
                        <TFormField
                          typeField="input"
                          type="string"
                          form={form}
                          name="ticketTitle"
                          label="عنوان التذكرة"
                          placeholder="ادخل عنوان التذكرة"
                          className="flex-1"
                        />{" "}
                        <TFormField
                          typeField="textarea"
                          form={form}
                          name="details"
                          label="التفاصيل"
                          placeholder=""
                          className="flex-1"
                        />
                      </div>
                      {/* Row 4: موظف الصيانة - مركز الصيانة */}
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
                        />{" "}
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
                    </div>
                  )}

                  {/* Row 5: ملاحظات */}
                  <TFormField
                    typeField="textarea"
                    className=" h-[146px]"
                    form={form}
                    name="notes"
                    label="ملاحظات"
                    placeholder=""
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="imgs">
              {" "}
              <UplodeImges form={form}></UplodeImges>
            </TabsContent>
          </Tabs>
          {/* Submit Button */}
          <div className="flex w-full justify-end mt-6">
            <TButton
              type="reset"
              onClick={() => form.reset()}
              className="flex items-center  mx-4 gap-2 w-[138px] bg-white border border-gray-300 hover:bg-gray-100 text-black"
            >
              إلغاء
            </TButton>
            {/* <TButton
              type="submit"
              className="flex items-center gap-2 w-[138px]"
            >
              <Save size={16} />
              <p>{t("CarBranch.form.save")}</p>
            </TButton> */}
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
