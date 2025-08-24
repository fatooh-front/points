import { ExternalLinkIcon } from "lucide-react";
import { FileIconRnder } from "./FileIconRnder";
import { isFile } from "./filesHandler";

interface ExternalLinkProps {
  file?: any;
}

export default function ExternalLink({ file }: ExternalLinkProps) {
  const fileType = file?.type || file?.mime_type;
  const fileUrl = isFile(file) ? URL.createObjectURL(file) : file?.url || file;
  return (
    <a
      href={fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors duration-200"
      aria-label={file.name}
      // title={file.name}
    >
      {fileType?.startsWith("image/") && fileUrl ? (
        <img
          src={fileUrl}
          alt={file.name}
          className="w-8 h-8 object-cover rounded"
        />
      ) : (
        <span className="inline-block">
          <FileIconRnder file={file} />
        </span>
      )}
      <ExternalLinkIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </a>
  );
}
