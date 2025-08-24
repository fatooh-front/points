/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactSelect from "react-select";

import { FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { get, isPlainObject } from "lodash";
import { useEffect, useState } from "react";
import { Controller, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import TFieldDisplay from "../TFieldDisplay";
import { CurdFormDialog } from "./blocks/curdFormDialog/CurdFormDialog";
import { Field, OptionFields } from "./blocks/curdFormDialog/utils/fieldsTypes";
import { CustomOption } from "./blocks/CustomOption";
import { customStyles } from "./styles/customStyleReactSelect";

type Option = {
  value: any;
  label: any;
};

type TReactSelectField = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  name: string;
  errorMessageClaasName?: string;
  label?: string;
  placeholder?: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: Option[] | undefined | any;
  disabled?: boolean;
  HandleChange?: (params: string) => void;
  labelClassName?: string;
  defaultValue?: string;
  beforeChange?: ({
    selectedOption,
    field,
  }: {
    selectedOption?: Option;
    field?: any;
  }) => boolean | Promise<boolean>;
  afterChange?: ({
    selectedOption,
    field,
  }: {
    selectedOption?: Option;
    field?: any;
  }) => void;
  noOptionsMessage?: string;
  showChecked?: boolean;
  isMulti?: boolean;
  wrapperClassName?: string;
  menuPortalTarget?: HTMLElement;
  enableLabelEmpty?: boolean;
  readOnly?: boolean;
  addMutate?: any;
  addIsPending?: boolean;
  updateMutate?: any;
  updateIsPending?: boolean;
  deleteMutate?: any;
  deleteIsPending?: boolean;
  items?: any;
  isView?: boolean;
  fields?: Field[];
  optionFields?: OptionFields;
  isFemale?: boolean;
  filterOption?: (option: any, inputValue: string) => any;
  addNoThingOptions?: boolean;
  multiViewPrefex?: "-" | "." | "";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

function TReactSelect({
  form,
  name,
  label,
  placeholder = "",
  description = "",
  options: passedOptions,
  labelClassName,
  defaultValue,
  beforeChange,
  afterChange,
  noOptionsMessage,
  showChecked = true,
  isMulti = false,
  errorMessageClaasName,
  wrapperClassName,
  enableLabelEmpty = false,
  menuPortalTarget,
  readOnly = false,
  addMutate,
  addIsPending = false,
  updateMutate,
  updateIsPending = false,
  deleteMutate,
  deleteIsPending = false,
  items,
  isView = false,
  fields,
  optionFields,
  isFemale,
  filterOption,
  addNoThingOptions,
  multiViewPrefex = ".",
  ...props
}: TReactSelectField) {
  const { i18n, t } = useTranslation("common");
  const [item, setItem] = useState<any>();

  const optionValue = useWatch({
    control: form.control,
    name,
  });

  function createOptionsArray(
    data: any[],
    valueField: any,
    ...labelFields: any[]
  ) {
    return data.map((item) => ({
      value: item[valueField] as string | number,
      label: labelFields.map((field) => item[field]).join(" "),
    }));
  }

  const options = passedOptions
    ? passedOptions
    : items
    ? [
        ...createOptionsArray(
          items,
          optionFields?.value || "id",
          Array.isArray(optionFields?.label)
            ? i18n.language === "en"
              ? optionFields?.label[0]
              : optionFields?.label[1]
            : optionFields?.label
            ? optionFields?.label
            : i18n.language === "en"
            ? "name_en"
            : "name_ar" //note: fields may be different in your API
        ),
      ]
    : [];

  addNoThingOptions &&
    options.push({ label: t("form.select.none"), value: undefined });

  useEffect(() => {
    if (optionValue && items && items?.length > 0) {
      const item = items?.find(
        (item: any) => item?.[optionFields?.value || "id"] === optionValue
      );
      !Array.isArray(item) ? setItem(item) : setItem(item[0]);
    }
  }, [optionValue]);

  return (
    <div className={`flex flex-col gap-2 space-y-2 w-full ${wrapperClassName}`}>
      {(label || isView || updateMutate || addMutate || deleteMutate) && (
        <div className="flex justify-between items-center">
          {label && (
            <label
              htmlFor={name}
              className={`${labelClassName} text-[#8E8E8E]  font-normal text-lg leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block`}
            >
              {label}
            </label>
          )}
          {!readOnly &&
            (isView || updateMutate || addMutate || deleteMutate) && (
              <div className="flex gap-2">
                {isView && item && (
                  <CurdFormDialog
                    item={item}
                    type="view"
                    fields={fields}
                    label={label}
                    isFemale={isFemale}
                  />
                )}
                {updateMutate && item && (
                  <CurdFormDialog
                    item={item}
                    type="edit"
                    updateMutate={updateMutate}
                    updateIsPending={updateIsPending}
                    fields={fields}
                    label={label}
                    isFemale={isFemale}
                    optionFields={optionFields}
                  />
                )}
                {addMutate && (
                  <CurdFormDialog
                    type="add"
                    addMutate={addMutate}
                    addIsPending={addIsPending}
                    fields={fields}
                    label={label}
                    isFemale={isFemale}
                    optionFields={optionFields}
                  />
                )}
                {deleteMutate && item && (
                  <CurdFormDialog
                    item={item}
                    type="delete"
                    deleteMutate={deleteMutate}
                    deleteIsPending={deleteIsPending}
                    label={label}
                    isFemale={isFemale}
                    optionFields={optionFields}
                  />
                )}
              </div>
            )}
        </div>
      )}
      {enableLabelEmpty && <div className="h-[14px]"></div>}
      {options && (
        <Controller
          control={form.control}
          name={name}
          render={({ field }) => (
            <>
              {readOnly &&
                !isMulti &&
                (isPlainObject(
                  options?.find((c: any) => c?.value === field?.value)?.label
                ) ? (
                  <TFieldDisplay
                    value={
                      Array.isArray(options) &&
                      options?.find((c) => c?.value === field?.value)?.label
                    }
                    valueClassName="pointer-events-none"
                  />
                ) : (
                  <Input
                    id={name}
                    {...props}
                    value={
                      Array.isArray(options) &&
                      options?.find((c) => c?.value === field?.value)?.label
                    }
                    readOnly
                  />
                ))}
              {readOnly && isMulti && (
                <div
                  className={cn(
                    `flex flex-col  gap-1 min-h-10 max-h-[25.8rem] overflow-y-auto w-full rounded-md border border-solid border-secondry-300 bg-background px-3 py-2 text-sm ring-offset-background`,
                    label ? "mt-2" : ""
                  )}
                >
                  {options
                    ?.filter((c: any) => field?.value?.includes(c?.value))
                    .map((el: any) => (
                      <p className="flex items-center gap-2">
                        {multiViewPrefex === "." && (
                          <span className="text-gray-500 w-[3px] h-[3px] bg-gray-500 rounded-full"></span>
                        )}
                        {multiViewPrefex === "-" && (
                          <span className="text-gray-500">-</span>
                        )}
                        <span>{el?.label}</span>
                      </p>
                    ))}
                </div>
              )}
              {!readOnly && (
                <ReactSelect
                  isClearable
                  id={name}
                  isMulti={isMulti as false}
                  classNamePrefix="react-select"
                  ref={field.ref}
                  options={options}
                  value={
                    (Array.isArray(options) &&
                      (!isMulti
                        ? options?.find((c) => c?.value === field?.value)
                        : options?.filter((c) =>
                            field?.value?.includes(c?.value)
                          ))) ||
                    ""
                  }
                  onChange={(selectedOption, { action }) => {
                    if (action === "clear") {
                      field.onChange("");
                    }
                    if (
                      !beforeChange ||
                      (!!beforeChange &&
                        beforeChange({ selectedOption, field }))
                    ) {
                      selectedOption &&
                        !isMulti &&
                        field.onChange(selectedOption.value);
                      selectedOption &&
                        isMulti &&
                        field.onChange(
                          selectedOption?.map((option: any) => option.value)
                        );
                      afterChange && afterChange({ selectedOption, field });
                    }
                  }}
                  components={{
                    Option: (props) => (
                      <CustomOption {...props} showChecked={showChecked} />
                    ),
                  }}
                  styles={customStyles(readOnly, showChecked)}
                  openMenuOnClick={!readOnly}
                  isSearchable={!readOnly}
                  noOptionsMessage={() =>
                    noOptionsMessage || t("reactSelect.noOptions")
                  }
                  placeholder={placeholder}
                  inputId={name}
                  // menuPosition="fixed"
                  menuPortalTarget={menuPortalTarget || undefined}
                  // maxMenuHeight={200}
                  // menuShouldScrollIntoView={true}
                  // menuShouldBlockScroll={true}
                  backspaceRemovesValue={true}
                  filterOption={filterOption}
                  isDisabled={props?.disabled}
                  {...props}
                />
              )}
            </>
          )}
        />
      )}
      {get(form.formState?.errors, name) && (
        <div
          className={`text-xs font-medium text-destructive ${errorMessageClaasName}`}
        >
          {get(form.formState?.errors, name)?.message as any}
        </div>
      )}
      {description && <FormDescription>{description}</FormDescription>}
    </div>
  );
}

export default TReactSelect;
