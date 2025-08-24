import TButton from "@/main/common/components/TForm/TButton";
import TFormField from "@/main/common/components/TForm/TFormField";
import { useExtraServices } from "./useExtraServices";
import TrashEditIcon from "@/main/global/assets/svg/TrashEditIcon";
import { Form } from "@/components/ui/form";
import TReactSelect from "@/main/common/components/TForm/reactSelect/TReactSelect";

export default function ExtraServices() {
  const { form, onSubmit, data, mutateDelete, refetch } = useExtraServices();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-lg shadow-lg bg-white p-6 mb-4"
      >
        <div className="font-bold text-lg mb-6 text-[#162A2B]">الخدمات</div>
        <div className="flex flex-col  lg:flex-row gap-4 mb-4  items-end">
          <TFormField
            labelClassName="text-base"
            fromItemClassName="relative"
            form={form}
            label="اسم الخدمة بالإنجليزية"
            type="text"
            name="nameEnglish"
            errorMessageClaasName=" absolute -bottom-5"

            // name="newServiceName")}
          />
          <TFormField
            labelClassName="text-base"
            fromItemClassName="relative"
            form={form}
            label="اسم الخدمة بالعربية"
            type="text"
            name="nameArabic"
            errorMessageClaasName=" absolute -bottom-5"

            // name="newServiceName")}
          />{" "}
          <TReactSelect
            labelClassName="text-base"
            form={form}
            name="serviceType"
            isClearable={false}
            label="نوع السعر"
            options={[
              { value: "1", label: "متغير بالمدة" },
              { value: "2", label: "سعر ثابت" },
            ]}
            wrapperClassName="relative"
            errorMessageClassName=" absolute -bottom-5 "
            readOnly={false}
            type="number"
          />
          <TFormField
            labelClassName="text-base"
            fromItemClassName="relative"
            form={form}
            label="سعرها"
            type="number"
            InputIcon="ر.س"
            errorMessageClaasName=" absolute -bottom-5"
            name="price"
          />{" "}
          <TReactSelect
            isClearable={false}
            labelClassName="text-base"
            form={form}
            name="serviceAvailability"
            label="نوع الخدمة"
            options={[
              { value: "1", label: "حجز" },
              { value: "2", label: "لموزين" },
              { value: "3", label: "لموزين و حجز" },
            ]}
            wrapperClassName="relative"
            errorMessageClassName=" absolute -bottom-5 "
            readOnly={false}
            type="number"
          />
          <TButton
            type="button"
            className="h-[48px] mt-6 md:mt-0  "
            onClick={form.handleSubmit(onSubmit)}
          >
            إضافة
          </TButton>
        </div>
        <div className="border mt-8 border-[#D0DADE] rounded-md p-4">
          {data?.data?.map((srv) => (
            <div
              key={srv.serviceId}
              className="flex items-center justify-between border-b  max-sm:flex-col py-2"
            >
              <span className="text-start py-2">{srv.nameArabic}</span>{" "}
              <span className=" text-start py-2 px-2 ">
                {srv.serviceAvailability === 1
                  ? "حجز"
                  : srv.serviceAvailability === 2
                  ? "لموزين"
                  : "لموزين و حجز"}
              </span>{" "}
              <span className=" text-start py-2 px-2 ">
                {srv.serviceType === 1 ? "متغير بالمدة" : "سعر ثابت"}
              </span>{" "}
              <span className=" text-start py-2 px-2 ">{srv.price} ر.س</span>{" "}
              <button
                type="button"
                className="text-red-500 "
                onClick={() =>
                  srv.serviceId &&
                  mutateDelete(srv.serviceId, { onSuccess: () => refetch() })
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
