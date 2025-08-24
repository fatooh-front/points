import { useTranslation } from "react-i18next";
import { Form } from "@/components/ui/form";
import TFormField from "@/main/common/components/TForm/TFormField";
import TButton from "@/main/common/components/TForm/TButton";
import { Save } from "lucide-react";
import { UseAddOrEditDataOfPage } from "./hooks/UseAddOrEditDataOfPage";

import ListTransferComponent from "@/main/common/components/ListTransferComponent";
import TReactSelect from "@/main/common/components/TForm/reactSelect/TReactSelect";

const Page = () => {
  const { t } = useTranslation("CarBranch");
  const { form, onSubmit } = UseAddOrEditDataOfPage({});
  return (
    <div className="box-border w-full flex items-center  flex-col min-h-dvh-64px">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mx-auto">
          <div className=" grid grid-cols-3 gap-6 w-full  mx-auto rounded-lg shadow-lg p-6 bg-white">
            {/* Inputs Section */}
            {/* URL Title */}{" "}
            <div className=" flex flex-col gap-4">
              <TReactSelect
                className=" h-[56px]"
                labelClassName="text-base"
                typeField="input"
                type="string"
                form={form}
                options={[
                  { label: "نص", value: "text" },
                  { label: "صوره", value: "photo" },
                  { label: "فيديو", value: "video" },
                ]}
                name="type"
                label="اللغة"
                placeholder="اللغة"
              />{" "}
              {form.watch("type") === "photo" ? (
                <div className="flex flex-col items-center justify-start  ">
                  <div className="relative w-full h-[440px] bg-gray-200 rounded-lg flex items-center justify-center border border-dashed border-gray-400">
                    {/* Replace this div with your image upload logic */}
                    <span className="absolute top-2 left-2 text-xs text-gray-400">
                      المعرض
                    </span>
                    <span className="text-gray-400">[صورة ]</span>
                  </div>
                </div>
              ) : form.watch("type") === "video" ? (
                <div className="flex flex-col items-center justify-start  ">
                  <div className="relative w-full h-[440px] bg-gray-200 rounded-lg flex items-center justify-center border border-dashed border-gray-400">
                    {/* Replace this div with your image upload logic */}
                    <span className="absolute top-2 left-2 text-xs text-gray-400">
                      المعرض
                    </span>
                    <span className="text-gray-400">[فيديو ]</span>
                  </div>
                </div>
              ) : (
                <TFormField
                  labelClassName="text-sm"
                  typeField="textarea"
                  type="textarea"
                  form={form}
                  className="h-[420px]"
                  name="discountRate2"
                  label="النص"
                />
              )}
            </div>{" "}
            <div className=" col-span-2">
              <ListTransferComponent
                initialSelected={[
                  { label: "فرع جدة - العزيزية", id: "jeddah-aziziyah-1" },
                  { label: "فرع قريش -  جدة", id: "jeddah-quraish-1" },
                ]}
                initialAvailable={[
                  { label: "فرع جدة - العزيزية", id: "jeddah-aziziyah-2" },
                  { label: "فرع جدة - العزيزية", id: "jeddah-aziziyah-3" },
                  { label: "فرع جدة - العزيزية", id: "jeddah-aziziyah-4" },
                  { label: "فرع النزهة - الرياض", id: "riyadh-nuzha" },
                  { label: "فرع جدة - العزيزية", id: "jeddah-aziziyah-5" },
                  { label: "فرع قريش -  جدة", id: "jeddah-quraish-2" },
                  { label: "فرع قريش -  جدة", id: "jeddah-quraish-3" },
                  { label: "فرع قريش -  جدة", id: "jeddah-quraish-4" },
                ]}
              />
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
              <p>{t("CarBranch.form.save")}</p>
            </TButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
