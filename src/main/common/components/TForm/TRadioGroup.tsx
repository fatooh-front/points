/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTranslation } from "react-i18next";

type Option = {
  value: any;
  label: any;
};

type TRadioGroup = {
  form?: any;
  name: string;
  label?: string;
  fromItemClassName?: string;
  outerfromItemClassName?: string;
  defaultValue?: string;
  radioItems: Option[];
  radioGroupClassName?: string;
  [key: string]: any;
};

export default function TRadioGroup({
  form,
  name,
  label,
  fromItemClassName = "",
  outerfromItemClassName = "",
  radioItems,
  defaultValue,
  radioGroupClassName = "",
  ...props
}: TRadioGroup) {
  const { i18n } = useTranslation();
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem className={`${outerfromItemClassName}`}>
          {label && <FormLabel className="mt-2">{label}</FormLabel>}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value || defaultValue}
              className="flex "
              dir={i18n.language === "ar" ? "rtl" : "ltr"}
              {...props}
            >
              {radioItems.reverse()?.map((el: any, index: number) => {
                console.log("el.value", el.value);
                console.log("field.value", field.value);

                return (
                  <FormItem
                    key={el?.value || index}
                    className={`flex items-center justify-center  gap-1 ${
                      el.value === field.value
                        ? "text-primary"
                        : "text-secondry-700"
                    } ${fromItemClassName}`}
                    defaultChecked={
                      el.value === field.value || el.value === defaultValue
                    }
                  >
                    <FormControl className={`flex items-center justify-center mt-0`}>
                      <RadioGroupItem
                        type="button"
                        value={el.value}
                        className={radioGroupClassName}
                      />
                    </FormControl>
                    <FormLabel className="cursor-pointer !mt-0 !mb-0 text-[18px]">
                      {el.label}
                    </FormLabel>
                  </FormItem>
                );
              })}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
