import { cn } from "@/lib/utils";

type Props = { title?: string; [key: string]: any };

function PopupHeader({ title, ...props }: Props) {
  const { title: _title, className, ...rest } = props;
  return (
    <>
      {title && (
        <div className="flex justify-between items-center">
          <h2
            className={cn(
              "text-lg text-start font-medium w-fit max-w-full text-secondry truncate",
              className
            )}
            {...rest}
          >
            {title}
          </h2>
        </div>
      )}
    </>
  );
}

export default PopupHeader;
