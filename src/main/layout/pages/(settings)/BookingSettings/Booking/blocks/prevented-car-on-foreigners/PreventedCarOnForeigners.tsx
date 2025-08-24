import TButton from "@/main/common/components/TForm/TButton";
import { useExtraServices } from "./usePreventedCarOnForeigners";
import TrashEditIcon from "@/main/global/assets/svg/TrashEditIcon";
import { Form } from "@/components/ui/form";
import TReactSelect from "@/main/common/components/TForm/reactSelect/TReactSelect";

export default function PreventedCarOnForeigners() {
  const { form, onSubmit, data, mutate, Types } = useExtraServices();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-lg shadow-lg bg-white p-6 mb-4"
      >
        <div className="font-bold text-lg mb-6 text-[#162A2B]">
          أنواع طراز السيارات الغير مسموح بها للعمل التجريبي
        </div>
        <div className="flex gap-4 mb-4">
          <TReactSelect
            form={form}
            name="Id"
            options={
              Types?.data?.map((item) => ({
                value: item.typeId,
                label: item.arabicName,
              })) || []
            }
            // value={form.watch("carId")}
            // onChange={(value) => {
            //   form.setValue("carId", value);
            // }}
            className="flex-1"
          />
          <TButton
            type="button"
            className="h-[48px]"
            onClick={form.handleSubmit(onSubmit)}
          >
            إضافة
          </TButton>
        </div>
        <div>
          {data?.data.map((Category: any) => (
            <div
              key={Category.categoryId}
              className="flex items-center justify-between border-b py-2"
            >
              <span>{Category.arabicName}</span>
              <button
                type="button"
                className="text-red-500"
                onClick={() =>
                  mutate({ Id: Category.categoryId, banOnForeigners: false })
                }
              >
                <TrashEditIcon height={20} width={20} />
              </button>
            </div>
          ))}
        </div>
      </form>
    </Form>
  );
}
