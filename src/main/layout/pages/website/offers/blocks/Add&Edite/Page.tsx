import { useTranslation } from "react-i18next";
import { Form } from "@/components/ui/form";
import TFormField from "@/main/common/components/TForm/TFormField";
import TButton from "@/main/common/components/TForm/TButton";
import { Save } from "lucide-react";
import { UseAddOrEditDataOfPage } from "./hooks/UseAddOrEditDataOfPage";

import { DatePicker } from "@/components/ui/date_picker";
import TFileField from "@/main/common/components/TForm/TFileField";
import { useState } from "react";
import CustomChechBox from "@/components/ui/custom_chech_box";

const Page = ({ type = "add" }: { type?: string }) => {
  const { t } = useTranslation("CarBranch");
  const [file, setFile] = useState<File | null>(null);
  const { form, onSubmit, isPending } = UseAddOrEditDataOfPage();

  return (
    <div
      onClick={() => console.log(form.getValues())}
      className="box-border w-full flex items-center  flex-col min-h-dvh-64px"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mx-auto">
          <div className="flex w-full mx-auto rounded-lg shadow-lg p-6 bg-white">
            <div className="flex flex-col md:flex-row w-full gap-10 mb-4">
              {/* Left Side: Form Fields */}
              <div className="flex-1 flex flex-col gap-6">
                {/* Row 1: Image Upload & معرض */}

                <div className="flex flex-col md:flex-row gap-4">
                  <div className=" flex-1">
                    <DatePicker
                      className=" h-[56px]"
                      form={form}
                      name="startDate"
                      label="تاريخ البداية"
                      // // placeholder="14/04/2025"
                    />
                    <DatePicker
                      className=" h-[56px]"
                      form={form}
                      name="endDate"
                      label="تاريخ النهاية"
                      // // placeholder="16/06/2025"
                    />
                  </div>
                  <TFileField
                    form={form}
                    name={"image"}
                    type={"image"}
                    file={file}
                    classNameLayout="mt-7 flex-1"
                    setFile={setFile}
                    rounded={"full"}
                    imgeArea={
                      <div className="relative w-[320px] h-[180px] bg-gray-200 rounded-lg flex items-center justify-center border border-dashed border-gray-400">
                        {/* Replace this div with your image upload logic */}
                        <span className="absolute top-2 left-2 text-xs text-gray-400">
                          المعرض
                        </span>
                        <span className="text-gray-400">
                          [ الصور الانجليزيه]
                        </span>
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

                <div className="flex flex-col md:flex-row gap-4">
                  <TFormField
                    className=" h-[56px]"
                    labelClassName="text-base"
                    typeField="input"
                    type="string"
                    form={form}
                    name="titleArabic"
                    label="العنوان بالعربي"
                    // // placeholder="فرحتك بالوطن تستاهل 94"
                  />
                  <TFormField
                    className=" h-[56px]"
                    labelClassName="text-base"
                    typeField="input"
                    type="string"
                    form={form}
                    name="title"
                    label="العنوان"
                    //  // placeholder="عرض اليوم 94"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <TFormField
                    className=" h-[56px]"
                    form={form}
                    name="detailsArabic"
                    // placeholder="هنا تكتب التفاصيل"
                    label="التفاصيل بالعربي"
                    readOnly={type === "view"}
                  />
                  <TFormField
                    className=" h-[56px]"
                    form={form}
                    name="details"
                    // placeholder="هنا تكتب التفاصيل"
                    label="التفاصيل"
                    readOnly={type === "view"}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <TFormField
                    className=" h-[56px]"
                    form={form}
                    name="termsArabic"
                    // placeholder="هنا تكتب الشروط"
                    label="الشروط بالعربي"
                    readOnly={type === "view"}
                  />
                  <TFormField
                    className=" h-[56px]"
                    form={form}
                    name="terms"
                    // placeholder="هنا تكتب الشروط"
                    label="الشروط"
                    readOnly={type === "view"}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <CustomChechBox
                    form={form}
                    name="offerStatus"
                    value={{
                      checked: form.getValues("offerStatus") === 0,
                    }}
                    onChange={() => form.setValue("offerStatus", 0)}
                    // // placeholder="هنا تكتب الشروط"
                    label="غير فعال"
                    // readOnly={type === "view"}
                  />
                  <CustomChechBox
                    value={{
                      checked: form.getValues("offerStatus") === 1,
                    }}
                    onChange={() => form.setValue("offerStatus", 1)}
                    form={form}
                    name="offerStatus"
                    label="فعال"
                  />
                </div>
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
              isPending={isPending}
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
