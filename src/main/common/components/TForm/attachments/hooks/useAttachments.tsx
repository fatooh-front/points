import { useTranslation } from "react-i18next";
import { useFilesUpload } from "./useFilesUpload";
import { useToast } from "@/components/ui/use-toast";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  pureTypeFileArray,
  pureNoTypeFileArray,
  renderFileSize,
} from "./../utils/filesHandler";

type Props = {
  form: any;
  name?: string;
  maxFiles?: number;
  maxFileSize?: number;
  allowedTypes?: string[];
  type?: string;
  disabled?: boolean;
  setFilesNames?: any;
  filesNames?: string[];
};
export default function useAttachments({
  form,
  name,
  maxFiles = 5,
  maxFileSize = 5 * 1024 * 1024, //5MB
  allowedTypes = undefined,
  type,
  disabled,
}: Props) {
  const {
    mutateAsync,
    isPending,
    isError: _isError,
    error: _error,
  } = useFilesUpload();

  const [filesNames, setFilesNames] = useState<{ [key: string]: string }>({});

  console.log("type", type);

  const { t } = useTranslation("attachments");
  const { toast } = useToast();

  const files = form.watch(name) || [];

  console.log("files@@@", files);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const currentFiles = form.getValues(name) || [];

      // Validate max files limit
      if (currentFiles.length + acceptedFiles.length > maxFiles) {
        toast({
          title: t("attachments:maxFilesExceeded", {
            maxFiles,
          }),
          variant: "destructive",
        });
        return;
      }

      // Filter files based on size and type
      const validFiles = acceptedFiles.filter((file) => {
        const isValidSize = file.size <= maxFileSize;
        // const isValidType = allowedTypes
        //   ? allowedTypes?.includes(file.type)
        //   : true;
        const isValidType = allowedTypes
          ? allowedTypes.some((type) =>
              file.type.match(type.replace("*", ".*"))
            )
          : true;
        if (!isValidSize) {
          toast({
            title: t("attachments.fileTooLarge", {
              fileName: file.name,
              maxSize: `${renderFileSize(maxFileSize)}`,
            }),
            variant: "destructive",
          });
        }
        if (!isValidType) {
          toast({
            title: t("attachments.invalidFileType", {
              fileName: file.name,
            }),
            variant: "destructive",
          });
        }

        return isValidSize && isValidType;
      });

      // Set only valid files
      form.setValue(name, [...currentFiles, ...validFiles]);

      // Update file names
      validFiles.forEach((file) => {
        setFilesNames((prev) => ({
          ...prev,
          [file.name]: file.name,
        }));
      });
    },
    [files.length, form, name, maxFiles, maxFileSize, allowedTypes, toast, t]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled,
    // maxFiles,
    // maxSize: maxFileSize,
    // multiple: true,
    // accept: {
    //   "image/*": [],
    //   "video/*": [],
    //   "audio/*": [],
    //   "application/pdf": [],
    //   "application/msword": [],
    //   "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    //     [],
    //   "application/vnd.ms-excel": [],
    //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
    //   "application/vnd.oasis.opendocument.spreadsheet": [],
    //   "application/vnd.ms-powerpoint": [],
    //   "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    //     [],
    //   "application/vnd.oasis.opendocument.presentation": [],
    //   "text/csv": [],
    //   "text/plain": [],
    //   "text/html": [],
    //   "application/json": [],
    //   // "*/*": [],
    // },
  });

  const removeFile = (index: number) => {
    const currentFiles = [...files];
    currentFiles.splice(index, 1);
    form.setValue(name, currentFiles);
  };

  const handleUpload = async () => {
    const dataUploaded: any = (
      await mutateAsync(pureTypeFileArray(files))
    )?.data?.multipleUpload?.map((file: any) => {
      return {
        ...file,
        name: filesNames[file.name] || file.name,
      };
    });
    if (dataUploaded) {
      console.log("dataUploaded@@@", dataUploaded);
      form.setValue(name, [...pureNoTypeFileArray(files), ...dataUploaded]);
    }
  };
  return {
    getRootProps,
    getInputProps,
    isDragActive,
    files,
    removeFile,
    handleUpload,
    isPending,
    setFilesNames,
    filesNames,
  };
}
