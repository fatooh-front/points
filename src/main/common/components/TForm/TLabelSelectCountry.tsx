import { ReactNode } from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";

export default function TLabelSelectCountry({
  code,
  label,
}: {
  code: string;
  label: string | number | ReactNode;
}) {
  return (
    <div className={`flex gap-2 items-center w-full cursor-pointer`}>
      {/* <Flag code={code} className="w-4 h-4" fallback={<span></span>} /> */}
      <span className={`fi fi-${code?.toLowerCase()}`}></span>
      {/* {getCountryCode(code)} */}
      <div title={label as any}>{label}</div>
    </div>
  );
}
