import { Form } from "@/components/ui/form";
import TFormField from "@/main/common/components/TForm/TFormField";

import TButton from "@/main/common/components/TForm/TButton";

import { UseAddOrEditDataOfPage } from "./hooks/UseAddOrEditDataOfPage";
import TrashEditIcon from "@/main/global/assets/svg/TrashEditIcon";

// import TSwitchField from "@/main/common/components/TForm/TSwitchField";

const Page = () => {
  const { form, onSubmit, arrayrReason, mutateDelete, refetch } =
    UseAddOrEditDataOfPage({});
  return (
    <div className="box-border w-full flex items-center flex-col min-h-dvh-64px ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" w-full mx-auto"
        >
          <div className="flex  md:h-full  w-full mx-auto overflow-hidden rounded-lg shadow-lg  bg-white">
            <div className="relative w-full px-6 py-4 md:px-8">
              <div className="flex gap-4  items-end mb-6 text-[#898C8E]">
                {" "}
                <div className="flex-1   w-full">
                  {" "}
                  <div className="font-medium text-lg mb-[18px] text-[#162A2B]">
                    إضافة سبب إلغاء جديد{" "}
                  </div>
                  <div className="flex gap-2  ">
                    <TFormField
                      typeField="input"
                      form={form}
                      type="string"
                      name="arabicName"
                      className="h-[48px] w-full  "
                      errorMessageClaasName=" absolute "
                      labelClassName="text-base"
                      label={"إضافة سبب إلغاء بالعربية"}
                      labelInput={"إضافة سبب إلغاء بالعربية"}
                    />
                    <TFormField
                      typeField="input"
                      form={form}
                      type="string"
                      errorMessageClaasName=" absolute "
                      name="englishName"
                      className="h-[48px] w-full "
                      labelClassName="text-base"
                      label={"إضافة سبب إلغاء بالإنجليزية"}
                      labelInput={"إضافة سبب إلغاء بالإنجليزية"}
                    />
                  </div>
                </div>{" "}
                <TButton
                  type="submit"
                  className="flex items-center h-[48px]  gap-2 w-[138px] "
                  // disabled={isPending}
                >
                  إضافة
                </TButton>
              </div>{" "}
              <div className="font-medium text-base mb-[16px] text-[#898C8E]">
                تمت إضافتهم سابقاً{" "}
              </div>
              <div className="border border-[#D0DADE] rounded-md p-4">
                {arrayrReason?.data?.map((Reason, idx: number) => (
                  <div>
                    {" "}
                    {idx != 0 && <hr className=" w-full border-[#EFEFEF]"></hr>}
                    <div
                      key={idx}
                      className="flex items-center justify-between p-[10px]  "
                    >
                      <span className="w-1/3 text-start py-2">
                        {Reason.arabicName}
                      </span>{" "}
                      <span className="w-1/3 text-start py-2 px-2 border-s">
                        {Reason.englishName}
                      </span>{" "}
                      <button
                        type="button"
                        className="text-red-500 mr-2 w-[24px] h-[24px]"
                        onClick={() => {
                          if (Reason?.reason_id) {
                            mutateDelete(Reason?.reason_id, {
                              onSuccess: () => {
                                refetch();
                              },
                            });
                          }
                        }}
                      >
                        <TrashEditIcon
                          height={24}
                          width={24}
                          className=" w-[24px] h-[24px] hover:opacity-70"
                        ></TrashEditIcon>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2"></div>{" "}
            </div>
          </div>{" "}
        </form>
      </Form>{" "}
    </div>
  );
};

export default Page;
