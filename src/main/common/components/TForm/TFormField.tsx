import { ReactNode, useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

type TFormField = {
  InputIcon?: ReactNode | string;
  form?: any;
  typeField?: string | "textarea" | "input";
  name: string;
  label?: string;
  labelInput?: string;
  placeholder?: string;
  description?: string;
  // disabled?: boolean;
  errorMessageClaasName?: string;
  FormDescriptionClaasName?: string;
  fromItemClassName?: string;
  labelClassName?: string;
  defaultValue?: string | number;
  linkBelowField?: ReactNode;
  forwardedRef?: any;
  EndCompoponent?: any;
  [key: string]: any;
};

function TFormField({
  typeField = "input",
  InputIcon,
  form,
  name,
  disable,
  label,
  labelInput,
  labelClassName,
  placeholder = "",
  description = "",
  forwardedRef,
  // disabled = false,
  errorMessageClaasName,
  FormDescriptionClaasName,
  fromItemClassName = "",
  linkBelowField,
  EndCompoponent,
  ...props
}: TFormField) {
  const { className, ...propsField } = props;
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormField
      disabled={disable}
      control={form?.control}
      name={name}
      render={({ field }) => {
        const { onChange, ...fieldProps } = field;
        return (
          <FormItem className={`w-full  ${fromItemClassName}`}>
            {label && (
              <FormLabel
                className={`text-[#8E8E8E]  font-normal text-lg ${labelClassName}`}
              >
                {label}
              </FormLabel>
            )}
            <FormControl>
              {typeField === "textarea" ? (
                <>
                  <Textarea
                    className={cn(
                      "bg-secondry-50  placeholder-[#8E8E8E] placeholder:font-normal focus-visible:ring-0",
                      // disabled ? "!cursor-default pointer-events-none" : "",
                      className
                    )}
                    aria-label={labelInput || placeholder}
                    placeholder={placeholder}
                    onChange={(e) =>
                      propsField.inputMode === "decimal" ||
                      propsField.inputMode === "numeric" ||
                      propsField.type === "number"
                        ? onChange(
                            e.target.value
                              ? parseFloat(e.target.value)
                              : undefined
                          )
                        : onChange(e.target.value)
                    }
                    {...propsField}
                    {...fieldProps}
                    ref={forwardedRef}
                  />
                  {linkBelowField}
                </>
              ) : (
                <div className="relative ">
                  <div className="relative">
                    <Input
                      className={cn(
                        // disabled ? "!cursor-default pointer-events-none" : "",
                        props.type === "password" && "pe-10",
                        `${className} border border-[#D0DADE] p-[16px] `
                      )}
                      aria-label={labelInput || placeholder}
                      placeholder={placeholder}
                      onChange={(e) =>
                        propsField.inputMode === "decimal" ||
                        propsField.inputMode === "numeric" ||
                        propsField.type === "number"
                          ? onChange(
                              e.target.value
                                ? parseFloat(e.target.value)
                                : undefined
                            )
                          : onChange(e.target.value)
                      }
                      {...propsField}
                      {...fieldProps}
                      ref={forwardedRef}
                      type={
                        props.type === "password" && showPassword
                          ? "text"
                          : props.type
                      }
                    ></Input>{" "}
                    <div className="absolute inset-y-0 my-auto  h-fit leading-none end-0 pe-3 flex items-center text-gray-400 focus:outline-none">
                      {InputIcon}
                    </div>
                    {props.type === "password" && (
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 my-auto  h-fit leading-none end-0 pe-3 flex items-center text-gray-400 focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    )}
                  </div>

                  {linkBelowField}
                </div>
              )}
            </FormControl>
            <FormMessage className={errorMessageClaasName} />
            {description && (
              <FormDescription className={FormDescriptionClaasName}>
                {description}
              </FormDescription>
            )}
          </FormItem>
        );
      }}
    />
  );
}

export default TFormField;
