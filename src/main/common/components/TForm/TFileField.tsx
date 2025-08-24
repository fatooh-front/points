import Image from "@/components/ui/Image";
import { cn } from "@/lib/utils";
import { ImageUp, Video, Replace, Upload, X } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";

type TFileFieldProps = {
  form?: any;
  name?: string;
  label?: string;
  file: File | string | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  fileNameActive?: boolean;
  labelDrag?: string;
  labelReplace?: string;
  existingMedia?: string;
  tabLinkText?: string;
  imgeArea?: React.ReactNode;
  type?: "image" | "video" | "file";
  acceptObject?: { [key: string]: string[] };
  AllWidth?: string;
  AllHeight?: string;
  rounded?: "full" | "md" | "sm" | "lg";
  containerClassName?: string;
  classNameRootProps?: string;
  classNameHandMedia?: string;
  classNameLayout?: string;
  readOnly?: boolean;
};

function TFileField({
  form,
  name,
  label,
  file,
  setFile,
  fileNameActive = false,
  labelDrag,
  labelReplace,
  existingMedia,
  type = "image",
  acceptObject,
  tabLinkText,
  imgeArea,
  rounded = "full",
  classNameRootProps,
  classNameHandMedia,
  containerClassName,
  classNameLayout,
  readOnly = false,
}: TFileFieldProps) {
  const [linkImg, setLinkImg] = useState<string | undefined>(undefined);
  const file_server_url = import.meta.env.VITE_FILE_ROOT;
  const isVideoFile = (file: File | string | null) =>
    typeof file !== "string" && file?.type.startsWith("video/");

  const isImageFile = (file: File | string | null) =>
    typeof file !== "string" && file?.type.startsWith("image/");

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!readOnly) {
        const fileSelected = acceptedFiles[0];
        const formData = new FormData();

        if (fileSelected) {
          formData.append("file", fileSelected);

          try {
            const res = await fetch(file_server_url, {
              method: "POST",
              body: formData,
            });
            const data = (await res.text()).trim();
            if (!res.ok) {
              throw new Error("Upload failed");
            }

            console.log("Uploaded filename:", data);
            setFile(fileSelected);
            if (form && data) {
              form.setValue(name, data);
              setLinkImg(undefined);
            }
            return data;
          } catch (error) {
            console.error("Upload error:", error);
            throw error;
          }
        }
      }
    },
    [readOnly]
  );

  useEffect(() => {
    file instanceof File && onDrop([file]);
  }, [file]);
  console.log("file s", form.getValues(name), name);

  const acceptKey =
    type === "image" ? "image/*" : type === "video" ? "video/*" : "*";

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptObject || {
      [acceptKey]: [],
    },
    maxFiles: 1,
    disabled: readOnly, // Disable Dropzone if readOnly is true
  });

  const getRounded = () => {
    switch (rounded) {
      case "full":
        return "rounded-full";
      case "md":
        return "rounded-md";
      case "sm":
        return "rounded-sm";
      case "lg":
        return "rounded-lg";
      default:
        return "";
    }
  };

  useEffect(() => {
    const value = form.getValues(name);

    if (typeof value === "string" && value.startsWith("http")) {
      setLinkImg(value);
    }
  }, []);
  function getImageUrl(value: string | undefined) {
    if (!value) return "";
    if (value.startsWith("http")) {
      const fileName = value.split("/").pop(); // ناخد آخر جزء من الرابط
      form.setValue(name, fileName);
    } // getFileNameOrOriginal(value);
    if (linkImg) return linkImg;
    return value.startsWith("http") ? value : `${file_server_url}/${value}`;
  }
  console.log(form.watch(), "linkImgs");

  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center gap-2 ",
        classNameLayout
      )}
    >
      {label && (
        <h4 className="block text-sm font-medium leading-none text-neutral-600">
          {label}
        </h4>
      )}
      {file && fileNameActive && (
        <p>{typeof file !== "string" && file?.name}</p>
      )}
      <div
        className={cn(
          "relative flex flex-col gap-2 w-full h-full cursor-pointer",
          readOnly ? "cursor-not-allowed" : "",
          containerClassName
        )}
      >
        {!readOnly && file && (
          <X
            role="button"
            size={16}
            className="absolute top-0 start-0 w-fit text-red-700 cursor-pointer"
            onClick={() => setFile(null)}
          />
        )}

        <div
          {...getRootProps()}
          className={cn(
            `h-full border-2 border-dashed border-gray-400 text-center`,
            getRounded(),
            classNameRootProps || "p-4",
            isDragActive ? "bg-gray-100" : ""
          )}
        >
          <input
            {...getInputProps()}
            accept={
              type === "video" ? "video/*" : type === "image" ? "image/*" : "*"
            }
            disabled={readOnly} // Disable the input if readOnly is true
          />
          {file || form.getValues(name) ? (
            <div className={`w-full h-full shrink-0 ${classNameHandMedia}`}>
              {isVideoFile(file) || type === "video" ? (
                <video
                  src={
                    typeof file === "string"
                      ? file
                      : file
                      ? URL.createObjectURL(file)
                      : ""
                  }
                  controls={!readOnly} // Disable controls if readOnly is true
                  className={cn("block w-full h-full", getRounded())}
                />
              ) : isImageFile(file) || type === "image" ? (
                <Image
                  src={
                    form.getValues(name)
                      ? getImageUrl(form.getValues(name))
                      : typeof file === "string"
                      ? file
                      : file
                      ? URL.createObjectURL(file)
                      : ""
                  }
                  alt="preview"
                  className={cn("block w-full h-full", getRounded())}
                />
              ) : (
                <embed
                  src={
                    typeof file === "string"
                      ? file
                      : file
                      ? URL.createObjectURL(file)
                      : ""
                  }
                  className={cn("block w-full h-full", getRounded())}
                />
              )}
              {tabLinkText && (
                <a
                  href={
                    typeof file === "string"
                      ? file
                      : file
                      ? URL.createObjectURL(file)
                      : ""
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-sm hover:underline text-primary-600"
                >
                  {tabLinkText}
                </a>
              )}
            </div>
          ) : existingMedia ? (
            <div className={`w-full h-full shrink-0 ${classNameHandMedia}`}>
              {type === "video" ? (
                <video
                  src={existingMedia}
                  controls={!readOnly} // Disable controls for existing media if readOnly is true
                  className={cn("block w-full h-full", getRounded())}
                />
              ) : type === "image" ? (
                <Image
                  src={existingMedia}
                  alt="preview"
                  className={cn("block w-full h-full", getRounded())}
                />
              ) : (
                <embed
                  src={existingMedia}
                  className={cn("block w-full h-full", getRounded())}
                />
              )}
              {tabLinkText && (
                <a
                  href={existingMedia}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-sm hover:underline text-primary-600"
                >
                  {tabLinkText}
                </a>
              )}
            </div>
          ) : (
            <div
              className={cn(
                "flex justify-center items-center gap-3 text-gray-600 w-full h-full rounded-lg cursor-pointer",
                getRounded(),
                readOnly ? "cursor-not-allowed opacity-50" : "" // Style for readOnly mode
              )}
            >
              {imgeArea ? (
                imgeArea
              ) : type === "image" ? (
                <ImageUp size={40} className="text-primary-600" />
              ) : type === "video" ? (
                <Video size={40} className="text-primary-600" />
              ) : type === "file" ? (
                <Upload size={40} className="text-primary-600" />
              ) : null}
              {labelDrag && <p>{labelDrag}</p>}
            </div>
          )}
        </div>
        {(file || existingMedia) && labelReplace && (
          <div className="flex items-center gap-2">
            <Replace className="text-yellow-700" />
            <p className="text-sm text-yellow-700">{labelReplace}</p>
          </div>
        )}
      </div>{" "}
      {/* <FormMessage /> */}
      {form?.formState?.errors?.[name!]?.message && (
        <p className="text-red-500">
          {form?.formState?.errors?.[name!]?.message as any}
        </p>
      )}
    </div>
  );
}

export default TFileField;
