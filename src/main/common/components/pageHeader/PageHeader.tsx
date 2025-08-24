import { ReactNode } from "react";
import usePageHeader from "./hooks/usePageHeader";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title?: string;
  subtitle?: string;
  switchStatus?: ReactNode;
  [key: string]: any;
};

function PageHeader({
  title = "",
  subtitle,
  switchStatus,
  ...props
}: PageHeaderProps) {
  const { firstWord, otherWords } = usePageHeader({ title });

  const { title: _title, className, ...rest } = props;
  return (
    <div
      className={cn("flex flex-col leading-none gap-3", className)}
      {...rest}
    >
      <div className="flex leading-none gap-5">
        {title && (
          <h1
            className={`text-3xl leading-none font-bold text-start ${
              otherWords ? "text--customGray" : "text-primary"
            }`}
          >
            {firstWord + " "}
            <span className="leading-none text-primary">{otherWords}</span>
          </h1>
        )}
        {switchStatus}
      </div>
      {subtitle && <p className="leading-none text-gray-500">{subtitle}</p>}
    </div>
  );
}

export default PageHeader;
