import { useTranslation } from "react-i18next";
import { Form } from "@/components/ui/form";
import TFormField from "@/main/common/components/TForm/TFormField";
import TButton from "@/main/common/components/TForm/TButton";
import { Save } from "lucide-react";
import { UseAddOrEditDataOfPage } from "./hooks/UseAddOrEditDataOfPage";

const Page = ({ type = "add" }: { type?: string }) => {
  const { t } = useTranslation("CarBranch");
  const { form, onSubmit } = UseAddOrEditDataOfPage({});

  return (
    <div className="box-border w-full flex items-center  flex-col min-h-dvh-64px">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mx-auto">
          <div className="flex w-full  mx-auto rounded-lg shadow-lg p-6 bg-white">
            {/* Row 0: Membership Card Image */}
            <div className="flex flex-col md:flex-row w-full gap-10 mb-4">
              <div className="flex-1  grid grid-cols-2 flex-col gap-6">
                {/* Arabic Title */}
                <TFormField
                  labelClassName="text-base"
                  typeField="input"
                  type="string"
                  form={form}
                  name="titleAr"
                  label="العنوان بالعربي"
                  placeholder="العنوان بالعربي"
                />
                {/* English Title */}
                <TFormField
                  labelClassName="text-base"
                  typeField="input"
                  type="string"
                  form={form}
                  name="titleEn"
                  label="العنوان"
                  placeholder="Title"
                />

                {/* Arabic Details */}
                <TFormField
                  typeField="textarea"
                  form={form}
                  name="detailsAr"
                  placeholder="التفاصيل بالعربي"
                  label="التفاصيل بالعربي"
                  readOnly={type === "view"}
                />
                {/* English Details */}
                <TFormField
                  typeField="textarea"
                  form={form}
                  name="detailsEn"
                  placeholder="Details"
                  label="التفاصيل"
                  readOnly={type === "view"}
                />
                {/* Arabic Return Policy */}
                <TFormField
                  typeField="textarea"
                  form={form}
                  name="returnPolicyAr"
                  placeholder="شروط الإسترجاع بالعربي"
                  label="شروط الإسترجاع بالعربي"
                  readOnly={type === "view"}
                />
                {/* English Return Policy */}
                <TFormField
                  typeField="textarea"
                  form={form}
                  name="returnPolicyEn"
                  placeholder="Return Policy"
                  label="شروط الإسترجاع"
                  readOnly={type === "view"}
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
              <p>{t("CarBranch.form.save")}</p>
            </TButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
