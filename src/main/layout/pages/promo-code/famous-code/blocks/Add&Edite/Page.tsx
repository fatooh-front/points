import { useTranslation } from "react-i18next";
import { Form } from "@/components/ui/form";
import TFormField from "@/main/common/components/TForm/TFormField";
import TButton from "@/main/common/components/TForm/TButton";
import { Save } from "lucide-react";
import TReactSelect from "@/main/common/components/TForm/reactSelect/TReactSelect";
import { UseAddOrEditDataOfPage } from "./hooks/UseAddOrEditDataOfPage";
import { DatePicker } from "@/components/ui/date_picker";
import MiniCalendarSVG from "@/main/global/assets/svg/MiniCalendarSVG";
import { useGetAllClients } from "@/main/global/api/restful/userManagmentAPI/clientsManager/clientsQuery";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Page = () => {
  function formatDateToYMD(date: Date) {
    return date.toISOString().split("T")[0] + "T23:59:59";
  }
  const { t } = useTranslation("CarBranch");
  const { form, onSubmit, isPending } = UseAddOrEditDataOfPage({});
  const [clientsPhone, setClientsPhone] = useState<string>("");
  const { data: allClients } = useGetAllClients({
    from: formatDateToYMD(new Date("1999-01-01")),
    to: formatDateToYMD(new Date()),
    mobile: clientsPhone,
  });
  const navigate = useNavigate();

  return (
    <div
      onClick={() => console.log(form.control._formState.errors)}
      className="box-border w-full flex items-center flex-col min-h-dvh-64px"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mx-auto">
          <div className="flex w-full mx-auto rounded-lg shadow-lg bg-white">
            <div className="w-full px-6 py-4 md:px-8 flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <TFormField
                  typeField="input"
                  type="string"
                  form={form}
                  name="notes"
                  label="اسم الكود"
                />{" "}
                <TFormField
                  typeField="input"
                  type="string"
                  form={form}
                  name="promo"
                  label=" كود الخصم"
                />
              </div>
              {/* Row 2 */}
              <div className="flex flex-col md:flex-row gap-4">
                <TReactSelect
                  name="promoType"
                  form={form}
                  label="النوع"
                  options={[
                    { value: 2, label: "قيمة ثابتة" },
                    { value: 1, label: "نسبة مئوية" },
                  ]}
                />{" "}
                <TFormField
                  typeField="input"
                  type="number"
                  form={form}
                  name="promoValue"
                  label="القيمة"
                />
              </div>
              {/* Row 3 */}
              <div className="flex flex-col md:flex-row gap-4">
                <DatePicker
                  form={form}
                  name="startDate"
                  Icon={<MiniCalendarSVG color={"#C9972B"} />}
                  label="تاريخ البداية"
                />
                <DatePicker
                  form={form}
                  name="endDate"
                  Icon={<MiniCalendarSVG color={"#C9972B"} />}
                  label="تاريخ النهاية"
                />
              </div>
              {/* Row 4 */}
              <div className="flex flex-col md:flex-row gap-4">
                <TFormField
                  typeField="input"
                  type="number"
                  form={form}
                  name="minValue"
                  label="الحد الأدني لإستخدام الخصم"
                  // placeholder="0"
                  prefix="ر.س"
                />{" "}
                <TFormField
                  typeField="input"
                  type="number"
                  form={form}
                  name="maxValue"
                  label="الحد الأقصي للخصم"
                  // placeholder="0"
                  prefix="ر.س"
                />
              </div>
              {/* Row 5 */}
              <div className="flex flex-col md:flex-row gap-4">
                <TFormField
                  typeField="input"
                  type="number"
                  form={form}
                  name="maxUse"
                  label="عدد العملاء المستخدمين للكود"
                  // placeholder="عميل"
                />{" "}
                <TFormField
                  typeField="input"
                  type="number"
                  form={form}
                  name="maxUsePerClient"
                  label="عدد مرات استخدام العميل للكود"
                />
              </div>
              {/* Row 6 */}{" "}
              <div className="flex flex-col md:flex-row gap-4">
                <div
                  className=" fspace-y-2 w-full "
                  onBlur={() =>
                    setClientsPhone(form.getValues("customerPhone" as any))
                  }
                >
                  <TFormField
                    typeField="input"
                    type="string"
                    form={form}
                    name="customerPhone"
                    label="جوال العميل (إختياري)"
                  />
                </div>
                <TReactSelect
                  typeField="input"
                  type="string"
                  form={form}
                  name="clientId"
                  addIsPending={true}
                  options={allClients?.content?.map((client) => ({
                    value: client.clientId,
                    label: client.firstName,
                  }))}
                  label="اسم العميل (إختياري)"
                />{" "}
              </div>
              <div className="flex  flex-row gap-8 my-4">
                <label className="flex flex-1 items-center gap-2">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={form.watch("promoStatus") === 1}
                    onChange={() => form.setValue("promoStatus", 1)}
                    className=""
                  />
                  فعال
                </label>{" "}
                <label className="flex flex-1 items-center gap-2">
                  <input
                    type="radio"
                    name="status"
                    value="inactive"
                    checked={!form.watch("promoStatus")}
                    onChange={() => form.setValue("promoStatus", 0)}
                  />
                  غير فعال
                </label>
              </div>{" "}
            </div>
          </div>

          <div className="flex w-full justify-end mt-6">
            <TButton
              type="reset"
              onClick={() => {
                form.reset();
                navigate("/promo-code/famous-codes");
              }}
              className="flex items-center mx-4 gap-2 w-[138px] bg-white border border-gray-300 hover:bg-gray-100 text-black"
            >
              إلغاء
            </TButton>
            <TButton
              isPending={isPending}
              type="submit"
              className="flex items-center gap-2 w-[138px]"
            >
              <Save size={16} />
              <p>{t("CarBranch.form.save")}</p>
            </TButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
