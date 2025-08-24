import {
  FileIcon,
  FileImageIcon,
  FileTextIcon,
  FileSpreadsheetIcon,
  PresentationIcon,
} from "lucide-react";

type Props = {
  file: any;
};
export const FileIconRnder = ({ file }: Props) => {
  const mimeType = file.type || file.mime_type;

  if (mimeType?.startsWith("image/")) {
    return <FileImageIcon size={25} className="shrink-0 text-green-700 ms-3" />;
  }
  if (
    mimeType === "application/pdf" ||
    mimeType?.includes("word") ||
    mimeType === "text/plain"
  ) {
    return <FileTextIcon size={25} className="shrink-0 text-green-700 ms-3" />;
  }
  if (
    mimeType?.includes("spreadsheet") ||
    mimeType?.includes("excel") ||
    mimeType === "text/csv"
  ) {
    return (
      <FileSpreadsheetIcon size={25} className="shrink-0 text-green-700 ms-3" />
    );
  }
  if (mimeType?.includes("presentation") || mimeType?.includes("powerpoint")) {
    return (
      <PresentationIcon size={25} className="shrink-0 text-green-700 ms-3" />
    );
  }
  return <FileIcon size={25} className="shrink-0 text-green-700 ms-3" />;
};
