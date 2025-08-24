import { useTranslation } from "react-i18next";
import { Form } from "@/components/ui/form";
import TFormField from "@/main/common/components/TForm/TFormField";
import TButton from "@/main/common/components/TForm/TButton";
import { Save } from "lucide-react";
import { UseAddOrEditMembershipForm } from "./hooks/UseAddOrEditDataOfPage";
import Maseges from "./blocks/maseges";
import TextEditor from "@/main/common/components/TForm/TextEditor/TextEditor";
import TReactSelect from "@/main/common/components/TForm/reactSelect/TReactSelect";
import { useNavigate } from "react-router-dom";
import TFileField from "@/main/common/components/TForm/TFileField";
import { useState } from "react";
import MembershipCardSkeleton from "./blocks/MembershipCardSkeleton";
import { useGetAllTypes } from "@/main/global/api/restful/userManagmentAPI/TypeManager/TypeQuery";

const Page = ({ type = "add" }: { type?: string }) => {
  const { t } = useTranslation("CarBranch");
  const { form, onSubmit, isLoading } = UseAddOrEditMembershipForm();
  const navigate = useNavigate();
  const { data: Types } = useGetAllTypes();
  const ListOfTypes =
    Types?.data?.map((item) => {
      return {
        value: item.typeId,
        label: item.arabicName,
      };
    }) || [];
  const [file, setFile] = useState<File | null>(null);

  return (
    <div
      onClick={() => console.log(form.control._formState.errors, "ghfghfghfg")}
      className="box-border w-full flex items-center  flex-col min-h-dvh-64px"
    >
      {!isLoading ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full mx-auto"
          >
            <div className=" w-full  mx-auto rounded-lg shadow-lg p-6 bg-white">
              {/* Row 0: Membership Card Image */}
              <div className="flex flex-col  xl:flex-row w-full  gap-10 mb-4 ">
                <div className=" flex-1">
                  <div className="flex flex-col gap-4 w-full ">
                    <div className="flex w-full  flex-1 gap-4">
                      <TFormField
                        labelClassName="text-sm"
                        typeField="input"
                        type="string"
                        form={form}
                        name="arabicName"
                        label="اسم العضوية (عربي)"
                        // placeholder=""
                      />
                      {/* الاسم بالعربي */}
                      <TFormField
                        labelClassName="text-sm"
                        typeField="input"
                        type="string"
                        form={form}
                        name="memberName"
                        label="اسم العضوية (إنجليزي)"
                        // placeholder=""
                      />
                      <TFormField
                        labelClassName="text-sm"
                        typeField="input"
                        type="number"
                        form={form}
                        name="startPoints"
                        label="بداية نطاق العضوية"
                        // placeholder="0"
                        suffix="ر.س"
                      />
                    </div>
                  </div>{" "}
                  {/* Row 1 */}
                  <div className="flex  flex-col md:flex-row gap-4 mt-6">
                    {" "}
                    <TFormField
                      labelClassName="text-sm"
                      typeField="input"
                      type="number"
                      form={form}
                      name="endPoints"
                      label="نهاية نطاق العضوية"
                      // placeholder="10000"
                      suffix="ر.س"
                    />
                    <TFormField
                      labelClassName="text-sm"
                      typeField="input"
                      type="number"
                      form={form}
                      name="discountPercentage"
                      label="نسبة الخصم علي الفاتورة"
                      // placeholder="15"
                      suffix="%"
                    />
                    <TFormField
                      labelClassName="text-sm"
                      typeField="input"
                      type="number"
                      form={form}
                      name="maxDiscount"
                      label="الحد الأقصي للخصم"
                      // placeholder="500"
                      suffix="ر.س"
                    />{" "}
                  </div>
                  {/* Row 2 */}
                  <div className="flex flex-col md:flex-row gap-4 mt-6">
                    {" "}
                    <TFormField
                      typeField="input"
                      type="number"
                      form={form}
                      name="maxLateHours"
                      label="عدد ساعات التأخير المسمووح بها"
                      labelClassName="text-sm"
                      // placeholder="1"
                      suffix="ساعة"
                    />
                    <TReactSelect
                      labelClassName="text-sm"
                      typeField="select"
                      form={form}
                      name="anotherBranch"
                      label="السماح بتسليم بفرع اخر داخل المدينة"
                      options={[
                        { label: "نعم", value: 1 },
                        { label: "لا", value: 0 },
                      ]}
                      // placeholder="نعم"
                    />
                    <TReactSelect
                      labelClassName="text-sm"
                      typeField="select"
                      form={form}
                      name="preOrderAllowed"
                      label="السماح بالحجز المسبق"
                      options={[
                        { label: "نعم", value: 1 },
                        { label: "لا", value: 0 },
                      ]}
                      // placeholder="نعم"
                    />
                  </div>
                  {/* Row 3 */}
                  <div className="flex flex-col md:flex-row gap-4 mt-6">
                    {" "}
                    {form.watch("preOrderAllowed") ? (
                      <TFormField
                        labelClassName="text-sm"
                        typeField="input"
                        type="number"
                        form={form}
                        name="hoursPreOrder"
                        label="الساعات المسموحة قبل الحجز المسبق"
                        // placeholder="1"
                        suffix="ساعة"
                      />
                    ) : null}
                    <TFormField
                      labelClassName="text-sm"
                      typeField="input"
                      type="number"
                      form={form}
                      name="freeKm"
                      label="عدد الكيلومترات الإضافية المجانية"
                      // placeholder="50"
                      suffix="كم"
                    />
                    <TReactSelect
                      labelClassName="text-sm"
                      typeField="select"
                      form={form}
                      name="luxuryCars"
                      label="خصم السيارات  المتوسطة ؟"
                      options={[
                        { label: "نعم", value: 1 },
                        { label: "لا", value: 0 },
                      ]}
                      // placeholder="نعم"
                    />{" "}
                  </div>
                  {form.watch("luxuryCars") ? (
                    <div className="flex flex-col lg:flex-row gap-4 mt-6">
                      <TReactSelect
                        isClearable={false}
                        labelClassName="text-sm"
                        typeField="select"
                        form={form}
                        name="typeId"
                        label="نوع السيارة "
                        options={ListOfTypes}
                        // placeholder="نعم"
                      />{" "}
                      <TFormField
                        labelClassName="text-sm"
                        typeField="input"
                        type="number"
                        form={form}
                        name="luxuryCarsDiscount"
                        label="نسبة الخصم"
                        // placeholder="0"
                        suffix="%"
                      />{" "}
                      <TFormField
                        labelClassName="text-sm"
                        typeField="input"
                        label="الحد الأقصي للخصم"
                        type="number"
                        form={form}
                        name="luxuryCarsMaxDiscount"
                        // placeholder="0"
                        suffix="ر.س"
                      />
                      <TFormField
                        labelClassName="text-sm"
                        typeField="input"
                        type="number"
                        form={form}
                        name="maxRentLuxuryCars"
                        label="عدد مرات الإيجار شهرياً"
                        // placeholder="0"
                        suffix="مرات"
                      />
                    </div>
                  ) : null}
                  {/* Row 4: Features */}
                </div>{" "}
                <div className="flex flex-col items-center justify-start  ">
                  <label className="mb-2 text-sm font-medium text-gray-700">
                    صورة كارت العضوية
                  </label>
                  <TFileField
                    form={form}
                    name={"icon"}
                    type={"image"}
                    file={file}
                    setFile={setFile}
                    rounded={"full"}
                    imgeArea={
                      <div className="relative w-[320px] h-[180px] bg-gray-200 rounded-lg flex items-center justify-center border border-dashed border-gray-400">
                        {/* Replace this div with your image upload logic */}
                        <span className="absolute top-2 left-2 text-xs text-gray-400">
                          المعرض
                        </span>
                        <span className="text-gray-400">[صورة الكارت]</span>
                      </div>
                    }
                    // labelDrag={}
                    // labelReplace={t("banners.dialog.add.changeImage")}
                    classNameRootProps={
                      "relative w-[320px] h-[180px] bg-gray-200 rounded-lg flex items-center justify-center border border-dashed border-gray-400"
                    }
                    containerClassName={
                      "relative w-[320px] h-[180px] bg-gray-200 rounded-lg flex items-center justify-center border border-dashed border-gray-400"
                    }
                  />{" "}
                </div>
              </div>
              <div className="flex flex-col  gap-4 mt-6">
                <TextEditor
                  form={form}
                  name="arabicDetails"
                  // placeholder="المميزات"
                  label="المميزات (بالعربية)"
                  readOnly={type === "view"}
                />
                <TextEditor
                  form={form}
                  name="details"
                  // placeholder="المميزات"
                  label="المميزات (بالانجليزية)"
                  readOnly={type === "view"}
                />
              </div>
            </div>
            {type === "edit" && (
              <div className="flex w-full mx-auto rounded-lg shadow-lg mt-4 bg-white">
                <Maseges></Maseges>
              </div>
            )}
            {/* Submit Button */}
            <div className="flex w-full justify-end mt-6">
              <TButton
                type="reset"
                onClick={() => {
                  navigate("/membership");

                  form.reset();
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
        <MembershipCardSkeleton></MembershipCardSkeleton>
      )}
    </div>
  );
};

export default Page;
