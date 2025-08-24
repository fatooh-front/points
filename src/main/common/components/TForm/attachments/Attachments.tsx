import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { X, CircleCheck, CircleDashed } from "lucide-react";
import { AttachmentsProps, UploadedFile } from "./types/AttachmentsTypes";
import DropFileArea from "./blocks/DropFileArea";
import TButton from "../TButton";
import { renderFileSize, isFile } from "./utils/filesHandler";
import useAttachments from "./hooks/useAttachments";
import TFormField from "../TFormField";
import ExternalLink from "./utils/ExternalLink";

const Attachments: React.FC<AttachmentsProps> = ({
  form,
  name = "attachments",
  disabled = false,
  maxFiles = 5,
  maxFileSize = 5 * 1024 * 1024,
  allowedTypes = undefined,
  type,
  readOnly = false,
  isFromData = false,
  FieldNotFileKay,
}) => {
  const { t } = useTranslation("attachments");

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    files,
    removeFile,
    handleUpload,
    isPending,
    setFilesNames,
    filesNames,
  } = useAttachments({
    form,
    name,
    maxFiles,
    maxFileSize,
    allowedTypes,
    type,
    disabled: disabled || readOnly,
  });
  console.log("filesNames@@@", filesNames);
  return (
    <div className="space-y-4">
      {!readOnly && (
        <DropFileArea
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          isDragActive={isDragActive}
          disabled={disabled}
          maxFiles={maxFiles}
        />
      )}

      {files.length > 0 && (
        <Accordion
          defaultValue="files-item"
          type="single"
          collapsible
          className="w-full"
        >
          <AccordionItem value="files-item">
            <AccordionTrigger>
              {t("files.count", { current: files.length, max: maxFiles })}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {files.map((file: UploadedFile, index: number) => (
                  <div key={index}>
                    <div className="flex items-center gap-2 p-1">
                      {!isFile(file) && (
                        <CircleCheck className="h-4 w-4 text-green-500" />
                      )}
                      {isFile(file) && (
                        <CircleDashed className="h-4 w-4 text-gray-500" />
                      )}
                      <ExternalLink file={file} />
                      <div className="flex flex-row items-center gap-2 flex-1 m-0 h-fit py-0 md:py-1">
                        {!isFile(file) && (
                          <TFormField
                            typeField="input"
                            form={form}
                            name={
                              FieldNotFileKay
                                ? FieldNotFileKay(index)
                                : `attachments[${index}].name`
                            }
                            readOnly={readOnly}
                            disabled={disabled}
                          />
                        )}
                        {isFile(file) && (
                          <Input
                            value={filesNames[file.name]}
                            onChange={(e) => {
                              setFilesNames({
                                ...filesNames,
                                [file.name]: e.target.value,
                              });
                            }}
                            className="flex-1"
                            readOnly={readOnly}
                            disabled={disabled}
                          />
                        )}
                        <div
                          className="text-sm text-gray-500 text-nowrap truncate w-[100px]"
                          title={renderFileSize(file.size)}
                        >
                          {renderFileSize(file.size)}
                        </div>
                      </div>
                      {!readOnly && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            !disabled && removeFile(index);
                          }}
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                    {index < files.length - 1 && <Separator className="my-2" />}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      {files.length > 0 && !readOnly && !isFromData && (
        <TButton
          type="button"
          className="bg-secondary-50 text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:text-white h-9 px-4 py-2 flex items-center gap-2 w-full"
          onClick={handleUpload}
          disabled={isPending}
        >
          {t("upload.title")}
        </TButton>
      )}
    </div>
  );
};

export default Attachments;
