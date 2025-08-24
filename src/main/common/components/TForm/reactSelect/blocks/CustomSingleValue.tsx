import { components } from "react-select";
import "/node_modules/flag-icons/css/flag-icons.min.css";

export const CustomSingleValue = (props: any) => {
  const { children, data, ...rest } = props;

  const { code, dialCode } = data;

  return (
    <components.SingleValue {...rest}>
      <div className="flex justify-between items-center gap-1" dir="ltr">
        <span className={`fi fi-${code?.toLowerCase()}`}></span>
        <span>{dialCode}</span>
      </div>
    </components.SingleValue>
  );
};
