import { cn } from "@/lib/utils";

type TFieldArrayDisplay = {
  label?: string;
  value?: string[] | number[];
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
};

export default function TFieldArrayDisplay({
  label,
  value,
  valueClassName = "",
  labelClassName = "",
  className = "",
}: TFieldArrayDisplay) {
  return (
    <>
      <div
        className={cn(
          `flex flex-col text-base font-semibold text-start w-full text-neutral-600`,
          className
        )}
      >
        <h3
          className={cn(
            `block text-sm font-medium leading-none`,
            labelClassName
          )}
        >
          {label}
        </h3>
        <ul
          className={cn(
            `flex flex-col gap-3 min-h-10 max-h-[8.4rem] overflow-y-auto mt-2 w-full rounded-md border border-dashed border-secondry-300 bg-background px-3 py-2 text-sm ring-offset-background`,
            valueClassName
          )}
        >
          {value?.map((el: string | number) => (
            <li>{el}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
