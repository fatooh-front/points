import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type options = {
  id?: string;
  [key: string]: any;
};

type TSelectField = {
  form: any;
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  fieldItemValue?: string;
  fieldItemLabel: string;
  fieldItemLabelTwo?: string;
  options: options[] | undefined;
  disabled?: boolean;
  HandleChange?: (params: string) => void;
  labelClassName?: string;
  defaultValue?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

function TSelectField({
  form,
  name,
  label,
  placeholder = "",
  description = "",
  options,
  fieldItemValue = "id",
  fieldItemLabel,
  fieldItemLabelTwo,
  HandleChange,
  labelClassName,
  defaultValue,
  ...props
}: TSelectField) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && (
            <FormLabel className={`${labelClassName ? labelClassName : ""}`}>
              {label}
            </FormLabel>
          )}
          <Select
            onValueChange={(event) => {
              field.onChange(event), HandleChange && HandleChange(field.value);
            }}
            value={field.value || defaultValue}
            // defaultValue={field.value || defaultValue}
          >
            <FormControl>
              <SelectTrigger {...props}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            {options && (
              <SelectContent>
                {options?.map((el) => (
                  <SelectItem
                    key={el[fieldItemValue]}
                    value={el[fieldItemValue]}
                  >
                    {el[fieldItemLabel]}{" "}
                    {fieldItemLabelTwo && el[fieldItemLabelTwo]}
                  </SelectItem>
                ))}
              </SelectContent>
            )}
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default TSelectField;
