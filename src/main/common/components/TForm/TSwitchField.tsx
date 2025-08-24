import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

type TSwitchField = {
  form?: any;
  typeField?: string;
  name: string;
  label?: string;
  badgeTrue?: string;
  badgeFalse?: string;
  labelInput?: string;
  description?: string;
  disabled?: boolean;
  fromItemClassName?: string;
  [key: string]: any;
};

export default function TSwitchField({
  form,
  name,
  label,
  badgeTrue,
  badgeFalse,
  description,
  labelClassName,
  fromItemClassName,
  ...props
}: TSwitchField) {
  const { t } = useTranslation("common");
  const badgeTrueText = badgeTrue || t("active.true");
  const badgeFalseText = badgeFalse || t("active.false");
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={`flex flex-col items-center justify-between rounded-lg py-2 px-3 ${
            label ? "border w-fit" : ""
          } ${fromItemClassName}`}
        >
          {label && (
            <div>
              <FormLabel className={`text-base ${labelClassName}`}>
                {label}
              </FormLabel>
              {description && <FormDescription>{description}</FormDescription>}
            </div>
          )}
          <FormControl>
            <div className="flex items-center gap-3 mt-0">
              {badgeTrueText && badgeFalseText && (
                <div className="flex w-fit items-center">
                  <Badge
                    className={`select-none ${
                      field.value === true
                        ? "bg-green-600 hover:bg-green-600"
                        : "bg-red-600 hover:bg-red-600"
                    }`}
                  >
                    {field.value ? badgeTrueText : badgeFalseText}
                  </Badge>
                </div>
              )}
              <Switch
                dir="ltr"
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={props?.disabled || props?.readOnly}
                {...props}
              />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
