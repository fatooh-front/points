import { DateTimePicker } from "@/components/ui/date-time-picker";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatDate, formatDateTime } from "@/main/global/utils/dateUtils";
import { now, getLocalTimeZone } from "@internationalized/date";
import { isDate } from "lodash";
import { useEffect, useState } from "react";

export type Granularity = "day" | "hour" | "minute" | "second";

export type TDateTimePacker = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form?: any;
  type?: string;
  name: string;
  label?: string;
  labelInput?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  fromItemClassName?: string;
  granularity?: Granularity | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

function TDateTimePacker({
  form,
  name,
  label,
  description = "",
  // disabled = false,
  granularity = "minute",
  fromItemClassName = "",
  readOnly = false,
  ...props
}: TDateTimePacker) {
  const [minDateTime, setMinDateTime] = useState(() => now(getLocalTimeZone()));

  useEffect(() => {
    const timer = setInterval(() => {
      setMinDateTime(now(getLocalTimeZone()));
    }, 60000 * 60); // Update every hour

    return () => clearInterval(timer);
  }, []);

  return (
    <FormField
      control={form?.control}
      name={name}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render={({ field }: any) => (
        <FormItem className={`flex flex-col w-full ${fromItemClassName}`}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <>
              {readOnly && (
                <Input
                  {...props}
                  value={
                    granularity === "day"
                      ? formatDate(field?.value)
                      : formatDateTime(field?.value)
                  }
                />
              )}
              {!readOnly && (
                <DateTimePicker
                  granularity={granularity}
                  jsDate={isDate(field?.value) ? field?.value : null}
                  onJsDateChange={field.onChange}
                  minValue={minDateTime}
                  isDisabled={props?.disabled}
                  isReadOnly={readOnly}
                  {...props}
                />
              )}
            </>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default TDateTimePacker;