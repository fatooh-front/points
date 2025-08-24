import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputTime } from "@/components/ui/input-time";
import { cn } from "@/lib/utils";

type TTimePicker = {
  form?: any;
  name: string;
  label?: string;
  labelInput?: string;
  description?: string;
  disabled?: boolean;
  fromItemClassName?: string;
  defaultValue?: string;
  [key: string]: any;
};

function TTimePicker({
  form,
  name,
  label,
  labelInput,
  description = "",
  disabled = false,
  fromItemClassName = "",
  ...props
}: TTimePicker) {
  const { className, ...propsField } = props;
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem className={`w-fit ${fromItemClassName}`}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <InputTime
              type="time"
              className={cn(
                disabled ? "!cursor-default pointer-events-none" : "",
                className
              )}
              aria-label={labelInput}
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

export default TTimePicker;
<div>
  <label className="">الوقت</label>
  <input type="time" name={"time"} className="border-none text-[18px]" />
</div>;
