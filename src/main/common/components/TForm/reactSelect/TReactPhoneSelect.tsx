/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactSelect from "react-select";

import { FormDescription } from "@/components/ui/form";
import { getPhoneOptions } from "@/main/global/utils/countries/getCountriesSelect";
import { get } from "lodash";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CustomOption } from "./blocks/CustomOption";
import { CustomSingleValue } from "./blocks/CustomSingleValue";
import { customStyleReactPhoneSelect } from "./styles/customStyleReactPhoneSelect";

type Option = {
  value: any;
  label: any;
};

type TReactSelectPhoneField = {
  form: any;
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  HandleChange?: (params: string) => void;
  labelClassName?: string;
  defaultValue?: string;
  noOptionsMessage?: string;
  showChecked?: boolean;
  isMulti?: boolean;
  wrapperClassName?: string;
  menuPortalTarget?: HTMLElement;
  enableLabelEmpty?: boolean;
  [key: string]: any;
};

function TReactPhoneSelect({ form, name, label, placeholder = "", description = "", labelClassName, defaultValue, noOptionsMessage, showChecked = true, isMulti = false, wrapperClassName, enableLabelEmpty = false, menuPortalTarget, ...props }: TReactSelectPhoneField) {
  const { i18n, t } = useTranslation("common");
  // console.log("printFFFFF", printFFFFF());
  const options: Option[] | undefined | any = getPhoneOptions(i18n?.language as "ar" | "en");

  // Custom filter function to search by country name
  const filterOption = (option: any, inputValue: string) => {
    const countryLabel = option?.label?.props?.children?.[0]?.props?.children?.[1]?.props?.title;
    const codeLabel = option?.label?.props?.children?.[1]?.props?.children?.props?.children?.[1];

    return countryLabel?.toLowerCase()?.includes(inputValue?.toLowerCase()) || codeLabel?.toLowerCase()?.includes(inputValue?.toLowerCase());
  };

  return (
    <div className={`flex flex-col gap-2 w-full ${wrapperClassName}`}>
      {label && (
        <label htmlFor={name} className={`${labelClassName} text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block`}>
          {label}
        </label>
      )}

      {enableLabelEmpty && <div className="h-[14px]"></div>}
      {options && (
        <Controller
          control={form.control}
          name={name}
          render={({ field }) => (
            <ReactSelect
              isMulti={isMulti as false}
              classNamePrefix="react-select"
              ref={field.ref}
              options={options}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              value={(Array.isArray(options) && (!isMulti ? options?.find((c) => c?.value === field?.value) : options?.filter((c) => field?.value?.includes(c?.value)))) || ""}
              onChange={(val) => {
                val && !isMulti && field.onChange(val.value);
                val &&
                  isMulti &&
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  field.onChange(val.map((option: any) => option.value));
              }}
              components={{
                SingleValue: CustomSingleValue,
                Option: (props) => <CustomOption {...props} showChecked={false} />,
              }}
              filterOption={filterOption}
              styles={customStyleReactPhoneSelect}
              noOptionsMessage={() => noOptionsMessage || t("reactSelect.noOptions")}
              placeholder={placeholder}
              inputId={name}
              // menuPosition="fixed"
              menuPortalTarget={menuPortalTarget}
              // maxMenuHeight={200}
              // menuShouldScrollIntoView={true}
              // menuShouldBlockScroll={true}
              {...props}
            />
          )}
        />
      )}
      {get(form.formState?.errors, name) && <span className="text-xs font-medium text-destructive">{get(form.formState?.errors, name)?.message as any}</span>}
      {description && <FormDescription>{description}</FormDescription>}
    </div>
  );
}

export default TReactPhoneSelect;
