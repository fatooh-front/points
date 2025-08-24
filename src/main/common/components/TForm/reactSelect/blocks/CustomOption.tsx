import { Check } from "lucide-react";
import { OptionProps, components } from "react-select";

type Option = {
  value: any;
  label: any;
};

interface CustomOptionProps extends OptionProps<Option, false> {
  showChecked?: boolean;
}

export const CustomOption = (props: CustomOptionProps) => (
  <components.Option {...props}>
    <div className="flex items-center">
      {props.isSelected && <span className="absolute end-[15px]">{props.showChecked && <Check size={16} />}</span>}
      {props.label}
    </div>
  </components.Option>
);
