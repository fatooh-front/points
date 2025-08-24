import { Form } from "@/components/ui/form";
import TButton from "@/main/common/components/TForm/TButton";
import { Save } from "lucide-react";
import { UseAddOrEditDataOfPage } from "./hooks/UseAddOrEditDataOfPage";
import TReactSelect from "@/main/common/components/TForm/reactSelect/TReactSelect";

const offerStatusOptions = [
  { value: "active", label: "فعال" },
  { value: "inactive", label: "غير فعال" },
];

const offerTypeOptions = [
  { value: "every_time", label: "كل مره" },
  { value: "once", label: "مرة واحدة" },
];

const Page = () => {
  const { form, onSubmit } = UseAddOrEditDataOfPage({});

  return (
    <div className="box-border w-full flex items-center flex-col min-h-dvh-64px">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mx-auto">
          <div className="flex w-full mx-auto rounded-lg shadow-lg p-6 bg-white">
            <div className="flex flex-col md:flex-row w-full gap-10 mb-4">
              <div className="flex-1 grid grid-cols-2 flex-col gap-6">
                {/* العرض */}
                <div className="  col-span-2">
                  <TReactSelect
                    labelClassName="text-base"
                    typeField="input"
                    type="string"
                    form={form}
                    options={offerStatusOptions}
                    name="offerTitle"
                    label="العرض"
                    placeholder="ادخل اسم العرض"
                  />
                </div>
                {/* نوع العرض */}
                <TReactSelect
                  labelClassName="text-base"
                  typeField="input"
                  type="string"
                  form={form}
                  name="offerType"
                  label="نوع العرض"
                  options={offerTypeOptions}
                  placeholder="اختر نوع العرض"
                />
                {/* حالة العرض */}
                <TReactSelect
                  labelClassName="text-base"
                  typeField="input"
                  type="string"
                  form={form}
                  name="offerStatus"
                  label="حالة العرض"
                  options={offerStatusOptions}
                  placeholder="اختر حالة العرض"
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
              <p>حفظ</p>
            </TButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
