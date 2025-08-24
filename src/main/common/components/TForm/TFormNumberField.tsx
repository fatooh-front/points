import TFormField from "./TFormField";
import { DownArrow, UpArrow } from "@/main/global/assets/svg/Arrow";

interface TFormNumberFieldProps {
  form: any;
  name: string;
  className?: string;
  label?: string;
  placeholder?: string;
  defaultValue?: number;
  [key: string]: any;
}

export default function TFormNumberField({
  form,
  name,
  className,
  label,
  placeholder,
  defaultValue,
  ...props
}: TFormNumberFieldProps) {
  return (
    <TFormField
      {...props}
      typeField="input"
      type="number"
      form={form}
      defaultValue={defaultValue || 0}
      className={className}
      InputIcon={
        <div className=" py-[5.75px]   pr-4 flex flex-col items-center justify-center gap-1">
          <UpArrow
            onClick={() => {
              form.setValue(
                name,
                form.getValues(name) ? Number(form.getValues(name)) + 1 : 0
              );
            }}
            className=" fill-[#8E8E8E] hover:fill-[#C9972B] cursor-pointer "
          />

          <DownArrow
            onClick={() => {
              form.setValue(
                name,
                form.getValues(name) ? Number(form.getValues(name)) - 1 : 0
              );
            }}
            className=" fill-[#8E8E8E] hover:fill-[#C9972B] cursor-pointer "
          />
        </div>
      }
      name={name}
      label={label}
      placeholder={placeholder}
    />
  );
}
