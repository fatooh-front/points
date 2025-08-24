import { UseAddOrEditDataOfPage } from "./hooks/UseAddOrEditDataOfPage";
import TFormNumberField from "@/main/common/components/TForm/TFormNumberField";
import { Form } from "@/components/ui/form";

export default function MaintenanceRatios() {
  const { form, onSubmit } = UseAddOrEditDataOfPage({});

  return (
    <div className="flex w-full mx-auto rounded-lg shadow-lg bg-white">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mx-auto">
          <div className="w-full px-6 py-4 md:px-8 flex flex-col gap-4">
            {/* إجمالي التقديرات */}
            <div className="flex flex-col md:flex-row gap-4">
              <TFormNumberField
                form={form}
                name="totalEstimations"
                readOnly={true}
                className="bg-[#EFEFEF]"
                label="إجمالي التقديرات"
              />
              <TFormNumberField
                readOnly={true}
                form={form}
                className="bg-[#EFEFEF]"
                name="insuranceAmount"
                label="مبلغ التأمين"
              />
            </div>

            {/* مبالغ */}
            <div className="flex flex-col md:flex-row gap-4">
              <TFormNumberField
                form={form}
                name="insuranceCompanyAmount"
                label="المبلغ الكلي"
                placeholder="5654"
              />
              <TFormNumberField
                form={form}
                name="customerCompensationAmount"
                label="مبلغ التعويض من العميل"
                placeholder="2365"
              />
              <TFormNumberField
                form={form}
                name="insuranceCompanyRatio"
                label="نسبة شركة التامين"
                placeholder="20.0"
              />
            </div>
            {/* نسب الصيانة */}
            <div className="flex flex-col md:flex-row gap-4">
              <TFormNumberField
                form={form}
                name="customerRatio"
                label="نسبة العميل"
                placeholder="10.0"
              />
              <TFormNumberField
                form={form}
                name="ghazalRatio"
                label="نسبة الغزال"
                placeholder="20.0"
              />
              <TFormNumberField
                form={form}
                name="thirdPartyRatio"
                label="نسبة الطرف ثالث"
                placeholder="20.0"
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
