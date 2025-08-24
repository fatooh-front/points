import { ImageUp, Trash, Trash2 } from "lucide-react";
import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";
import { useTranslation } from "react-i18next";

type TImageArrayFieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form?: any;
  label: string;
  files: (File | string)[] | null;
  fileNameActive?: boolean;
  getRootProps: () => DropzoneRootProps;
  getInputProps: () => DropzoneInputProps;
  labelDrag?: string;
  isDragActive?: boolean;
  classNameHandMedia?: string;
  removeFile?: (fileIndex: number) => void;
  resetFiles?: () => void;
  defaultValues?: (string | undefined)[];
};

function TImageArrayField({
  form,
  label,
  files = [],
  fileNameActive = false,
  getRootProps,
  getInputProps,
  labelDrag,
  isDragActive,
  classNameHandMedia,
  removeFile,
  resetFiles,
  defaultValues,
}: TImageArrayFieldProps) {
  const { t } = useTranslation("common");

  // Function to stop event propagation
  const handleRemoveClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation(); // Prevents the event from bubbling up and potentially triggering the file input
    if (removeFile) removeFile(index);
  };

  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <h4 className="block text-sm font-medium leading-none text-neutral-600">
        {label}
      </h4>
      {Number(files?.length) > 0 && resetFiles && (
        <button
          type="button"
          onClick={resetFiles}
          className="flex gap-1 items-center text-red-700 self-end w-fit text-sm"
        >
          <span>{t("resetImages")}</span>
          <Trash size={18} />
        </button>
      )}
      {fileNameActive &&
        files?.map((file, index) => (
          <p key={index}>{typeof file !== "string" && file?.name}</p>
        ))}
      <div
        {...getRootProps()}
        className={`flex gap-3 min-h-28 flex-wrap relative h-full border-2 border-dashed rounded-lg border-gray-400 p-4 text-center ${
          isDragActive ? "bg-gray-100" : ""
        }`}
      >
        <input {...getInputProps()} multiple />
        {Number(files?.length) > 0 ? (
          files?.map((file, index) => (
            <div
              key={index}
              className={`relative w-[150px] aspect-[1.62] shrink-0 ${classNameHandMedia}`}
            >
              <img
                src={
                  typeof file === "string" ? file : URL.createObjectURL(file)
                }
                alt={`preview-${index}`}
                className="block w-[150px] aspect-[1.62] rounded-lg"
              />
              <button
                type="button"
                onClick={(e) => handleRemoveClick(e, index)}
                className="absolute top-2 right-2 bg-primary-500 text-white rounded-full p-1 z-10"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        ) : (
          <>
            {(!defaultValues || defaultValues?.length === 0) && (
              <div className="flex justify-center items-center gap-3 text-gray-600 w-full h-full rounded-lg min-h-52">
                <ImageUp size={40} className="text-primary-600" />
                {labelDrag && <p>{labelDrag}</p>}
              </div>
            )}
          </>
        )}
      </div>
      {/* {(Number(files?.length) > 0) && (
        <div className="flex items-center gap-2">
          <Replace className="text-yellow-700" />
          {labelReplace && (
            <p className="text-sm text-yellow-700">{labelReplace}</p>
          )}
        </div>
      )} */}
      {form?.formState?.errors?.img && (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <p className="text-primary-500">
          {form?.formState?.errors?.img?.message as any}
        </p>
      )}
    </div>
  );
}

export default TImageArrayField;
export type { TImageArrayFieldProps };

// {defaultValues &&
//   defaultValues?.map((image, index) => (
//     <div
//       key={index}
//       className={`relative w-[150px] aspect-[1.62] shrink-0 ${classNameHandMedia}`}
//     >
//       <img
//         src={image}
//         alt={`existing-preview-${index}`}
//         className="block w-[150px] aspect-[1.62] rounded-lg"
//       />
//       {/* <button
//         type="button"
//         onClick={(e) => handleRemoveClickDefault(e, index)}
//         className="absolute top-2 right-2 bg-primary-500 text-white rounded-full p-1 z-10"
//       >
//         <Trash2 size={16} />
//       </button> */}
//     </div>
//   ))}
