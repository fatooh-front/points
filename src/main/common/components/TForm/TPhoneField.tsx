import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getCountry } from "@/main/global/utils/countries/getCountry";
import { getIsoCode } from "@/main/global/utils/countries/getIsoCodeFromName";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-number-input";
import ar from "react-phone-number-input/locale/ar";
import "react-phone-number-input/style.css";
import { ReactNode } from "react";

type TFormField = {
  form?: any;
  typeField?: string;
  name: string;
  label?: string;
  labelInput?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  fromItemClassName?: string;
  defaultValue?: string;
  linkBelowField?: ReactNode;
  [key: string]: any;
};

function TPhoneField({
  form,
  name,
  label,
  labelInput,
  placeholder = "",
  description = "",
  disabled = false,
  fromItemClassName = "",
  ...props
}: TFormField) {
  const { className, ...propsField } = props;
  const { i18n } = useTranslation();

  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem className={`w-full ${fromItemClassName}`}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <PhoneInput
              defaultCountry={(getIsoCode(getCountry()) as any) || "SA"}
              className={cn(
                disabled ? "!cursor-default pointer-events-none" : "",
                "flex",
                i18n.language === "ar" ? " flex-row-reverse" : "",
                className
              )}
              international
              labels={i18n.language === "ar" ? ar : undefined}
              inputComponent={Input}
              // countrySelectComponent={SSS}
              aria-label={labelInput || placeholder}
              placeholder={placeholder}
              {...propsField}
              {...field}
            />
          </FormControl>
          <FormMessage />
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}

export default TPhoneField;
