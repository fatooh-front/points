import { cn } from "@/lib/utils";

type TFieldMultiDisplay = {
  label?: string;
  values?: (string | number)[];
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
};

function TFieldMultiDisplay({
  label,
  values,
  valueClassName = "",
  labelClassName = "",
  className = "",
}: TFieldMultiDisplay) {
  return (
    <div
      className={cn(
        `flex flex-col text-base font-semibold text-start w-full text-neutral-600`,
        className
      )}
    >
      <h3
        className={cn(`block text-sm font-medium leading-none`, labelClassName)}
      >
        {label}
      </h3>
      <div
        className={cn(
          `flex flex-col gap-1 min-h-10 max-h-[25.8rem] overflow-y-auto mt-2 w-full rounded-md border border-dashed border-secondry-300 bg-background px-3 py-2 text-sm ring-offset-background`,
          valueClassName
        )}
      >
        {values?.map((el) => (
          <p className="">{el}</p>
        ))}
      </div>
    </div>
  );
}

export default TFieldMultiDisplay;
