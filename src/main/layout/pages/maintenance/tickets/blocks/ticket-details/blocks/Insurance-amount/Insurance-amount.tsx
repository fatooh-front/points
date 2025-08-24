import { UseAddOrEditDataOfPage } from "./hooks/UseAddOrEditDataOfPage";
import TFormNumberField from "@/main/common/components/TForm/TFormNumberField";
import { Form } from "@/components/ui/form";

export default function Insuranceamount() {
  const { form, onSubmit } = UseAddOrEditDataOfPage({});

  return (
    <div className="flex w-full mx-auto rounded-lg shadow-lg bg-white">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mx-auto">
          <div className="w-full px-6 py-4 md:px-8 flex flex-col gap-4">
            {/* إجمالي التقديرات */}
            <TFormNumberField
              form={form}
              readOnly={true}
              name="totalEstimations"
              className="bg-[#EFEFEF]"
              label=" نسبة الخطأ من المستأجر حسب التقرير"
            />
            <TFormNumberField
              readOnly={true}
              form={form}
              className="bg-[#EFEFEF]"
              name="insuranceAmount"
              label=" مبلغ التامين"
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
