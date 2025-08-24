import { useTranslation } from "react-i18next";
import { Form } from "@/components/ui/form";
import TFormField from "@/main/common/components/TForm/TFormField";
import TButton from "@/main/common/components/TForm/TButton";
import { Save } from "lucide-react";
import { UseAddOrEditDataOfPage } from "./hooks/UseAddOrEditDataOfPage";
import { useGetAllBranches } from "@/main/global/api/restful/userManagmentAPI/BranchesManager/BranchesQuery";
import TReactSelect from "@/main/common/components/TForm/reactSelect/TReactSelect";

const Page = () => {
  const { t } = useTranslation("CarBranch");
  const { form, onSubmit } = UseAddOrEditDataOfPage({});
  const { data: CarBranchesData } = useGetAllBranches();

  // Refetch after add

  const branchesList =
    CarBranchesData?.data?.map((item) => {
      return {
        value: item.branchId,
        label: item.branchArName,
      };
    }) || [];
  return (
    <div className="box-border w-full flex items-center  flex-col min-h-dvh-64px">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mx-auto">
          <div className="flex w-full  mx-auto rounded-lg shadow-lg p-6 bg-white">
            {/* Row 0: Membership Card Image */}
            <div className="flex flex-col md:flex-row w-full gap-10 mb-4">
              <div className="flex-1  grid grid-cols-2 flex-col gap-6">
                {/* Arabic Title */}
                <TReactSelect
                  labelClassName="text-base"
                  typeField="input"
                  type="string"
                  form={form}
                  name="titleAr"
                  label="اسم الفرع"
                  options={branchesList}
                  placeholder="اختر اسم الفرع"
                />
                {/* English Title */}
                <TFormField
                  labelClassName="text-base"
                  typeField="input"
                  type="string"
                  form={form}
                  name="titleEn"
                  label="كود التفعيل"
                  placeholder="ادخل الكود"
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
