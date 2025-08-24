import { Form } from "@/components/ui/form";

import { UseAddOrEditDataOfPage } from "./hooks/UseAddOrEditDataOfCarsForm";
// import { AddCarTabs } from "./AddCarTabs";
// import CarInformationForm from "./blocks/CarInformationForm";
// import CarPricesForm from "./blocks/CarPricesForm";
// import CarBranchesForm from "./blocks/CarBranchesForm";
import TButton from "@/main/common/components/TForm/TButton";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// import TSwitchField from "@/main/common/components/TForm/TSwitchField";

const Page = () => {
  const [step, setStep] = useState<string>("1");

  const { form, onSubmit, isLoading } = UseAddOrEditDataOfPage({
    step,
    setStep,
  });
  return (
    <div className="box-border w-full flex items-center flex-col min-h-dvh-64px ">
      <Form {...form}>
        {!isLoading ? (
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" w-full mx-auto"
          >
            {/* <AddCarTabs
              step={step}
              setStep={setStep}
              FormOne={<CarInformationForm form={form} />}
              FormTwo={<CarPricesForm form={form} />}
              // FormOneThree={<CarBranchesForm form={form} />}
            ></AddCarTabs> */}

            <div className="flex gap-4 w-full justify-end mt-6">
              <div
                onClick={() => {
                  const stepNum = Number(step);
                  if (stepNum >= 2) setStep(String(stepNum - 1));
                }}
                className="flex cursor-pointer hover:opacity-70  justify-center  text-white rounded-[8px]  items-center bg-[#B4B8BD] gap-2 w-[138px] "
              >
                السابق
              </div>
              <TButton
                type="submit"
                className="flex items-center  gap-2 w-[138px] "
                // disabled={isPending}
              >
                {/* <Save size={16} /> */}
                {step === "3" ? "حفظ" : "التالي"}{" "}
              </TButton>
            </div>
          </form>
        ) : (
          <div className="w-full h-full">
            <div className="space-y-2">
              {Array(10)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="w-full h-[100px] rounded-md" />
                ))}
            </div>{" "}
          </div>
        )}
      </Form>{" "}
    </div>
  );
};

export default Page;
