import { useTranslation } from "react-i18next";
import { Form } from "@/components/ui/form";
import TFormField from "@/main/common/components/TForm/TFormField";

import TButton from "@/main/common/components/TForm/TButton";
import { Save } from "lucide-react";
import TReactSelect from "@/main/common/components/TForm/reactSelect/TReactSelect";
import { UseAddOrEditDataOfPage } from "./hooks/UseAddOrEditDataOfPage";

// import TSwitchField from "@/main/common/components/TForm/TSwitchField";

const Page = () => {
  const { t } = useTranslation("CarBranch");
  const { form, onSubmit } = UseAddOrEditDataOfPage({});

  return (
    <div className="box-border w-full flex items-center flex-col min-h-dvh-64px">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mx-auto">
          <div className="flex w-full flex-col gap-2 mx-auto rounded-lg shadow-lg bg-white p-4">
            <TReactSelect
              name="customerType"
              form={form}
              label="الموظف"
              placeholder=""
              options={[
                { value: "company", label: "شركة" },
                { value: "individual", label: "فرد" },
              ]}
            />
            <TFormField
              typeField="textarea"
              type="string"
              form={form}
              name="customerName"
              className="h-[238px]"
              label="العقود"
              placeholder="معاذ القرشي"
            />
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
