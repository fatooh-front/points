import * as Tabs from "@radix-ui/react-tabs";
import clsx from "clsx";
import { ReactNode } from "react";

export function AddCarTabs({
  FormOneThree,
  FormTwo,
  FormOne,
  setStep,
  step,
}: {
  FormOneThree: ReactNode;
  FormTwo: ReactNode;
  FormOne: ReactNode;
  setStep: (value: string) => void;
  step: string;
}) {
  console.log(step);

  return (
    <Tabs.Root
      value={step}
      onValueChange={setStep}
      className="w-full"
      dir="rtl"
    >
      <Tabs.List className="flex py-4  items-center justify-between w-full">
        <Tabs.Trigger
          value={step}
          className={clsx(
            "px-4 text-primary py-2 flex group gap-[8px] items-center text-sm",
            "radix-state-active:border-b-2 radix-state-active:font-bold"
          )}
        >
          <div className="w-[32px] aspect-square flex justify-center items-center relative rounded-full bg-primary">
            <span className="w-[22px] group-hover:w-[16px] duration-200 aspect-square absolute rounded-full bg-white"></span>
          </div>
          <p className="font-[Cairo] font-medium text-[20px] leading-[100%] tracking-[0%] text-center align-middle ">
            <span className="text-[24px] ">01 </span>بيانات السيارة
          </p>
        </Tabs.Trigger>
        <span
          className={` h-[6px] rounded-[8px] ${
            step === "3" || step === "2" ? "bg-primary" : "bg-[#BFBFBF] "
          } flex-1`}
        ></span>
        <Tabs.Trigger
          value={step}
          className={clsx(
            "px-4 py-2 flex group gap-[8px] items-center text-sm",
            "radix-state-active:border-b-2 radix-state-active:font-bold",
            step === "3" || step === "2" ? " text-primary" : "text-[#7E858E]"
          )}
        >
          <div
            className={`w-[32px] aspect-square flex justify-center items-center relative rounded-full   ${
              step === "3" || step === "2" ? "bg-primary" : "bg-[#BFBFBF] "
            }`}
          >
            <span className="w-[22px] group-hover:w-[16px] duration-200 aspect-square absolute rounded-full bg-white"></span>
          </div>
          <p className="font-[Cairo] font-medium text-[20px] leading-[100%] tracking-[0%] text-center align-middle ">
            {" "}
            <span className="text-[24px] c ">02</span> الأسعار
          </p>
        </Tabs.Trigger>
        <span
          className={` h-[6px] rounded-[8px] ${
            step === "3" ? "bg-primary" : "bg-[#BFBFBF] "
          } flex-1`}
        ></span>
        <Tabs.Trigger
          value={step}
          className={clsx(
            "px-4 py-2 flex group gap-[8px] items-center text-sm",
            "radix-state-active:border-b-2 radix-state-active:font-bold",
            step === "3" ? " text-primary" : "text-[#7E858E]"
          )}
        >
          <div
            className={`w-[32px] aspect-square flex justify-center items-center relative rounded-full ${
              step === "3" ? "bg-primary" : "bg-[#BFBFBF] "
            }`}
          >
            <span className="w-[22px] group-hover:w-[16px] duration-200 aspect-square absolute rounded-full bg-white"></span>
          </div>
          <p className="font-[Cairo] font-medium text-[20px] leading-[100%] tracking-[0%] text-center align-middle ">
            <span className="text-[24px]">03 </span>الفروع والإضافات
          </p>
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="1">{FormOne}</Tabs.Content>
      <Tabs.Content value="2">{FormTwo}</Tabs.Content>
      <Tabs.Content value="3">{FormOneThree}</Tabs.Content>
    </Tabs.Root>
  );
}
