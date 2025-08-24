import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";
import { useTranslation } from "react-i18next";

type Props = {
  getRootProps: any;
  getInputProps: any;
  isDragActive: boolean;
  disabled?: boolean;
  maxFiles?: number;
};
export default function DropFileArea({
  getRootProps,
  getInputProps,
  isDragActive,
  disabled,
  maxFiles,
}: Props) {
  const { t } = useTranslation("attachments");

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
        isDragActive ? "border-primary bg-muted" : "border-muted-foreground/25",
        disabled
          ? "cursor-not-allowed opacity-60"
          : "cursor-pointer hover:border-primary"
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-2">
        <Upload className="h-8 w-8 text-muted-foreground" />
        <div className="text-sm text-muted-foreground">
          {isDragActive ? (
            <p>{t("drag.drop")}</p>
          ) : (
            <p>
              {t("drag.click")}
              <br />
              {maxFiles && (
                <span className="text-xs">{t("drag.info", { maxFiles })}</span>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
